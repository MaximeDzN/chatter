variable "author" {
  type    = string
  default = "MaximeDzN"
}

variable "protocol_tcp" {
  type    = string
  default = "tcp"
}

variable "sg_group_desc" {
  type    = string
  default = "Autorise le traffic http, https et ssh"
}

variable "cidr_blocks" {
  type    = string
  default = "0.0.0.0/0"
}

variable "ipv6_cidr_blocks" {
  type    = string
  default = "::/0"
}