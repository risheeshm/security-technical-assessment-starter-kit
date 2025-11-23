output "load_balancer_ip" {
  description = "Public IP address of the Load Balancer"
  value       = oci_load_balancer_load_balancer.main.ip_address_details[0].ip_address
}

output "container_registry_url" {
  description = "Container registry URL"
  value       = "${var.region}.ocir.io/${data.oci_artifacts_container_configuration.registry.namespace}"
}

output "backend_repository" {
  description = "Backend container repository"
  value       = oci_artifacts_container_repository.backend.display_name
}

output "frontend_repository" {
  description = "Frontend container repository"
  value       = oci_artifacts_container_repository.frontend.display_name
}

output "database_connection" {
  description = "Autonomous Database connection string"
  value       = oci_database_autonomous_database.postgres.connection_strings[0].profiles[0].value
  sensitive   = true
}

output "application_url" {
  description = "Application URL"
  value       = "http://${oci_load_balancer_load_balancer.main.ip_address_details[0].ip_address}"
}

output "backend_api_url" {
  description = "Backend API URL"
  value       = "http://${oci_load_balancer_load_balancer.main.ip_address_details[0].ip_address}/api"
}

output "backend_container_ip" {
  description = "Backend container private IP"
  value       = oci_container_instances_container_instance.backend.vnics[0].private_ip
}

output "frontend_container_ip" {
  description = "Frontend container private IP"
  value       = oci_container_instances_container_instance.frontend.vnics[0].private_ip
}
