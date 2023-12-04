SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

USE `feathersdb`;

-- DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `githubId` varchar(255) DEFAULT NULL,
  `accessLevelId` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `email`, `name`, `lastName`, `password`, `githubId`, `accessLevelId`, `avatar`) VALUES
(1,	'hello@feathersjs.com',	'Hello',	'Feathers',	'$2a$10$qKa6EG3/J8VUvLdcHYkiBOc7NZB9ASPC694xT2duBidb82Dl8TyJq',	NULL,	'5',	'https://s.gravatar.com/avatar/ffe2a09df37d7c646e974a2d2b8d3e03?s=60');
(2,	'fabiomoraisnetosp@hotmail.com',	'Fabio',	'Neto',	'$2a$10$RPh0TEqwCYEGj/8hb5lqQuTeKlM6uwCZH7bUiWvb63Uvf.sfrTWCa',	NULL,	'1',	'https://s.gravatar.com/avatar/89138a63c63e3231c6fa99cd3baee790?s=60'),
(3,	'axicon@axicon.no',	'axicon',	'axaxax',	'$2a$10$p5qpc2KmPVxSah/ubTqqFexx1qF/iuRmlgI.ws8kPchuGW/s/HdNa',	NULL,	'1',	'https://s.gravatar.com/avatar/d2e711869d85e092ebbe22f8b5679fab?s=60');