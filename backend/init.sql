CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    total_balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00
);

INSERT INTO users (id, username, total_balance) VALUES (1, "mohit", 10000.00), (2, "aakash", 10000.00);

CREATE TABLE transactions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    ticker VARCHAR(10) NOT NULL,
    trade_type VARCHAR(4) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(15, 2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE portfolio (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    ticker VARCHAR(10) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    average_price DECIMAL(10, 2) NOT NULL
    -- FOREIGN KEY (user_id) REFERENCES users(id),
);
