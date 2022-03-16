data "aws_ami" "ubuntu_bionic_ami" {
  most_recent = true
  owners      = ["${var.ubuntu_account_id}"]

  filter {
    name   = "name"
    values = ["${var.ubuntu_ami_name}"]
  }
}

resource "aws_instance" "gestionglasses-ec2" {
  ami               = data.aws_ami.ubuntu_bionic_ami.id
  instance_type     = var.instance_type
  key_name          = var.ssh_key
  availability_zone = var.area
  security_groups   = ["${var.security_group}"]
  tags = {
    Name = "${var.ec2_name}-ec2"
  }

  provisioner "local-exec" {
    command = "echo GestionGlasses est disponible sur cette url : http://${var.public_ip}:8080/ >> ip_connection.txt"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt update -y",
      "sudo apt install software-properties-common",
      "sudo add-apt-repository --yes --update ppa:ansible/ansible",
      "sudo apt install --yes ansible",
      "git clone https://github.com/${var.git_owner}/${var.git_project}.git",
      "cd ${var.git_project}/ansible",
      "ansible-playbook -i hosts.yml playbook.yml"
    ] 
    connection {
      type        = "ssh"
      user        = "${var.ssh_user}"
      private_key = file("../.aws/${var.ssh_key}.pem")
      host        = "${self.public_ip}"
    }
  }


}

