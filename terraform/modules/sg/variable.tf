variable "auteur" {
  type    = string
  default = "MaximeDzN"
}

variable "protocol_tcp" {
  type    = string
  default = "tcp"
}

variable "cidr_blocks" {
  type    = string
  default = "0.0.0.0/0"
}

variable "ipv6_cidr_blocks" {
  type    = string
  default = "::/0"
}