provider "aws" {
  region                  = var.zone_dispo
  shared_credentials_files = [var.credentials]
}
