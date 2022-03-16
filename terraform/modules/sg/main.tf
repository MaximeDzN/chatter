resource "aws_security_group" "sg" {
  name        = "${var.author}-sg"
  description = "${var.sg_group_desc}"

  ingress {
    description      = "authorize to reach port 22 (ssh)"
    from_port        = 22
    to_port          = 22
    protocol         = "${var.protocol_tcp}"
    cidr_blocks      = ["${var.cidr_blocks}"]
    ipv6_cidr_blocks = ["${var.ipv6_cidr_blocks}"]
  }


  ingress {
    description      = "authorize to reach port 80 (http)"
    from_port        = 80
    to_port          = 80
    protocol         = "${var.protocol_tcp}"
    cidr_blocks      = ["${var.cidr_blocks}"]
    ipv6_cidr_blocks = ["${var.ipv6_cidr_blocks}"]
  }

  ingress {
    description      = "authorize to reach port 443 (https)"
    from_port        = 443
    to_port          = 443
    protocol         = "${var.protocol_tcp}"
    cidr_blocks      = ["${var.cidr_blocks}"]
    ipv6_cidr_blocks = ["${var.ipv6_cidr_blocks}"]
  }

  egress {
    description      = "Authorize all devices to go reach outside"
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["${var.cidr_blocks}"]
    ipv6_cidr_blocks = ["${var.ipv6_cidr_blocks}"]
  }

  
  ingress {
    description      = "Authorize to reach port of the application 5000"
    from_port        = 5000
    to_port          = 5000
    protocol         = "${var.protocol_tcp}"
    cidr_blocks      = ["${var.cidr_blocks}"]
    ipv6_cidr_blocks = ["${var.ipv6_cidr_blocks}"]
  }


  ingress {
    description      = "Authorize to reach port 3306 (mysql)"
    from_port        = 3306
    to_port          = 3306
    protocol         = "${var.protocol_tcp}"
    cidr_blocks      = ["${var.cidr_blocks}"]
    ipv6_cidr_blocks = ["${var.ipv6_cidr_blocks}"]
  }


 
  tags = {
    Name = "${var.author}-sg"
  }
}
