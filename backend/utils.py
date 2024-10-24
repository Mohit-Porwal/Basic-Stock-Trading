import random
import yfinance as yf
import pandas as pd
# companyname = yf.Ticker('AAPL')

# infor = companyname.info

# #print(infor['longBusinessSummary'])

# # for key,value in infor.items():
# #     #if "description" in key.lower():
# #     print(key, ":", value)

# def get_marketcap(ticker):
#     company_name = yf.Ticker(ticker)
#     ticker_info = company_name.info
#     return ticker_info['marketCap']

# def get_fulltime_employees(ticker):
#     company_name = yf.Ticker(ticker)
#     ticker_info = company_name.info
#     return ticker_info['fullTimeEmployees']

# def get_ceoname(ticker):
#     company_name = yf.Ticker(ticker)
#     ticker_info = company_name.info
#     return ticker_info['companyOfficers'][0]['name']

# def get_headquarters(ticker):
#     company_name = yf.Ticker(ticker)
#     ticker_info = company_name.info
#     return (ticker_info['city']+", "+ticker_info['state'])

# def get_dividend_yield(ticker):
#     company_name = yf.Ticker(ticker)
#     ticker_info = company_name.info
#     return ticker_info['dividendYield']

# def get_avg_volume(ticker):
#     company_name = yf.Ticker(ticker)
#     ticker_info = company_name.info
#     return ticker_info['averageVolume']

# def get_company_summary(ticker):
#     company_name = yf.Ticker(ticker)
#     ticker_info = company_name.info
#     return ticker_info['longBusinessSummary']    

def get_top_companies(sectors):
    companies = {}
    for sector in sectors:
        top_companies = (yf.Sector(sector)).top_companies
        df = pd.DataFrame(top_companies)
        top_companies_list = df['name'].tolist()
        companies[sector] = top_companies_list[:10]
    return companies

def get_latest_stocks(sectors):
    stock_price = {}
    for sector in sectors:
        top_companies = (yf.Sector(sector)).top_companies
        ticker_list = top_companies.index.tolist()
    for ticker in ticker_list:   
        ticker_info = (yf.Ticker(ticker)).info
        ticker_price = ticker_info['currentPrice']
        stock_price[ticker] = ticker_price
    return dict(random.sample(list(stock_price.items()), 10))

