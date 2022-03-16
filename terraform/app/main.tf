#Instanciation module sg
module "sg" {
  source        = "../modules/sg"
  author = "${var.author}"
}

# Instanciation module eip
module "eip" {
  source        = "../modules/eip"
  author = "${var.author}"
}
# Instanciation module ec2
module "ec2" {
  source        = "../modules/ec2"
  author        = "${var.author}"
  instance_type = "t2.micro"
  security_group= "${module.sg.out_sg_nom}"
  public_ip = "${module.eip.out_eip_public_ip}"
  ssh_user = "ubuntu"
}



resource "aws_eip_association" "eip_assoc" {
  instance_id = module.ec2.out_ec2_id
  allocation_id = module.eip.out_eip_id
}




