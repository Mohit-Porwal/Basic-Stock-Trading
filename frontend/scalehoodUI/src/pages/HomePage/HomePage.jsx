import * as React from 'react';
import { useState, useEffect } from 'react';
import NavBar from '../../components/NavigationBar/NavBar';
import ButtonGroup from '../../components/ButtonGroups/Buttons';
import FinancialMetrics from '../../components/FinancialMetrics/FinancialMetrics';
import RecentTransactions from '../../components/RecentTransactions/RecentTransactions';
import Portfolio from '../../components/Portfolio/Portfolio';
import '../../global.css'
import Banner from '../../components/Banner/Banner';

export default function HomePage() {
    const [activeView, setActiveView] = useState('Home');

    const buttonData = [
        { name: 'Home', value: 'Home' },
        { name: 'Portfolio', value: 'Portfolio' },
    ];

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000?user_id=1'); 
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <NavBar/>
            <div style={{margin: 'auto', maxWidth: 1000}}>
                {/* Pass the activeView, setter function, and button data to ButtonGroup */}
                <ButtonGroup 
                    activeView={activeView} 
                    setActiveView={setActiveView} 
                    buttons={buttonData} 
                />
                <div style = {{display: 'flex', gap: '10px'}}>
                    <div style = {{display: 'flex', gap: '20px', marginTop: '10px', flexDirection: 'column'}}>
                        {/* Conditionally render components based on the active button */}
                        {activeView === 'Home' ? (
                            <>
                                <FinancialMetrics 
                                totalBalance = {data.total_balance}
                                weeklyIncome = {data.weekly_income}
                                weeklyExpense = {data.weekly_expense}/>
                                {data.recent_transactions && Array.isArray(data.recent_transactions) ? (
                                    <RecentTransactions
                                        recentTransactions={data.recent_transactions}
                                    />
                                ) : null}
                            </>
                        ) : null}
                    </div>
                    {/* Render Banner only when sector_wise_top_companies is available */}
                    {activeView === 'Home' && data.sector_wise_top_companies ? (
                        <Banner sectorWiseTopCompanies={data.sector_wise_top_companies} latestStocks={data.latest_stocks}/>
                    ) : null}
                    {activeView === 'Portfolio' ? <Portfolio /> : null}
                </div>
            </div>
        </div>
    );
}



