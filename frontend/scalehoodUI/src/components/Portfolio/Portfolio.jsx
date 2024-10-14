import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

// Dummy data for the list of stocks
const stockList = [
  { id: 1, ticker: 'AAPL', quantity: 10, price: '$150' },
  { id: 2, ticker: 'GOOGL', quantity: 5, price: '$2800' },
  { id: 3, ticker: 'TSLA', quantity: 8, price: '$700' },
  { id: 4, ticker: 'MSFT', quantity: 12, price: '$300' },
  { id: 5, ticker: 'AMZN', quantity: 7, price: '$3400' },
  { id: 6, ticker: 'NFLX', quantity: 4, price: '$500' },
  { id: 7, ticker: 'FB', quantity: 15, price: '$350' },
  { id: 8, ticker: 'NVDA', quantity: 6, price: '$230' },
  { id: 9, ticker: 'BABA', quantity: 10, price: '$180' },
  { id: 10, ticker: 'SPCE', quantity: 20, price: '$40' },
  // Add more stocks if needed
];

const Portfolio = () => {
  const [visibleStocks, setVisibleStocks] = useState(5);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && visibleStocks < stockList.length) {
      setVisibleStocks((prev) => Math.min(prev + 5, stockList.length));
    }
  };

  return (
    <Box sx={{
      backgroundColor: 'transparent', // Dark background
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      padding: '20px'
    }}>
      {/* Header */}
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>
        Previously bought stocks
      </Typography>

      {/* Scrollable list container with outer scrollbar */}
      <Box sx={{
        width: '100%',
        maxWidth: '600px',
        maxHeight: '400px',
        overflow: 'hidden', // Hide inner scrollbar
        position: 'relative',
        borderRadius: '20px',
        backgroundColor: '#1b263b', // Box background to match screenshot
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
        padding: '20px'
      }}>
        <Box sx={{
          maxHeight: '340px',
          overflowY: 'scroll', // Outer scrollbar
          paddingRight: '20px',
          scrollbarWidth: 'none', // Hide default scrollbar
        }} onScroll={handleScroll}>
          <List sx={{ padding: 0 }}>
            {stockList.slice(0, visibleStocks).map((stock) => (
              <React.Fragment key={stock.id}>
                <ListItem sx={{
                  paddingLeft: 0,
                  paddingRight: 0,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <ListItemText primary={stock.ticker} sx={{ color: '#ffffff' }} />
                  <ListItemText primary={`Qty: ${stock.quantity}`} sx={{ color: '#a0a0a0' }} />
                  <ListItemText primary={stock.price} sx={{ color: '#ffffff' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: '#2e3a4b' }} />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Portfolio;

