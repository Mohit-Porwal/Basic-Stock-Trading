# import yfinance as yf

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

