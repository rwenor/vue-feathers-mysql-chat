

Setup:

https://hub.docker.com/_/mariadb

Lag "docker-compose.yml"

Start  whith "docker-compose up" in directory with the file...

Open http://localhost:8080

Login: root, ax


CREATE SCHEMA `feathersdb` ;

CREATE USER 'DATK'@'%' IDENTIFIED BY 'ax';
GRANT ALL PRIVILEGES ON *.* TO 'DATK'@'%';

flush privileges;
