CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(80),
  role TEXT DEFAULT 'user'
);

CREATE TABLE images (
  id VARCHAR(30) PRIMARY KEY UNIQUE,
  filename VARCHAR(20) UNIQUE
);

CREATE TABLE captions (
  id SERIAL PRIMARY KEY,
  caption VARCHAR(100),
  user_id INTEGER REFERENCES users(id),
  image_id VARCHAR(30) REFERENCES images(id)
);

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  captions_id INTEGER REFERENCES captions(id),
  user_id INTEGER REFERENCES users(id)
);