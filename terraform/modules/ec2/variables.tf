variable "author" {
  type    = string
  default = "MaximeDzN"
}

variable "ec2_name" {
  type    = string
  default = "chatter"
}

variable "area" {
  type    = string
  default = "us-east-1b"
}

variable "instance_type" {
  type    = string
  default = "t2.nano"
}

variable "ssh_key" {
  type    = string
  default = "usKey"
}

variable "security_group" {
  type    = string
  default = "NULL"
}

variable "public_ip" {
  type    = string
  default = "NULL"
}

variable "ssh_user" {
  type    = string
  default = "NULL"
}

variable "ubuntu_account_id" {
  type    = string
  default = "099720109477"
}

variable "ubuntu_ami_name" {
  type    = string
  default = "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"
}


variable "git_owner" {
  type    = string
  default = "maximeDzN"
}

variable "git_project" {
  type    = string
  default = "chatter"
}