# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.synced_folder ".", "/vagrant", nfs: true
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.provider "virtualbox" do |vb|
    vb.customize [
#      "--memory", "1024",
      "setextradata", :id,
      "VBoxInternal/Devices/ahci/0/LUN#[0]/Config/IgnoreFlush", "1"
    ]
  end

  config.vm.provision "shell", path: "provisioning.sh"
end
