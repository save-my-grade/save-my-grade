-- Sheet schema

-- !Ups

CREATE TABLE sheet
(
    id        bigint(20)   NOT NULL AUTO_INCREMENT,
    author_id bigint(20),
    course_id bigint(20),
    name      varchar(255),
    tags      varchar(255),
    file_path varchar(255) UNIQUE,
    PRIMARY KEY (id)
);

-- !Downs

DROP TABLE sheet;