# Basic-Stock-Trading

This is a basic stock trading app where a user can perform the below functionalities

1. “Query” for specific stock tickers (i.e. search for $AAPL, $TSLA). Powered by [yfinance](https://pypi.org/project/yfinance/) library
2. “Buy” and “Sell” specific stock tickers
3. “View Portfolio” and see a list of all previously bought stock tickers.

I have used React.js to develop the frontend, and Flask web framework to develop the backend. I am using MySQL relational database to store all the data.

## Getting started

There are 2 ways to get started with this project

1. Setup the project on your local machine by following all the steps
2. Run the docker container without having to setup the project (Requires Docker engine)

Note: Make sure you have Python pre-installed in your local computer

## 1. Setup the project on your local machine

In order to setup the database, you can download and install the MySQL database from the official website.
Ensure that you have MySQL running. You can use tools like MySQL Workbench to manage your databases or interact via the command line.

Use the below scripts to create your database schema

```bash
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
```

You can also find the above script in the init.sql file in backend folder.

To setup the backend and frontend, create a new folder on your local machine.
Open the command prompt and inside your project folder (root), and follow the commands.


## Setup the backend
```bash
git clone https://github.com/Mohit-Porwal/Basic-Stock-Trading.git
cd basic-stock-trading
cd backend
python -m venv venv (Skip in case you don't want to create a virtual environment)
.\venv\Scripts\activate (Skip in case you don't want to create a virtual environment)
pip install -r requirements.txt
py server.py (This will start the backend server)
```

Create a .env file in your backend folder to configure your MySQL database. Assign the values to the below variables, as per your environment 

```bash
MYSQL_HOST=your_host_name
MYSQL_USER=your_mysql_username
MYSQL_PASSWORD=your_mysql_password
MYSQL_DB=your_database_name
```

Go back to the project's root folder, and type the below commands to setup the frontend

## Setup the frontend
```bash
cd basic-stock-trading
cd frontend\scalehoodUI
npm install
npm run dev (This will start the development environment for the frontend)
```

Open http://localhost:5173/ in your browser to see the application.
