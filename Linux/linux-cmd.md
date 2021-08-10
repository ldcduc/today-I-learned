CPU  

* `cat /proc/cpuinfo | grep processor -c` - `grep -c processor /proc/cpuinfo` - Count number of CPUs
* `cat /proc/cpuinfo | grep 'core id'` - Check number of cores
* `nproc` - Check number of cores
* `lscpu 

See open ports:  

* `sudo lsof -i -P -n`
    * `sudo lsof -i -P -n | grep LISTEN`
    * `sudo lsof -i:22` ## see a specific port such as 22 ##`
* `sudo netstat -tulpn | grep LISTEN`
* `sudo ss -tulpn | grep LISTEN`
* `ss -tulw`

Compression

* `gzip -d file.gz` - decompress gz file, 
    * `gzip -dk file.gz` - `-k` to keep the compressed file
* `gunzip file.gz`
* tar
    * `tar -zcvf [result-filename.tar.gz] [path-to-compress]` - Compress
    * `tar -xvzf [filename.tar.gz]` - Decompress
    * Description
        * `-z` - Comress using gzip
        * `-x` - Extract file (input `tar.gz` file)
        * `-v`, `--verbose` - Display the progress while creating the file
        * `-c` - Create file (output `tar.gz` file)
        * `-f` - Finally the path of the desire file/directory to compress



