CREATE TABLE `USERS` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `username` varchar(255),
  `last_name` varchar(255),
  `first_name` varchar(255),
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
    ('Frontend', 'Explore the cosmos'),
    ('Backend', 'Explore the cosmos'),
    (`Java`, 'Explore the cosmos'),
    (`Python`, 'Explore the cosmos'),
    (`JavaScript`, 'Explore the cosmos'),
    (`Web Development`, 'Explore the cosmos'),
    (`Machine Learning`, 'Explore the cosmos'),
    (`Artificial Intelligence`, 'Explore the cosmos'),
    (`TypeScript`, 'Explore the cosmos'),
    (`Game Development`, 'Explore the cosmos'),
    (`Clean Code`, 'Explore the cosmos'),
);