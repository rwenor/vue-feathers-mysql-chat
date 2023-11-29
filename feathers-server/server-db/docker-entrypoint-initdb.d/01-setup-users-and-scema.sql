CREATE SCHEMA `feathersdb` ;
CREATE SCHEMA `feathersdbtest` ;

CREATE USER 'DATK'@'%' IDENTIFIED BY 'ax';
GRANT ALL PRIVILEGES ON *.* TO 'DATK'@'%';

flush privileges;