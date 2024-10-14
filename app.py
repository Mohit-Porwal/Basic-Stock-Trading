import yfinance as yf

msft = yf.Ticker("MSFT")

information = msft.info

for key,value in information.items():
    if "earnings" in key.lower():
        print(key, ":", value)

# hist = msft.history(period="1mo")

# print(hist)