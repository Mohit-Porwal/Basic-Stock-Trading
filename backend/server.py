from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import yfinance as yf
import pandas as pd
from decimal import Decimal
from dotenv import load_dotenv
import os
import logging

app = Flask(__name__)
CORS(app)
mysql = MySQL(app)

load_dotenv()

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app.config["MYSQL_HOST"] = os.getenv("MYSQL_HOST")
app.config["MYSQL_USER"] = os.getenv("MYSQL_USER")
app.config["MYSQL_PASSWORD"] = os.getenv("MYSQL_PASSWORD")
app.config["MYSQL_DB"] = os.getenv("MYSQL_DB")

sectors = ["technology", "healthcare", "real-estate"]
sector_wise_top_companies = {}
DEFAULT_PLACEHOLDER = "Data not available"

def handle_database_error(e):
    """Helper function for error handling in database operations."""
    logger.error(f"Database error: {e}")
    return jsonify({"error": "An internal server error occurred"}), 500

def execute_fetchone(query, params=()):
    """Helper function to execute and fetch query results."""
    cur = mysql.connection.cursor()
    try:
        cur.execute(query, params)
        result = cur.fetchone()
        return result
    except Exception as e:
        return handle_database_error(e)
    finally:
        cur.close()

def execute_fetchall(query, params=()):
    cur = mysql.connection.cursor()
    try:
        cur.execute(query, params)
        results = cur.fetchall()
        return results
    except Exception as e:
        return handle_database_error(e)
    finally:
        cur.close()

def execute_commit(query, params=()):
    cur = mysql.connection.cursor()
    try:
        cur.execute(query, params)
        mysql.connection.commit()
    except Exception as e:
        mysql.connection.rollback()
        return handle_database_error(e)
    finally:
        cur.close()

def get_top_companies(sectors):
    companies = {}
    for sector in sectors:
        try:
            top_companies = (yf.Sector(sector)).top_companies
            df = pd.DataFrame(top_companies)
            top_companies_list = df["name"].tolist()
            companies[sector] = top_companies_list[:10]
        except Exception as e:
            logger.error(f"Error fetching top companies for sector {sector}: {e}")
            companies[sector] = [DEFAULT_PLACEHOLDER]
    return companies

@app.route("/", methods=["GET"])
def home():

    user_id = request.args.get("user_id")

    # Get total balance
    user_balance = get_user_balance(user_id)
    if isinstance(user_balance, tuple):
        total_balance = user_balance[0]
    else:
        logger.error(f"User balance retrieval failed for user_id: {user_id}")
        return jsonify({"error": "User not found"}), 404

    weekly_income = execute_fetchone(
        "SELECT SUM(total_amount) FROM transactions WHERE trade_type = 'Sell' AND timestamp >= NOW() - INTERVAL 7 DAY"
    )[0]
    weekly_expense = execute_fetchone(
        "SELECT SUM(total_amount) FROM transactions WHERE trade_type = 'Buy' AND timestamp >= NOW() - INTERVAL 7 DAY"
    )[0]

    recent_transactions = execute_fetchall(
        "SELECT * FROM transactions WHERE user_id = %s ORDER BY timestamp DESC LIMIT 5",
        (user_id,),
    )

    # Get top companies by sector
    sector_wise_top_companies = get_top_companies(sectors)

    response_data = {
        "total_balance": total_balance,
        "recent_transactions": recent_transactions,
        "sector_wise_top_companies": sector_wise_top_companies,
        "weekly_income": weekly_income,
        "weekly_expense": weekly_expense,
    }
    return jsonify(response_data)

@app.route("/tickerInfo/<ticker>", methods=["GET"])
def tickerInfo(ticker):
    try:
        stock = yf.Ticker(ticker)
        ticker_info = stock.info

        # Data for header
        current_price = ticker_info.get("currentPrice", DEFAULT_PLACEHOLDER)
        company_name = ticker_info.get("longName", " ")

        # Data for company info
        marketcap = ticker_info.get("marketCap", DEFAULT_PLACEHOLDER)
        fulltime_employees = ticker_info.get("fullTimeEmployees", DEFAULT_PLACEHOLDER)
        ceo = ticker_info.get("companyOfficers", [{}])[0].get("name", DEFAULT_PLACEHOLDER)
        headquarters = (
            ticker_info.get("city", "")
            + ", "
            + ticker_info.get("state", DEFAULT_PLACEHOLDER)
        )
        dividend_yield = ticker_info.get("dividendYield", DEFAULT_PLACEHOLDER)
        avg_volume = ticker_info.get("averageVolume", DEFAULT_PLACEHOLDER)
        earnings_growth = ticker_info.get("earningsGrowth", DEFAULT_PLACEHOLDER)
        gross_margins = ticker_info.get("grossMargins", DEFAULT_PLACEHOLDER)

        # Data for about section
        summary = ticker_info.get("longBusinessSummary", DEFAULT_PLACEHOLDER)

        # Payload for ticker info page
        return jsonify(
            {
                "current_price": current_price,
                "company_name": company_name,
                "marketcap": marketcap,
                "fulltime_employees": fulltime_employees,
                "ceo": ceo,
                "headquarters": headquarters,
                "dividend_yield": dividend_yield,
                "avg_volume": avg_volume,
                "earnings_growth": earnings_growth,
                "gross_margins": gross_margins,
                "summary": summary,
            }
        )
    except Exception as e:
        logger.error(f"Error retrieving info for ticker {ticker}: {e}")
        return jsonify({"error": "An error occurred while fetching ticker info"}), 500

