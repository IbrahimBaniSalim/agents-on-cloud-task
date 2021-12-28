DROP DATABASE IF EXISTS P5;

CREATE DATABASE P5;

USE P5;

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (role_id)
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    image VARCHAR(255),
    phone VARCHAR(255),
    age INT(3),
    rate INT(3),
    email VARCHAR(255),
    password VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (user_id)
);

CREATE TABLE Service(
    Service_id INT AUTO_INCREMENT NOT NULL,
    Service VARCHAR(255),
    photo VARCHAR(255),
    video VARCHAR(255),
    Serviceprovider_id INT,
    FOREIGN KEY (Serviceprovider_id) REFERENCES users(user_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (Service_id)
);

CREATE TABLE comments(
    comment_id INT AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255),
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES posts(post_id),
    commenter_id INT,
    FOREIGN KEY (commenter_id) REFERENCES users(user_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (comment_id)
);

CREATE TABLE images(
    image_id INT AUTO_INCREMENT NOT NULL,
    image VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (image_id)
);