import './NavBar.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import React from 'react'
export default function NavBar(){

    const[ticker, setTicker] = useState('');
    const navigate = useNavigate();

    const onSubmit = (event) => {
        if(event.key === 'Enter' && ticker.trim()!== ''){
            navigate(`/tickerInfo/${ticker}`);
        }
    }

    return(
        <div className="header">
            <div className="logo-container">
            <img
                className="hoodlogo"
                src="C:\Users\porwa\OneDrive\Desktop\SellScaleHood\frontend\scalehoodUI\logos\hood.png"
                alt='scale hood logo'
            />
            <span className="app-name">ScaleHood</span>
            </div>

            <div className="search-container">
            <input
                type="text"
                placeholder='Search Tickers'
                className= "search-bar"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                onKeyUp={onSubmit}  // Trigger search on Enter
            />
            </div>

            <div className="userGreetings">
            <span>Hi Mohit!</span>
            </div>
        </div>
    )

}


