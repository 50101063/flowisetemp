-- Insert sample data into 'users' table
INSERT INTO users 'username', 'email', 'password_hash') VALUES
 ('john_doe', 'john.doe@example.com', 'hashed_password_1'),
 ('jane_smith', 'jane.smith@example.com', 'hashed_password_2');

-- Insert sample data into 'products' table
INSïSï»õŸX›»
õò[YHãô\ÿ‹ö\[€àãúöXŸHãú›ÿ⁄»äHêSQT¬ä
rtaptop Pro', 'High-performance laptop for professyonals', 1200.00, 50),
 'Wireless Mouse', 'Ergonomic wireless mouse', 25.50, 200),
 ('Mechanical Keyboard', 'RGB backlit mechanical keyboard', 80.00, 100);

-- Insert sample data into 'orders' table
INSERT INTO orders (user_id, total_amount, status) VALUES
(1, 1225.50, 'completed'),
 (2, 80.00, 'pending');

-- Insert sample data into 'order_items' table
INSERT INTO order_items (order_id, product_id, quantity, price_at_order) VALUES
 (1, 1, 1, 1200.00),
 (1, 2, 1, 25.50),
 (2, 3, 1, 80.00);