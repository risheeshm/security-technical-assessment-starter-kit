terraform {
  required_version = ">= 1.0"
  required_providers {
    oci = {
      source  = "oracle/oci"
      version = "~> 5.0"
    }
  }
}

provider "oci" {
  tenancy_ocid     = var.tenancy_ocid
  user_ocid        = var.user_ocid
  fingerprint      = var.fingerprint
  private_key_path = var.private_key_path
  region           = var.region
}

# VCN (Virtual Cloud Network)
resource "oci_core_vcn" "main" {
  compartment_id = var.compartment_ocid
  cidr_blocks    = ["10.0.0.0/16"]
  display_name   = "${var.project_name}-vcn"
  dns_label      = replace(var.project_name, "-", "")
}

# Internet Gateway
resource "oci_core_internet_gateway" "main" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.main.id
  display_name   = "${var.project_name}-igw"
  enabled        = true
}

# Route Table
resource "oci_core_route_table" "main" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.main.id
  display_name   = "${var.project_name}-rt"

  route_rules {
    network_entity_id = oci_core_internet_gateway.main.id
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
  }
}

# Public Subnet
resource "oci_core_subnet" "public" {
  compartment_id    = var.compartment_ocid
  vcn_id            = oci_core_vcn.main.id
  cidr_block        = "10.0.1.0/24"
  display_name      = "${var.project_name}-public-subnet"
  dns_label         = "public"
  route_table_id    = oci_core_route_table.main.id
  security_list_ids = [oci_core_security_list.public.id]
}

# Security List for Public Subnet
resource "oci_core_security_list" "public" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.main.id
  display_name   = "${var.project_name}-public-sl"

  egress_security_rules {
    destination = "0.0.0.0/0"
    protocol    = "all"
  }

  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"
    tcp_options {
      min = 22
      max = 22
    }
  }

  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"
    tcp_options {
      min = 80
      max = 80
    }
  }

  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"
    tcp_options {
      min = 443
      max = 443
    }
  }

  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"
    tcp_options {
      min = 3000
      max = 3000
    }
  }

  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"
    tcp_options {
      min = 5173
      max = 5173
    }
  }

  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"
    tcp_options {
      min = 5432
      max = 5432
    }
  }

  ingress_security_rules {
    protocol = "all"
    source   = "0.0.0.0/0"
  }
}

# Autonomous Database (PostgreSQL-compatible)
resource "oci_database_autonomous_database" "postgres" {
  compartment_id           = var.compartment_ocid
  db_name                  = replace(var.db_name, "_", "")
  display_name             = "${var.project_name}-db"
  admin_password           = "Welcome123!"
  db_version               = "19c"
  db_workload              = "OLTP"
  is_auto_scaling_enabled  = false
  is_free_tier             = var.use_free_tier
  cpu_core_count           = 1
  data_storage_size_in_tbs = 1
  license_model            = "LICENSE_INCLUDED"
  
  whitelisted_ips          = ["0.0.0.0/0"]
}

# Container Registry
resource "oci_artifacts_container_repository" "backend" {
  compartment_id = var.compartment_ocid
  display_name   = "${var.project_name}-backend"
  is_public      = false
}

resource "oci_artifacts_container_repository" "frontend" {
  compartment_id = var.compartment_ocid
  display_name   = "${var.project_name}-frontend"
  is_public      = false
}

# Load Balancer
resource "oci_load_balancer_load_balancer" "main" {
  compartment_id = var.compartment_ocid
  display_name   = "${var.project_name}-lb"
  shape          = "flexible"

  shape_details {
    minimum_bandwidth_in_mbps = 10
    maximum_bandwidth_in_mbps = 100
  }

  subnet_ids = [oci_core_subnet.public.id]
}

# Backend Set for Frontend
resource "oci_load_balancer_backend_set" "frontend" {
  load_balancer_id = oci_load_balancer_load_balancer.main.id
  name             = "frontend-backend-set"
  policy           = "ROUND_ROBIN"

  health_checker {
    protocol          = "HTTP"
    port              = 5173
    url_path          = "/"
    return_code       = 200
    interval_ms       = 10000
    timeout_in_millis = 3000
    retries           = 3
  }
}

