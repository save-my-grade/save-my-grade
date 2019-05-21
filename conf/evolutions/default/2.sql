-- Sheet schema

-- !Ups

CREATE TABLE sheet
(
  id          bigint(20)    NOT NULL AUTO_INCREMENT,
  authorId    bigint(20)    NOT NULL,
  courseId    bigint(20)    NOT NULL,
  name        varchar(255)  NOT NULL,
  tags        varchar(255),
  filePath    varchar(255)  NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

-- !Downs

DROP TABLE sheet;