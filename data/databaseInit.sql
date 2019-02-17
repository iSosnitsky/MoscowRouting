CREATE DATABASE moscow_routing;

CREATE TABLE points
(
  id int UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  point_name varchar(256),
  x DOUBLE DEFAULT 0,
  y DOUBLE DEFAULT 0,
  time varchar(30) DEFAULT '08:00' NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET='utf8';

CREATE TABLE `polygons` (
  `p_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `p_name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET='utf8';



ALTER TABLE points ADD polygon_id int UNSIGNED NULL;
ALTER TABLE points
  ADD CONSTRAINT points_polygons_p_id_fk
FOREIGN KEY (polygon_id) REFERENCES polygons (p_id);

INSERT INTO polygons (p_name) VALUE ('Садовое кольцо');
INSERT INTO polygons (p_name) VALUE ('ТТК');
INSERT INTO polygons (p_name) VALUE ('МКАД');
INSERT INTO polygons (p_name) VALUE ('М-10');
INSERT INTO polygons (p_name) VALUE ('Новорижское шоссе');
INSERT INTO polygons (p_name) VALUE ('Минское шоссе');
INSERT INTO polygons (p_name) VALUE ('Киевское шоссе');
INSERT INTO polygons (p_name) VALUE ('Варшавское шоссе');
INSERT INTO polygons (p_name) VALUE ('Симферопольское шоссе');
INSERT INTO polygons (p_name) VALUE ('Р-22');
INSERT INTO polygons (p_name) VALUE ('Ярославское шоссе');
INSERT INTO polygons (p_name) VALUE ('М-7');
INSERT INTO polygons (p_name) VALUE ('М-5');
INSERT INTO polygons (p_name) VALUE ('Егорьевское шоссе');


DROP TABLE points;
DROP TABLE polygons;