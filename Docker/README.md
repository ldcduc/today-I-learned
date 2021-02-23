* Download docker at [docker.com](https://www.docker.com/products/docker-desktop)  
* Install downloaded package
* Browsing docker hub and find approriate images in demand [hub.docker.com](https://hub.docker.com)

Some basic commands  

| Commands | Usage |
|---|---|
| `docker pull {image_name}:tag` | Pull image |
| `docker image ls` | List all local images |
| `docker image rm {image_name}:tag` | Delete local image store | 
| `docker container ls` <br> `docker ps` | Show list of running containers |
| `docker ps -a` | Show list of running and stopped containers |
| `docker stats` <br> `docker stats --all` | Show realtime running containers (--all: all containers) |
| `docker exec` | Execute a command in container | 

* `docker ps -a`
* `docker rm ID`

## MySql

### Pull `mysql` 

`docker pull mysql`  

### Start `mysql` instance

`docker run --name ducle-mysql -e MYSQL_ROOT_PASSWORD=my-password -d mysql:latest`  

### Access container shelel + view `mysql` logs

`docker exec -it ducle-mysql bash`  
&nbsp;
`docker exec -it ducle-mysql bash`  

### Access `mysql` interactive code execution

`docker exec -it ducle-mysql mysql -uroot -pmy-password`  

## MongoDB

docker run --name duc-mongo -p 27017:27017 -d mongo:latest
