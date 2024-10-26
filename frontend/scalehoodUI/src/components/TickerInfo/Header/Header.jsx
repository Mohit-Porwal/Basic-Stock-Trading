export default function Header({ currentPrice, tickerName }) {
    const currentStockPrice = `$${currentPrice}`;
    const stock = tickerName;

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '5% auto 20px', width: '50%' }}>
            <div>
                <h1 style={{ color: 'red', fontWeight: 'bold', fontSize: 50 }}>{stock}</h1>
                <h2 style={{ color: 'red', fontWeight: 'bold', fontSize: 30 }}>{currentStockPrice}</h2>
            </div>
            <button style={{ backgroundColor: 'green', color:'white', borderRadius: '10px', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                Trade
            </button>
        </div>
    );
}