# Backend Set for Backend API
resource "oci_load_balancer_backend_set" "backend" {
  load_balancer_id = oci_load_balancer_load_balancer.main.id
  name             = "backend-backend-set"
  policy           = "ROUND_ROBIN"

  health_checker {
    protocol          = "HTTP"
    port              = 3000
    url_path          = "/health"
    return_code       = 200
    interval_ms       = 10000
    timeout_in_millis = 3000
    retries           = 3
  }
}

# Listener for HTTP
resource "oci_load_balancer_listener" "http" {
  load_balancer_id         = oci_load_balancer_load_balancer.main.id
  name                     = "http-listener"
  default_backend_set_name = oci_load_balancer_backend_set.frontend.name
  port                     = 80
  protocol                 = "HTTP"
}

# Path Route Set for API routing
resource "oci_load_balancer_path_route_set" "api" {
  load_balancer_id = oci_load_balancer_load_balancer.main.id
  name             = "api-routes"

  path_routes {
    path          = "/api"
    path_match_type {
      match_type = "PREFIX_MATCH"
    }
    backend_set_name = oci_load_balancer_backend_set.backend.name
  }
}

# Update listener with path routes
resource "oci_load_balancer_listener" "http_with_routes" {
  load_balancer_id         = oci_load_balancer_load_balancer.main.id
  name                     = "http-listener-routes"
  default_backend_set_name = oci_load_balancer_backend_set.frontend.name
  port                     = 80
  protocol                 = "HTTP"
  path_route_set_name      = oci_load_balancer_path_route_set.api.name

  depends_on = [oci_load_balancer_listener.http]
}

# Container Instance for Backend
resource "oci_container_instances_container_instance" "backend" {
  compartment_id              = var.compartment_ocid
  display_name                = "${var.project_name}-backend"
  availability_domain         = data.oci_identity_availability_domains.ads.availability_domains[0].name
  shape                       = "CI.Standard.E4.Flex"
  shape_config {
    ocpus         = 1
    memory_in_gbs = 4
  }

  vnics {
    subnet_id = oci_core_subnet.public.id
  }

  containers {
    display_name = "backend"
    image_url    = "${data.oci_artifacts_container_configuration.registry.namespace}/${oci_artifacts_container_repository.backend.display_name}:latest"

    environment_variables = {
      DB_HOST     = oci_database_autonomous_database.postgres.connection_strings[0].profiles[0].host_format
      DB_PORT     = "1521"
      DB_USERNAME = "ADMIN"
      DB_PASSWORD = "Welcome123!"
      DB_NAME     = var.db_name
      JWT_SECRET  = "super-secret-key-12345"
      DEBUG       = "true"
      NODE_ENV    = "development"
    }
  }
}

# Container Instance for Frontend
resource "oci_container_instances_container_instance" "frontend" {
  compartment_id              = var.compartment_ocid
  display_name                = "${var.project_name}-frontend"
  availability_domain         = data.oci_identity_availability_domains.ads.availability_domains[0].name
  shape                       = "CI.Standard.E4.Flex"
  shape_config {
    ocpus         = 1
    memory_in_gbs = 2
  }

  vnics {
    subnet_id = oci_core_subnet.public.id
  }

  containers {
    display_name = "frontend"
    image_url    = "${data.oci_artifacts_container_configuration.registry.namespace}/${oci_artifacts_container_repository.frontend.display_name}:latest"
  }
}

# Add backends to load balancer
resource "oci_load_balancer_backend" "backend" {
  load_balancer_id = oci_load_balancer_load_balancer.main.id
  backendset_name  = oci_load_balancer_backend_set.backend.name
  ip_address       = oci_container_instances_container_instance.backend.vnics[0].private_ip
  port             = 3000
}

resource "oci_load_balancer_backend" "frontend" {
  load_balancer_id = oci_load_balancer_load_balancer.main.id
  backendset_name  = oci_load_balancer_backend_set.frontend.name
  ip_address       = oci_container_instances_container_instance.frontend.vnics[0].private_ip
  port             = 5173
}

# Data sources
data "oci_identity_availability_domains" "ads" {
  compartment_id = var.compartment_ocid
}

data "oci_artifacts_container_configuration" "registry" {
  compartment_id = var.compartment_ocid
}
