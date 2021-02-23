# Systemctl

```bash
sudo systemctl start mongodb
sudo systemctl enable mongodb
sudo systemctl stop mongodb
```

* `systemctl`
* List all loaded services (whether active; _running_, _exited_ or _failed_)
    * `systemctl list-units --type=service`
    * `systemctl --type=service`
* List all active services
    * `systemctl list-units --type=service --state=active`
    * `systemctl --type=service --state=active`
* List all running services
    * `systemctl list-units --type=service --state=running`
    * `systemctl --type=service --state=running`
* Determine the port a daemon process is listening on
    * `ss -ltup`
        * `-l`: print all listening sockets
        * `-t`: print all TCP connections
        * `-u`: print all UDP connections
        * `-n`: print numeric port numbers (instead of application names)
        * `-p`: show application name

# Nginx 

`/etc/nginx/sites-available`  
