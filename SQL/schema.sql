USE chat;

-- ---
-- Table 'Friends'
--
-- ---

DROP TABLE IF EXISTS `Friends`;

CREATE TABLE `Friends` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `friend_username` VARCHAR(100) NULL DEFAULT NULL,
  `id_User` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Room'
--
-- ---

DROP TABLE IF EXISTS `Room`;

CREATE TABLE `Room` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `roomname` VARCHAR(100) NULL DEFAULT NULL,
  `id_User` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Messages'
--
-- ---

DROP TABLE IF EXISTS `Messages`;

CREATE TABLE `Messages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Text` VARCHAR(256) NULL DEFAULT NULL,
  `id_User` INTEGER NULL DEFAULT NULL,
  `CreatedAt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);




-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Room` ADD FOREIGN KEY (id_User) REFERENCES `User` (`id`);
ALTER TABLE `Messages` ADD FOREIGN KEY (id_User) REFERENCES `User` (`id`);
ALTER TABLE `Friends` ADD FOREIGN KEY (id_User) REFERENCES `User` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `User` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Room` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `User` (`id`,`username`) VALUES
-- ('','');
-- INSERT INTO `Room` (`id`,`roomname`,`id_User`) VALUES
-- ('','','');
-- INSERT INTO `Messages` (`id`,`Text`,`id_User`,`CreatedAt`) VALUES
-- ('','','','');
-- INSERT INTO `Friends` (`id`,`friend_username`,`id_User`) VALUES
-- ('','','');

