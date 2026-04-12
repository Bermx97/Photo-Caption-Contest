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

INSERT INTO likes (captions_id, user_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 1),
(4, 2),
(5, 3),
(6, 4),
(7, 5),
(8, 1),
(9, 2),
(10, 3);

INSERT INTO users (username, password, role) VALUES
('Lukasz', 'hashed_password_1', 'user'),
('Anna', 'hashed_password_2', 'user'),
('John', 'hashed_password_3', 'user'),
('admin1', 'hashed_password_4', 'admin'),
('maria', 'hashed_password_5', 'user');

INSERT INTO captions (caption, user_id, image_id) VALUES
('This pig is living its best life', 1, 'pig'),
('Deer looking straight into my soul', 2, 'deer'),
('Ram about to start a fight', 3, 'ram'),
('Woodpecker on a mission', 1, 'woodpecker'),
('Ducks squad goals', 2, 'ducks'),
('Frog chilling like a boss', 3, 'frog'),
('Lama drama incoming', 1, 'lama'),
('Lolek is suspicious today', 4, 'lolek'),
('Pig1 but make it cinematic', 5, 'pig1'),
('Turtle speed = ultimate patience', 2, 'turtle');