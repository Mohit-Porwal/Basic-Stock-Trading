import { useNavigate } from 'react-router-dom';
import React from 'react'

export default function Header({ currentPrice, tickerName }) {
    const currentStockPrice = `$${currentPrice}`;
    const stock = tickerName;
    const navigate = useNavigate();

    const redirectToTrade = () => {
        navigate('/trade');
    }
    return (
        <div style={{ display: 'flex', jalignItems: 'center', gap: '10px', margin: '5% auto 20px', width: '75%' }}>
            <div>
                <h1 style={{ color: 'red', fontWeight: 'bold', fontSize: 50 }}>{stock}</h1>
                <h2 style={{ color: 'red', fontWeight: 'bold', fontSize: 30 }}>{currentStockPrice}</h2>
            </div>
        </div>
    );
}
