variable "tenancy_ocid" {
  description = "OCID of your tenancy"
  type        = string
}

variable "user_ocid" {
  description = "OCID of the user calling the API"
  type        = string
}

variable "fingerprint" {
  description = "Fingerprint for the key pair being used"
  type        = string
}

variable "private_key_path" {
  description = "Path to your private key file"
  type        = string
}

variable "region" {
  description = "OCI region"
  type        = string
  default     = "us-ashburn-1"
}

variable "compartment_ocid" {
  description = "OCID of the compartment where resources will be created"
  type        = string
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "realestate-marketplace"
}

variable "use_free_tier" {
  description = "Use Oracle Cloud Free Tier (Always Free Autonomous Database)"
  type        = bool
  default     = true
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "realestatedb"
}

variable "db_password" {
  description = "Database admin password (must be 12-30 chars with uppercase, lowercase, and numbers)"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT secret key for authentication"
  type        = string
  sensitive   = true
}
