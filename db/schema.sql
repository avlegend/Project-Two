-- DROP DATABASE IF EXISTS exampledb;
-- CREATE DATABASE exampledb;

-- DROP DATABASE IF EXISTS testdb;
-- CREATE DATABASE testdb;

DROP DATABASE IF EXISTS gitgrub_db;
CREATE DATABASE gitgrub_db;

USE gitgrub_db;

CREATE TABLE recipes 
(
id int NOT NULL AUTO_INCREMENT,
recipe_name VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO recipes (recipe_name) VALUE("sushi");

SELECT * FROM recipes;