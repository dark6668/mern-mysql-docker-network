
CREATE DATABASE IF NOT EXISTS test1;
USE test1;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR(20) NOT NULL,
    password LONGTEXT NOT NULL,
    PRIMARY KEY (id)
);

--- can add more table here


