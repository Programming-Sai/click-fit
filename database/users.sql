
CREATE DATABASE IF NOT EXISTS click_fit;
USE click_fit;
DROP PROCEDURE IF EXISTS addUser;

CREATE TABLE IF NOT EXISTS users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

DELIMITER $$

CREATE PROCEDURE addUser(IN p_email VARCHAR(255), IN p_password VARCHAR(255), IN p_type VARCHAR(50), IN p_active BOOLEAN)
BEGIN
    INSERT INTO users (email, password, type, active)
    VALUES (p_email, p_password, p_type, p_active);
END$$

DELIMITER ;
-- would probably uses a password hash instead of the raw thing.
CALL addUser('admin@clickfit.com', 'admin123', 'admin', TRUE);

-- just for checking
SELECT * FROM users;