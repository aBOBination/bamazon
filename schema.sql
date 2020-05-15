
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
VALUES 	('Toilet Paper', 'Pharmacy', 89.99, 3),
        ('Hand Sanitizer', 'Pharmacy', 59.99, 7),
        ('Face Mask', 'Pharmacy', 34.99, 16),
        ('First Aid Kit', 'Pharmacy', 39.99, 18),
        ('Flash Light', 'Home Improvement', 6.99, 10),
        ('Batteries', 'Home Improvement', 4.99, 41),
        ('Duct Tape', 'Home Improvement', 14.99, 43),
        ('Bleach', 'Groceries', 19.99, 50),
        ('Water', 'Groceries', 9.99, 19),
        ('Mac n Cheese', 'Groceries', 7.99, 23);


SELECT * FROM products;