def get_user_balance(user_id):
    """Helper function to get user balance"""
    return execute_fetchone("SELECT total_balance FROM users WHERE id = %s", (user_id,))

def update_user_balance(user_id, new_balance):
    """Helper function to update user balance"""
    return execute_commit(
        "UPDATE users SET total_balance = %s WHERE id = %s", (new_balance, user_id)
    )

def get_portfolio_details(user_id, ticker):
    """Helper function to get portfolio details for a specific stock"""
    return execute_fetchone(
        "SELECT quantity, average_price FROM portfolio WHERE user_id = %s AND ticker = %s",
        (user_id, ticker),
    )

def update_portfolio_stock(user_id, ticker, quantity, average_price):
    """Helper function to update an existing stock in the portfolio"""
    return execute_commit(
        "UPDATE portfolio SET quantity = %s, average_price = %s WHERE user_id = %s AND ticker = %s",
        (quantity, average_price, user_id, ticker),
    )

def insert_portfolio_stock(user_id, ticker, quantity, price):
    """Helper function to insert a new stock into the portfolio"""
    return execute_commit(
        "INSERT INTO portfolio (user_id, ticker, quantity, average_price) VALUES (%s, %s, %s, %s)",
        (user_id, ticker, quantity, price),
    )

# Helper function to record a transaction
def record_transaction(
    user_id, ticker, quantity, price, transaction_type, total_amount
):
    return execute_commit(
        "INSERT INTO transactions (user_id, ticker, quantity, price, trade_type, total_amount) VALUES (%s, %s, %s, %s, %s, %s)",
        (user_id, ticker, quantity, price, transaction_type, total_amount),
    )

def get_new_average_price(cur, user_id, quantity, price, ticker):
    """Function to get average purchase price for stocks owned by the user"""
    try:
        # Get current average price and current shares owned
        cur.execute(
            "SELECT quantity, average_price FROM portfolio WHERE user_id = %s AND ticker = %s",
            (user_id, ticker),
        )
        operands = cur.fetchone()

        # Check if the stock is found in the user's portfolio
        if not operands:
            raise ValueError("Stock not found in user's portfolio.")

        # Calculate the total cost before the new transaction
        total_cost_before = operands[0] * operands[1]

        # Calculate the additional cost from the new transaction
        additional_cost = quantity * price

        # Calculate new total cost
        new_total_cost = total_cost_before + additional_cost

        # Calculate new total shares owned
        new_total_shares_owned = operands[0] + quantity

        # Check for division by zero
        if new_total_shares_owned == 0:
            raise ZeroDivisionError("Total shares owned cannot be zero.")

        # Calculate new average price
        new_average_price = new_total_cost / new_total_shares_owned

        return new_average_price

    except (ValueError, ZeroDivisionError) as e:
        logger.warning(f"Error in average price calculation: {e}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error while calculating average price: {e}")
        return None


def handle_buy_transaction(cur, user_id, ticker, quantity, price, transaction_amount):
    """Function to handle BUY transactions with error handling and exception handling."""
    try:
        # Check if the user balance exists
        current_balance = get_user_balance(user_id)
        if current_balance is None:
            return {"error": "User not found"}, 404
        else:
            current_balance = current_balance[0]

        # Check if user has enough funds
        if transaction_amount > current_balance:
            return {"error": "Insufficient funds"}, 400

        # Update user's balance
        new_balance = current_balance - transaction_amount
        update_user_balance(user_id, new_balance)

        # Check and update the portfolio
        portfolio_details = get_portfolio_details(user_id, ticker)
        if portfolio_details:
            # Update existing stock
            new_quantity = portfolio_details[0] + quantity
            new_average_price = get_new_average_price(cur, user_id, quantity, price, ticker)
            if new_average_price is None:
                raise ValueError("Error calculating new average price.")
            update_portfolio_stock(user_id, ticker, new_quantity, new_average_price)
        else:
            # Insert new stock
            insert_portfolio_stock(user_id, ticker, quantity, price)

        # Record transaction
        record_transaction(user_id, ticker, quantity, price, "BUY", transaction_amount)
        return {"message": "Purchase successful"}, 200

    except ValueError as ve:
        logger.error(f"Error occurred while buying stock: {e}")
        cur.connection.rollback()
        return {"error": str(ve)}, 500

    except Exception as e:
        # Log and handle unexpected errors
        logger.error(f"Error processing buy transaction for user_id {user_id}, ticker {ticker}: {e}")
        cur.connection.rollback()
        return {"error": "An error occurred while processing the buy transaction"}, 500

