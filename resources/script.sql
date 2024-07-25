CREATE TABLE `USERS` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `username` varchar(255),
  `password` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `POSTS` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `author_id` integer NOT NULL,
  `content` varchar(2000),
  `topic_id` integer NOT NULL,
  `created_at` timestamp,
);

CREATE TABLE `MESSAGES` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `post_id` integer,
  `user_id` integer,
  `message` varchar(2000),
  `created_at` timestamp,
);

CREATE TABLE `TOPICS` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
  `description` varchar(2000),
  `created_at` timestamp,
)

CREATE UNIQUE INDEX `USERS_index` ON `USERS` (`email`);

ALTER TABLE `USERS` ADD FOREIGN KEY (`id`) REFERENCES `POSTS` (`author_id`);

ALTER TABLE `TOPICS` ADD FOREIGN KEY (`id`) REFERENCES `POSTS` (`topic_id`);

ALTER TABLE `USERS` ADD FOREIGN KEY (`id`) REFERENCES `MESSAGES` (`user_id`);

ALTER TABLE `POSTS` ADD FOREIGN KEY (`id`) REFERENCES `MESSAGES` (`post_id`);

INSERT INTO TOPICS (name, description) VALUES (
  ('Frontend', 'Design and develop visually appealing and responsive user interfaces for web applications'),
  ('Backend', 'Build and maintain server-side logic, databases, and APIs for robust application functionality'),
  ('Java', 'A powerful, object-oriented programming language used for building cross-platform applications'),
  ('Python', 'A versatile, high-level programming language known for its readability and wide range of applications'),
  ('JavaScript', 'A dynamic scripting language essential for creating interactive web pages and web applications'),
  ('Web Development', 'The process of creating, building, and maintaining websites and web applications using various technologies'),
  ('Machine Learning', 'Developing algorithms that enable computers to learn from and make predictions based on data'),
  ('Artificial Intelligence', 'Creating systems that simulate human intelligence processes such as learning, reasoning, and problem-solving'),
  ('TypeScript', 'A superset of JavaScript that adds static type definitions for improved code quality and maintainability'),
  ('Game Development', 'The art and science of creating interactive and engaging video games across various platforms'),
  ('Clean Code', 'Practices and principles for writing code that is easy to read, understand, and maintain'),
  ('React', 'A JavaScript library for building user interfaces with a component-based architecture'),
  ('Angular', 'A TypeScript-based framework for building dynamic and scalable web applications'),
  ('Spring', 'A comprehensive framework for building enterprise-level Java applications'),
);