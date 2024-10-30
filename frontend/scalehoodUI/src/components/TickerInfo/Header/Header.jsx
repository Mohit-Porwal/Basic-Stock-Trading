import { useNavigate } from 'react-router-dom';
import React from 'react'

export default function Header({ currentPrice, tickerName, companyName }) {
    const currentStockPrice = `$${currentPrice}`;
    const stock = tickerName;
    const tickerCompanyName = companyName;
    const navigate = useNavigate();

    const redirectToTrade = () => {
        navigate('/trade');
    }
    return (
        <div style={{ display: 'flex', jalignItems: 'center', gap: '10px', margin: '5% auto 20px', width: '75%' }}>
            <div>
                <h1 style={{ color: '#6bcab5', fontWeight: 'bold', fontSize: 40 }}>{tickerCompanyName}</h1>
                <h2 style={{ color: '#6bcab5', fontWeight: 'bold', fontSize: 30 }}>{currentStockPrice}</h2>
            </div>
            <div>
                <h1 style={{ color: '#6bcab5', fontWeight: 'bold', fontSize: 36 }}>({stock})</h1>
            </div>
        </div>
    );
}
