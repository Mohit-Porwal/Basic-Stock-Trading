import ButtonGroup from '../../components/ButtonGroups/Buttons';
import { useState } from 'react';
import NavBar from '../../components/NavigationBar/NavBar';
import TradeCard from '../../components/Trade/TradeCard';

function TradePage(){

    const[activeView, setActiveView] = useState('Buy');

    const buttonData = [
        {name:'Buy',value:'Buy'},
        {name:'Sell',value:'Sell'},
    ]

    return(
        <div>
            <NavBar/>
            <div style={{margin: 'auto', maxWidth: 1000}}>
                <ButtonGroup activeView={activeView} setActiveView={setActiveView} buttons={buttonData}/>
                <TradeCard/>
                {/* <div>
                    {activeView === 'Buy' && <BuyComponent />}
                    {activeView === 'Sell' && <SellComponent />}
                </div> */}
            </div>
        </div>
    )
}
export default TradePage;