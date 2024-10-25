from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import yfinance as yf
from utils import *

app = Flask(__name__)
CORS(app) 
mysql = MySQL(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'mohit'
app.config['MYSQL_DB'] = 'sellscale'

sectors = ['technology', 'healthcare', 'real-estate']
sector_wise_top_companies = {}

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
    cur.execute("SELECT * FROM transactions WHERE user_id=1 ORDER BY timestamp DESC LIMIT 4");
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
    ticker_info = stock.info

    current_price = ticker_info['currentPrice']
    marketcap = ticker_info['marketCap']
    fulltime_employees = ticker_info['fullTimeEmployees']
    ceo = ticker_info['companyOfficers'][0]['name']
    headquarters = ticker_info['city']+", "+ticker_info['state']
    dividend_yield = ticker_info['dividendYield']
    avg_volume = ticker_info['averageVolume']
    earnings_growth = ticker_info['earningsGrowth']
    gross_margins = ticker_info['grossMargins']
    summary = ticker_info['longBusinessSummary']

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

@app.route('/trade', methods=['GET', 'POST'])
def trade():
    
    cur = mysql.connection.cursor()

    if request.method == 'POST':
        transaction_details = request.get_json()
        user_id = transaction_details.get('user_id')
        transaction_type = transaction_details.get('transaction_type')
        ticker = transaction_details.get('ticker')
        quantity = transaction_details.get('quantity')
        transaction_amount = transaction_details.get('total_amount')
        price = transaction_details.get('price')  # Adding 'price' to handle it

        if not (user_id and transaction_type and ticker and quantity and transaction_amount):
            return jsonify({"error": "Missing transaction details"}), 400

        if transaction_type == 'BUY':
            # Get balance to check for sufficient funds
            cur.execute('SELECT total_balance FROM users WHERE id = %s', (user_id,))
            user_details = cur.fetchone()

            if user_details:
                current_balance = float(user_details[0])

                if transaction_amount > current_balance:
                    return jsonify({"error": 'Insufficient funds'}), 400

                # Update user's total balance
                new_balance = current_balance - transaction_amount
                cur.execute('UPDATE users SET total_balance = %s WHERE id = %s', (new_balance, user_id))

                # Update or insert stock in portfolio
                cur.execute('SELECT quantity FROM portfolio WHERE user_id = %s AND ticker = %s', (user_id, ticker))
                portfolio_details = cur.fetchone()

                if portfolio_details:
                    new_quantity = portfolio_details['quantity'] + quantity
                    cur.execute('UPDATE portfolio SET quantity = %s WHERE user_id = %s AND ticker = %s', (new_quantity, user_id, ticker))
                else:
                    cur.execute('INSERT INTO portfolio (user_id, ticker, quantity, average_price) VALUES (%s, %s, %s, %s)', (user_id, ticker, quantity, price))

                # Record the transaction
                cur.execute('INSERT INTO transactions (user_id, ticker, quantity, price, trade_type) VALUES (%s, %s, %s, %s, %s)', (user_id, ticker, quantity, price, transaction_type))

                mysql.connection.commit()
                return jsonify({"message": "Purchase successful"}), 200
            else:
                return jsonify({"error": "User not found"}), 404

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
                    return jsonify({"error": "User not found"}), 404
            else:
                return jsonify({"error": "You currently do not have sufficient stocks to sell"}), 400

        else:
            return jsonify({"error": "Invalid trade type"}), 400
    else:
        return jsonify({"error": "Invalid request method, only POST is allowed"}), 405

    #cur.close()

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


# import yfinance as yf

# msft = yf.Ticker("MSFT")

# information = msft.info

# for key,value in information.items():
#     if "buy" in key.lower():
#         print(key, ":", value)

# def getPrice()





# from flask import Flask, request, jsonify
# from flask_mysqldb import MySQL
# import yfinance as yf

# app = Flask(__name__)
# mysql = MySQL(app)

# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = 'mohit'
# app.config['MYSQL_DB'] = 'sellscale'


# @app.route('/')
# def home():
    
#     cur = mysql.connection.cursor()
#     user_id = request.args.get('user_id')

#     #Get total balance of the user's account
#     cur.execute('SELECT total_balance FROM users WHERE user_id= %s',(user_id,))
#     user_details = cur.fetchone()
#     total_balance = user_details['total_balance']

#     #Get income in the last week


#     #Get expense in the last week


#     #Get Recent transactions.
    
    
#     return "Welcome to Scalehood"
    

# @app.route('/tickerInfo/<ticker>',methods=['GET'])
# def tickerInfo(ticker):
    
#     stock = yf.Ticker(ticker)
#     ticker_info = stock.info

#     marketcap = ticker_info['marketCap']
#     fulltime_employees = ticker_info['fullTimeEmployees']
#     ceo = ticker_info['companyOfficers'][0]['name']
#     headquarters = ticker_info['city']+", "+ticker_info['state']
#     dividend_yield = ticker_info['dividendYield']
#     avg_volume = ticker_info['averageVolume']
#     summary = ticker_info['longBusinessSummary']

#     return jsonify({
#         "marketcap": marketcap,
#         "fulltime_employees": fulltime_employees,
#         "ceo": ceo,
#         "headquarters": headquarters,
#         "dividend_yield": dividend_yield,
#         "avg_volume": avg_volume,
#         "summary": summary
#     })

# @app.route('/trade',methods=['GET','POST'])
# def trade():

#     cur = mysql.connection.cursor()

#     if request.method == 'POST':

#         transaction_details = request.get_json()
#         user_id = transaction_details.get('user_id')
#         transaction_type = transaction_details.get('trade_type')
#         ticker = transaction_details.get('ticker')
#         quantity = transaction_details.get('quantity')
#         transaction_amount = transaction_details.get('total_amount')

#         if(transaction_type=='BUY'):

#             #Get balance to check sufficient funds for the transaction
#             cur.execute('SELECT total_balance FROM users WHERE id = %s', (user_id,))
#             user_details = cur.fetchone()
#             current_balance = user_details['total_balance']

#             #verify valid transaction
#             if(transaction_amount > current_balance):
#                 return jsonify({"error": 'Insufficient funds'}), 400
            
#             #update user's total balance after a valid transaction
#             new_balance = current_balance - transaction_amount
#             cur.execute('UPDATE users SET total_balance = %s WHERE id = %s', (new_balance, user_id))

#             #if transaction goes through, increase the quantity of stocks in user's portfolio
#             cur.execute('SELECT quantity FROM portfolio WHERE user_id = %s AND ticker = %s', (user_id, ticker))
#             portfolio_details = cur.fetchone()

#             #if this is a new stock, then insert a new record/row in the portfolio or else, just update the user's portfolio with new quantity
#             if(portfolio_details):
#                 new_quantity = portfolio_details['quantity'] + quantity
#                 cur.execute('UPDATE portfolio SET quantity = %s WHERE user_id = %s AND ticker = %s',(new_quantity, user_id, ticker))
#             else:
#                 cur.execute('INSERT INTO portfolio (user_id, ticker, quantity, average_price) VALUES (%s, %s, %s, %s)',(user_id, ticker, quantity, price))
            
#             #record this transaction in the db
#             cur.execute('INSERT INTO transactions (user_id, ticker, quantity, price, trade_type) VALUES (%s, %s, %s, %s, %s)',(user_id, ticker, quantity, price, transaction_type))

#             mysql.connection.commit()
#             return jsonify({"message": "Purchase successful"}), 200
        
#         elif (transaction_type=='SELL'):

#             #First, check for sufficient number of shares for the transaction
#             cur.execute('SELECT quantity FROM portfolio WHERE user_id = %s AND ticker = %s', (user_id, ticker))
#             portfolio_details = cur.fetchone()
#             current_quantity = portfolio_details['quantity']

#             if(current_quantity < quantity):
#                 return jsonify({"error": "You currently do not have sufficient stocks to sell"}), 400
            
#             cur.execute('SELECT total_balance FROM users WHERE id = %s', (user_id,))
#             user_details = cur.fetchone()
#             current_balance = user_details['total_balance']

#             #If the transaction goes through, update the user's total balance and decrease the current quantity in user's portfolio
#             new_quantity = current_quantity - quantity
#             new_balance = current_balance + transaction_amount
#             cur.execute('UPDATE users SET total_balance = balance + %s WHERE id = %s', (new_balance, user_id))

#             #If all shares are sold for a particular stock, then delete that stock from the user's portfolio
#             # if new_quantity == 0:
#             #     cur.execute('DELETE FROM portfolio WHERE user_id = %s AND ticker = %s', (user_id, ticker))
#             # else:
#             cur.execute('UPDATE portfolio SET quantity = %s WHERE user_id = %s AND ticker = %s',(new_quantity, user_id, ticker))

#             #record this transaction in the db
#             cur.execute('INSERT INTO transactions (user_id, ticker, quantity, price, trade_type) VALUES (%s, %s, %s, %s, %s)',(user_id, ticker, quantity, price, transaction_type))

#             mysql.connection.commit()
#             return jsonify({"message": "Sale successful"}), 200

#     else:
#         return jsonify({"message":"Invalid request"}), 400
    
#     cur.close()

# @app.route('/portfolio',methods=['GET'])
# def portfolio():

#     cur = mysql.connection.cursor()

#     user_id = request.args.get('user_id')

#     #to get the list of all previously bought stocks
#     cur.execute('SELECT ticker,quantity,average_price FROM portfolio WHERE user_id= %s',(user_id,))
#     portfolio = cur.fetchall()
#     cur.close()

#     # Return the user's portfolio as JSON
#     return jsonify({"portfolio": portfolio})

# if __name__=="__main__":
#     app.run(debug=True)


# # import yfinance as yf

# # msft = yf.Ticker("MSFT")

# # information = msft.info

# # for key,value in information.items():
# #     if "buy" in key.lower():
# #         print(key, ":", value)

# # def getPrice()


