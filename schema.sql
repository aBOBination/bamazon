
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

DROP TABLE IF EXISTS bamazon;

CREATE TABLE IF NOT EXISTS products (
id INT(6) AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(60) NOT NULL,
department_name VARCHAR(60) NOT NULL,
price DECIMAL(6,2) NOT NULL,
stock_quantity INT NOT NULL DEFAULT 0
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 	('Toilet Paper', 'Toiletries', 89.99, 230),
		('Hand Sanitizer', 'Toiletries', 59.99, 80),
		('Face Mask', 'Health', 34.99, 150),
		('Mac n Cheese', 'Groceries', 29.99, 300);

SELECT * FROM products;
