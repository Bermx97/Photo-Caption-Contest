INSERT INTO images (id, filename) VALUES
('pig', '/pig.jpg'),
('deer', '/deer.jpg'),
('ram', '/ram.jpg'),
('woodpecker', '/woodpecker.jpg'),
('ducks', '/ducks.JPG'),
('frog', '/frog.PNG'),
('lama', '/lama.jpg'),
('lolek', '/lolek.jpg'),
('pig1', '/pig1.jpg'),
('turtle', '/turtle.jpg');

INSERT INTO users (username, password, role) VALUES
('Admin', 'password'),
('Łukasz', 'testpassword', 'admin'), 
('Lukasz', 'hashed_password_1', 'user'),
('Anna', 'hashed_password_2', 'user'),
('John', 'hashed_password_3', 'user'),
('admin1', 'hashed_password_4', 'admin'),
('maria', 'hashed_password_5', 'user');

INSERT INTO likes (captions_id, user_id) VALUES
(33, 22),
(34, 19),
(34, 17),
(36, 17),
(37, 22),
(38, 20),
(39, 18),
(40, 17),
(42, 17),
(42, 22),
(33, 17);


INSERT INTO captions (caption, user_id, image_id) VALUES
('So cute', 17, 'lolek'),
('This pig is living its best life', 17, 'pig'),
('Deer looking straight into my soul', 18, 'deer'),
('Ram about to start a fight', 19, 'ram'),
('Woodpecker on a mission', 19, 'woodpecker'),
('Ducks squad goals', 20, 'ducks'),
('Frog chilling like a boss', 17, 'frog'),
('Lama drama incoming', 17, 'lama'),
('Lolek is suspicious today', 21, 'lolek'),
('Pig1 but make it cinematic', 18, 'pig1'),
('Turtle speed = ultimate patience', 22, 'turtle');

INSERT INTO captions (id, caption, user_id, image_id) VALUES
(1,'first!', 18, 'lolek');