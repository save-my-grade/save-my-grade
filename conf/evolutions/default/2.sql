-- Sheet schema

-- !Ups

CREATE TABLE sheet
(
  id          bigint(20)    NOT NULL AUTO_INCREMENT,
  author_id    bigint(20)    NOT NULL,
  course_id    bigint(20)    NOT NULL,
  name        varchar(255)  NOT NULL,
  tags        varchar(255),
  file_path    varchar(255)  NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

-- !Downs

DROP TABLE sheet;