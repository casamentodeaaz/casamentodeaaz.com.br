casamentodeaaz.com.br
=====================

Site casamentodeaaz.com.br

###Config:
- git clone
- vagrant up
- vagrant ssh

###Run:
- nanoc view | bundle exec guard

###Deploy
- find output -type f -exec gzip -9 {} \; -exec mv {}.gz {} \;
- aws s3 sync output s3://casamentodeaaz.com.br --recursive --delete --content-encoding gzip --cache-control "max-age=604800"
- rm output -rf
