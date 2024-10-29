from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import yfinance as yf
from utils import *
from decimal import Decimal

app = Flask(__name__)
CORS(app) 
mysql = MySQL(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'mohit'
app.config['MYSQL_DB'] = 'sellscale'

sectors = ['technology', 'healthcare', 'real-estate']
sector_wise_top_companies = {}
DEFAULT_PLACEHOLDER = "Data not available"

@app.route('/',methods=['GET'])
def home():
    
    cur = mysql.connection.cursor()
    user_id = request.args.get('user_id')

    #Get total balance of the user's account
    cur.execute('SELECT total_balance FROM users WHERE id= %s',(user_id,))
    user_details = cur.fetchone()
    total_balance = user_details[0]

    #Get income in the last week
    

    #Get expense in the last week


    #Get Recent transactions.
    cur.execute('SELECT * FROM transactions WHERE user_id = %s ORDER BY timestamp DESC LIMIT 5',(user_id,));
    transaction_details = cur.fetchall()
    recent_transactions = transaction_details
    
    #Banner information
    #In total we will have 4 types of cards here
    #Top companies of each of the three sectors (total 3 cards. One card for each sector)
    #Latest stocks
    sector_wise_top_companies = get_top_companies(sectors)
    latest_stocks = get_latest_stocks(sectors)

    #Payload for home page
    response_data = {
        "total_balance": total_balance,
        "recent_transactions": recent_transactions,
        "sector_wise_top_companies": sector_wise_top_companies,
        "latest_stocks": latest_stocks
    }

    return jsonify(response_data)
    

@app.route('/tickerInfo/<ticker>',methods=['GET'])
def tickerInfo(ticker):

    stock = yf.Ticker(ticker)

    #Data for graph
    oneDay_history = stock.history(period="1d")
    one_week_history = stock.history(period="5d")
    one_month_history = stock.history(period="1mo")
    three_month_history = stock.history(period="3mo")
    one_year_history = stock.history(period="1y")
    five_year_history = stock.history(period="5y")

    graph = {'1d':oneDay_history, '5d': one_week_history, '1mo': one_month_history, '3mo': three_month_history, '1y': one_year_history, '5y': five_year_history}

    ticker_info = stock.info

    # Data for header
    current_price = ticker_info.get('currentPrice', DEFAULT_PLACEHOLDER)

    # Data for company info
    marketcap = ticker_info.get('marketCap', DEFAULT_PLACEHOLDER)
    fulltime_employees = ticker_info.get('fullTimeEmployees', DEFAULT_PLACEHOLDER)
    ceo = ticker_info.get('companyOfficers', [{}])[0].get('name', DEFAULT_PLACEHOLDER)  # Using [{}] to prevent IndexError
    headquarters = ticker_info.get('city', "") + ", " + ticker_info.get('state', DEFAULT_PLACEHOLDER)
    dividend_yield = ticker_info.get('dividendYield', DEFAULT_PLACEHOLDER)
    avg_volume = ticker_info.get('averageVolume', DEFAULT_PLACEHOLDER)
    earnings_growth = ticker_info.get('earningsGrowth', DEFAULT_PLACEHOLDER)
    gross_margins = ticker_info.get('grossMargins', DEFAULT_PLACEHOLDER)

    # Data for about section
    summary = ticker_info.get('longBusinessSummary', DEFAULT_PLACEHOLDER)

    return jsonify({
        "current_price": current_price,
        "marketcap": marketcap,
        "fulltime_employees": fulltime_employees,
        "ceo": ceo,
        "headquarters": headquarters,
        "dividend_yield": dividend_yield,
        "avg_volume": avg_volume,
        "earnings_growth": earnings_growth,
        "gross_margins": gross_margins,
        "summary": summary
    })

@app.route('/trade', methods=['POST'])
def trade():

    data = request.json
    app.logger.info(f"Received data: {data}")  # Log received data

    cur = mysql.connection.cursor()

    if request.method == 'POST':
        transaction_details = request.get_json()
        user_id = transaction_details.get('user_id')
        transaction_type = transaction_details.get('transaction_type').upper()
        ticker = transaction_details.get('ticker')
        quantity = Decimal(transaction_details.get('quantity'))
        transaction_amount = Decimal(transaction_details.get('transaction_amount'))
        price = Decimal(transaction_details.get('price'))  # Adding 'price' to handle it

        if not (user_id and transaction_type and ticker and quantity and transaction_amount):
            return jsonify({"error": "Missing transaction details"}), 400

        try:
            if transaction_type == 'BUY':
                # Get balance to check for sufficient funds
                cur.execute('SELECT total_balance FROM users WHERE id = %s', (user_id,))
                user_details = cur.fetchone()

                if user_details:
                    current_balance = Decimal(user_details[0])

                    if transaction_amount > current_balance:
                        return jsonify({"error": 'Insufficient funds'}), 400

                    # Update user's total balance
                    new_balance = current_balance - transaction_amount
                    cur.execute('UPDATE users SET total_balance = %s WHERE id = %s', (new_balance, user_id))

                    # Update or insert stock in portfolio
                    cur.execute('SELECT quantity FROM portfolio WHERE user_id = %s AND ticker = %s', (user_id, ticker))
                    portfolio_details = cur.fetchone()

                    try:
                        if portfolio_details:
                            new_quantity = portfolio_details[0] + quantity
                            new_average_price = get_new_average_price(cur, user_id, quantity, price, ticker)
                            cur.execute('UPDATE portfolio SET quantity = %s, average_price = %s WHERE user_id = %s AND ticker = %s', (new_quantity, new_average_price, user_id, ticker))
                        else:
                            cur.execute('INSERT INTO portfolio (user_id, ticker, quantity, average_price) VALUES (%s, %s, %s, %s)', (user_id, ticker, quantity, price))
                    
                    except Exception as e:
                        print("Error:", e) 
                    
                    # Record the transaction
                    cur.execute('INSERT INTO transactions (user_id, ticker, quantity, price, trade_type) VALUES (%s, %s, %s, %s, %s)', (user_id, ticker, quantity, price, transaction_type))

                    mysql.connection.commit()
                    return jsonify({"message": "Purchase successful"}), 200
                else:
                    return jsonify({"error": "Please try again later"}), 404

            elif transaction_type == 'SELL':
                # Check if the user has sufficient shares to sell
                cur.execute('SELECT quantity FROM portfolio WHERE user_id = %s AND ticker = %s', (user_id, ticker))
                portfolio_details = cur.fetchone()

                if portfolio_details and portfolio_details[0] >= quantity:
                    cur.execute('SELECT total_balance FROM users WHERE id = %s', (user_id,))
                    user_details = cur.fetchone()

                    if user_details:
                        current_balance = user_details[0]

                        # Update user's balance and portfolio
                        new_quantity = portfolio_details[0] - quantity
                        new_balance = current_balance + transaction_amount
                        cur.execute('UPDATE users SET total_balance = %s WHERE id = %s', (new_balance, user_id))

                        if new_quantity == 0:
                            cur.execute('DELETE FROM portfolio WHERE user_id = %s AND ticker = %s', (user_id, ticker))
                        else:
                            cur.execute('UPDATE portfolio SET quantity = %s WHERE user_id = %s AND ticker = %s', (new_quantity, user_id, ticker))

                        # Record the transaction
                        cur.execute('INSERT INTO transactions (user_id, ticker, quantity, price, trade_type) VALUES (%s, %s, %s, %s, %s)', (user_id, ticker, quantity, price, transaction_type))

                        mysql.connection.commit()
                        return jsonify({"message": "Sale successful"}), 200
                    else:
                        return jsonify({"error": "Please try again later"}), 404
                else:
                    return jsonify({"error": "You currently do not have sufficient stocks to sell"}), 400

            else:
                return jsonify({"error": "Invalid trade type"}), 400
        
        except Exception as e:
            # Log the error if necessary (e.g., using logging module)
            return jsonify({"error": "An error occurred while processing your request."}), 500

    else:
        return jsonify({"error": "Invalid request method, only POST is allowed"}), 405
    
    # cur.close()
def get_new_average_price(cur, user_id, quantity, price, ticker):

    #Get current average price and current shares owned
    cur.execute('SELECT quantity, average_price FROM portfolio WHERE user_id = %s AND ticker = %s',(user_id, ticker,))
    operands = cur.fetchone()
    total_cost_before = operands[0] * operands[1]

    #Get the new additional cost from new transaction
    additional_cost = quantity * price

    #Get new total cost
    new_total_cost = total_cost_before + additional_cost

    #Get new total shares owned
    new_total_shares_owned = operands[0] + quantity

    #Calculate new average price
    new_average_price = new_total_cost/new_total_shares_owned

    return new_average_price


@app.route('/portfolio',methods=['GET'])
def portfolio():

    cur = mysql.connection.cursor()

    user_id = request.args.get('user_id')

    #to get the list of all previously bought stocks
    cur.execute('SELECT ticker,quantity,average_price FROM portfolio WHERE user_id= %s',(user_id,))
    portfolio = cur.fetchall()
    cur.close()

    # Return the user's portfolio as JSON
    return jsonify({"portfolio": portfolio})

if __name__=="__main__":
    app.run(debug=True)
