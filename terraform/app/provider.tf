provider "aws" {
  region                  = var.area
  shared_credentials_files = [var.credentials]
}
