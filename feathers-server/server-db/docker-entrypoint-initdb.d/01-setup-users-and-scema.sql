CREATE SCHEMA `feathersdb` ;

CREATE USER 'DATK'@'%' IDENTIFIED BY 'ax';
GRANT ALL PRIVILEGES ON *.* TO 'DATK'@'%';

flush privileges;