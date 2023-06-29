CREATE TABLE member (
  id varchar(255) PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE role (
  id serial PRIMARY KEY,
  member_id varchar(255) REFERENCES member(id),
  role varchar(255) NOT NULL
);