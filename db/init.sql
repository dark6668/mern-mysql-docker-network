CREATE DATABASE IF NOT EXISTS app;
USE app;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR(20) NOT NULL,
    password LONGTEXT NOT NULL,
    permissions JSON NOT NULL,
    PRIMARY KEY (id)
);
-- INSERT IGNORE INTO app.users (name, password, permissions)
-- VALUES ('davidAdmin', 'davidAdmin', '["edit_users", "delete_users"]');

-- Remove or modify this line
-- can add more table here