def handle_sell_transaction(cur, user_id, ticker, quantity, price, transaction_amount):
    """Function to handle SELL transactions with error handling and exception handling."""
    try:
        # Check if the user has enough stocks to sell
        portfolio_details = get_portfolio_details(user_id, ticker)
        if not portfolio_details or portfolio_details[0] < quantity:
            return {"error": "Insufficient stocks to sell"}, 400

        # Check if the user balance exists
        current_balance = get_user_balance(user_id)
        if current_balance is None:
            return {"error": "User not found"}, 404
        else:
            current_balance = current_balance[0]

        # Calculate new quantity and balance
        new_quantity = portfolio_details[0] - quantity
        new_balance = current_balance + transaction_amount

        # Update user's balance
        update_user_balance(user_id, new_balance)

        # Update or remove stock from portfolio
        if new_quantity == 0:
            cur.execute(
                "DELETE FROM portfolio WHERE user_id = %s AND ticker = %s",
                (user_id, ticker),
            )
        else:
            cur.execute(
                "UPDATE portfolio SET quantity = %s WHERE user_id = %s AND ticker = %s",
                (new_quantity, user_id, ticker),
            )

        # Record the transaction in the transactions table
        record_transaction(
            user_id, ticker, quantity, price, "SELL", transaction_amount
        )
        return {"message": "Sale successful"}, 200

    except Exception as e:
        logger.error(f"Error occurred while selling stock: {e}")
        cur.connection.rollback()
        return {"error": "An error occurred while processing the sell transaction"}, 500


@app.route("/trade", methods=["POST"])
def trade():
    """To handle all the user's transactions"""
    transaction_details = request.get_json()
    user_id = transaction_details.get("user_id")
    transaction_type = transaction_details.get("transaction_type", "").upper()
    ticker = transaction_details.get("ticker")
    quantity = Decimal(transaction_details.get("quantity", 0))
    transaction_amount = Decimal(transaction_details.get("transaction_amount", 0))
    price = Decimal(transaction_details.get("price", 0))

    if not all([user_id, transaction_type, ticker, quantity, transaction_amount]):
        return jsonify({"error": "Missing transaction details"}), 400

    cur = mysql.connection.cursor()

    try:
        if transaction_type == "BUY":
            # Handle buy logic using helper functions
            response, status_code = handle_buy_transaction(
                cur, user_id, ticker, quantity, price, transaction_amount
            )
        elif transaction_type == "SELL":
            # Handle sell logic using helper functions
            response, status_code = handle_sell_transaction(
                cur, user_id, ticker, quantity, price, transaction_amount
            )
        else:
            return jsonify({"error": "Invalid trade type"}), 400

        mysql.connection.commit()
        return jsonify(response), status_code
    except Exception as e:
        mysql.connection.rollback()
        return handle_database_error(e)
    finally:
        cur.close()


@app.route("/portfolio", methods=["GET"])
def portfolio():
    user_id = request.args.get("user_id")

    if not user_id:
        logger.warning("user_id is required for fetching portfolio.")
        return jsonify({"error": "user_id is required"}), 400

    try:
        # Fetch portfolio details from the database
        portfolio = execute_fetchall(
            "SELECT ticker, quantity, average_price FROM portfolio WHERE user_id = %s",
            (user_id,),
        )
        
        # Check if portfolio data was retrieved successfully
        if portfolio is None:
            logger.error(f"Failed to retrieve portfolio data for user_id {user_id}")
            return jsonify({"error": "Failed to retrieve portfolio data"}), 500

        # Format the portfolio data for frontend use
        formatted_portfolio = [
            {"ticker": record[0], "quantity": record[1], "average_price": record[2]}
            for record in portfolio
        ]

        logger.info(f"Successfully retrieved portfolio for user_id {user_id}")
        return jsonify({"portfolio": formatted_portfolio}), 200

    except Exception as e:
        logger.error(f"Error retrieving portfolio for user_id {user_id}: {e}")
        return jsonify({"error": "An error occurred while fetching the portfolio"}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
