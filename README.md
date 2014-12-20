casamentodeaaz.com.br
=====================

Site casamentodeaaz.com.br

- git clone
- bundle
- npm install
- overcommit --install
- sudo apt-get install -y advancecomp gifsicle jhead jpegoptim libjpeg-progs optipng pngcrush pngquant libpng-dev
- [Install pngout](http://www.reviewboard.com/2014/08/10563/install-pngout-ubuntu-14-04-server/)

Run command: nanoc view | bundle exec guard
Deploy: aws s3 cp output/css s3://casamentodeaaz.com.br/css --recursive
