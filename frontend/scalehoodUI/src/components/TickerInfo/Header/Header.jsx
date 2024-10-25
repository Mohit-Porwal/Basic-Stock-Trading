export default function Header({currentPrice, tickerName}){

    const currentStockPrice = `$${currentPrice}`;
    const stock = tickerName;

    return(
        <div style={{width: '45%', margin: 'auto', marginTop: '5%', marginBottom: '20px'}}>
            <h1 style={{color:'red', fontWeight: 'bold', fontSize: 50}}>{stock}</h1>
            <h2 style={{color:'red', fontWeight: 'bold', fontSize: 30}}>{currentStockPrice}</h2>
        </div>
    );
}