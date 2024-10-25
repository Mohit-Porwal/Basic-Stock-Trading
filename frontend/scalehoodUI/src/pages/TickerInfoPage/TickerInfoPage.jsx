import * as React from 'react';
import { useEffect, useState } from 'react';
import Graph from '../../components/TickerInfo/Graph/Graph';
import About from '../../components/TickerInfo/About/About';
import CompanyInfo from '../../components/TickerInfo/CompanyInfo/CompanyInfo';
import Header from '../../components/TickerInfo/Header/Header';
import { useParams } from 'react-router-dom';

export default function TickerInfoPage(){

    const[tickerData, setTickerData] = useState(null);

    const { ticker } = useParams();
    
    //Fetch ticker info data from the DB when component mounts
    useEffect( () => {
        const fetchTickerInfo = async () => {
            console.log("Fetch ticker info has been called");
            try{
                const response = await fetch(`http://127.0.0.1:5000/tickerInfo/${ticker}`);
                const data = await response.json();
                console.log("Data "+ JSON.stringify(data));
                setTickerData(data);
            }catch(error){
                console.error("Error fetching data", error);
            }
        };
        fetchTickerInfo();
    }, [ticker]);

    return(
        <div>
            {/* Conditionally render each component based on tickerData availability */}
            {tickerData && (
                <>
                    <Header currentPrice={tickerData.current_price} tickerName={ticker} />
                    <Graph />
                    <About summary={tickerData.summary} />
                    <CompanyInfo 
                        marketcap={tickerData.marketcap} 
                        fullTimeEmployees={tickerData.fulltime_employees}
                        ceo={tickerData.ceo}
                        headquarters={tickerData.headquarters}
                        dividendYield={tickerData.dividend_yield}
                        averageVolume={tickerData.avg_volume}
                        earningsGrowth={tickerData.earnings_growth}
                        grossMargins={tickerData.gross_margins}
                    />
                </>
            )}
        </div>
    )
}



