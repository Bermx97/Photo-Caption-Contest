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

INSERT INTO users (id, username, password, role) VALUES
(27, 'Admin', 'password', 'user'),
(17, 'Łukasz', 'testpassword', 'admin'), 
(18, 'Lukasz', 'hashed_password_1', 'user'),
(19, 'Anna', 'hashed_password_2', 'user'),
(20, 'John', 'hashed_password_3', 'user'),
(21, 'admin1', 'hashed_password_4', 'admin'),
(22, 'maria', 'hashed_password_5', 'user');

INSERT INTO captions (id, caption, user_id, image_id) VALUES
(2,'first!', 18, 'lolek'),
(100,'first!', 18, 'lolek'),
(53, 'So cute', 17, 'lolek'),
(33, 'This pig is living its best life', 17, 'pig'),
(34, 'Deer looking straight into my soul', 18, 'deer'),
(35, 'Ram about to start a fight', 19, 'ram'),
(36, 'Woodpecker on a mission', 19, 'woodpecker'),
(37, 'Ducks squad goals', 20, 'ducks'),
(38, 'Frog chilling like a boss', 17, 'frog'),
(39, 'Lama drama incoming', 17, 'lama'),
(40, 'Lolek is suspicious today', 21, 'lolek'),
(41, 'Pig1 but make it cinematic', 18, 'pig1'),
(42, 'Turtle speed = ultimate patience', 22, 'turtle');

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
