import random
import yfinance as yf
import pandas as pd

def get_top_companies(sectors):
    companies = {}
    for sector in sectors:
        top_companies = (yf.Sector(sector)).top_companies
        df = pd.DataFrame(top_companies)
        top_companies_list = df['name'].tolist()
        companies[sector] = top_companies_list[:10]
    return companies


