
CREATE TABLE s_Points
(
  id int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64),
  type ENUM('Supplier', 'Factory', 'Port'),
  x double,
  y double,
  region varchar(64)
) ENGINE=InnoDB DEFAULT CHARSET='utf8';

CREATE TABLE distance_between_points
(
  distancePointId int PRIMARY KEY,
  point_id int NOT NULL,
  to_point_id int NOT NULL,
  distance int,
  cost int
) ENGINE=InnoDB DEFAULT CHARSET='utf8';

ALTER TABLE s_Points ADD address VARCHAR(64) NULL;
ALTER TABLE s_Points
  MODIFY COLUMN address VARCHAR(64) AFTER name;

CREATE TABLE distance_categories
(
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  distance_min int DEFAULT 10000000,
  distance_max int DEFAULT 10000000
) ENGINE=InnoDB DEFAULT CHARSET='utf8';

CREATE TABLE tonnage_categories
(
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  tonnage int
) ENGINE=InnoDB DEFAULT CHARSET='utf8';

CREATE TABLE `type_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET='utf8';

CREATE TABLE tariffs
(
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  distance_id int,
  tonnage_id int,
  type_id int,
  cost int
)ENGINE=InnoDB DEFAULT CHARSET='utf8';

CREATE TABLE area_multiplier
(
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  area_name VARCHAR(64),
  multiplier FLOAT
)ENGINE=InnoDB DEFAULT CHARSET='utf8';

CREATE VIEW factories AS SELECT * FROM s_Points WHERE type='Factory';
CREATE VIEW suppliers AS SELECT * FROM s_Points WHERE type='Supplier';
CREATE VIEW ports AS SELECT * FROM s_Points WHERE type='Port';

ALTER TABLE distance_between_points ADD to_point_name int NULL;
ALTER TABLE distance_between_points ADD point_name int NULL;
ALTER TABLE distance_between_points
  MODIFY COLUMN point_name int AFTER point_id,
  MODIFY COLUMN to_point_name int AFTER to_point_id;
ALTER TABLE distance_between_points MODIFY point_name VARCHAR(64);
ALTER TABLE distance_between_points MODIFY to_point_name VARCHAR(64);
ALTER TABLE s_Points ADD volume int NULL;

ALTER TABLE distance_between_points ADD to_point_address varchar(64) NULL;
ALTER TABLE distance_between_points ADD point_address varchar(64) NULL;
ALTER TABLE distance_between_points
  MODIFY COLUMN point_address varchar(64) AFTER point_name,
  MODIFY COLUMN to_point_address varchar(64) AFTER to_point_name;
ALTER TABLE distance_between_points ADD tariff int NULL;
ALTER TABLE s_Points MODIFY address varchar(256);
ALTER TABLE distance_between_points MODIFY point_address varchar(256);
ALTER TABLE distance_between_points MODIFY to_point_address varchar(256);

ALTER TABLE distance_between_points ADD tonnage int NULL;
ALTER TABLE distance_between_points ADD delivery_area varchar(256) NULL;
ALTER TABLE distance_between_points ADD `repeat` int NULL;

ALTER TABLE distance_between_points ADD to_tonnage int NULL;
ALTER TABLE distance_between_points
  MODIFY COLUMN to_tonnage int AFTER tonnage;