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

Create a new folder on your local machine.
Open the command prompt and inside your project folder (root), type the below commands to setup the backend

```bash
git clone https://github.com/Mohit-Porwal/Basic-Stock-Trading.git
cd basic-stock-trading
cd backend
python -m venv venv (Skip in case you don't want to create a virtual environment)
.\venv\Scripts\activate (Skip in case you don't want to create a virtual environment)
pip install -r requirements.txt
py server.py (This will start the backend server)
```

Go back to the project's root folder, and type the below commands to setup the frontend

```bash
cd basic-stock-trading
cd frontend\scalehoodUI
npm install
npm run dev (This will start the development environment for the frontend)
```

Open http://localhost:5173/ in your browser to see the application.
