-- Users schema

-- !Ups

CREATE TABLE User
(
    id         bigint(20)   NOT NULL AUTO_INCREMENT,
    email      varchar(255) NOT NULL UNIQUE,
    password   varchar(255) NOT NULL,
    token      varchar(255),
    first_name varchar(255),
    last_name  varchar(255),
    is_admin   boolean      NOT NULL,
    PRIMARY KEY (id)
);

-- !Downs

DROP TABLE User;