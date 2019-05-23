-- Course schema

-- !Ups

CREATE TABLE course
(
  id          bigint(20)    NOT NULL AUTO_INCREMENT,
  name        varchar(255)    NOT NULL UNIQUE,
  cycle       varchar(255)    NOT NULL,
  PRIMARY KEY (id)
);

-- !Downs

DROP TABLE course;