-- Course schema

-- !Ups

CREATE TABLE course
(
  id          bigint(20)    NOT NULL AUTO_INCREMENT,
  name        bigint(20)    NOT NULL UNIQUE,
  cycle       bigint(20)    NOT NULL,
  PRIMARY KEY (id)
);

-- !Downs

DROP TABLE course;