sudo apt-get remove -y ruby1.9.1

wget -q -O - http://apt.hellobits.com/hellobits.key | sudo apt-key add -
echo 'deb [arch=amd64] http://apt.hellobits.com/ trusty main' | sudo tee /etc/apt/sources.list.d/hellobits.list

curl -sL https://deb.nodesource.com/setup | sudo bash -

sudo apt-get update
sudo apt-get install -y build-essential zlib1g-dev libssl-dev libreadline6-dev libyaml-dev libffi-dev default-jre git
sudo apt-get install -y ruby-2.1 nodejs
sudo apt-get install -y advancecomp gifsicle jhead jpegoptim libjpeg-progs optipng pngcrush pngquant libpng-dev

sudo rm -rf $(gem env gemdir)
sudo gem install bundle

cd /opt
sudo wget http://static.jonof.id.au/dl/kenutils/pngout-20130221-linux.tar.gz
sudo tar xvfz pngout-20130221-linux.tar.gz
sudo cp /opt/pngout-20130221-linux/x86_64/pngout /usr/bin
