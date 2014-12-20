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

###Deploy
- find output -type f -exec gzip -9 {} \; -exec mv {}.gz {} \;
- aws s3 sync output s3://casamentodeaaz.com.br --recursive --delete --content-encoding gzip --cache-control "max-age=604800"
- rm output -rf
