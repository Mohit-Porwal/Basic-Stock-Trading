import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/portfolio?user_id=1`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Portfolio ", data.portfolio);
        setPortfolio(data.portfolio);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };
    fetchPortfolio();
  }, []);

  const renderListItem = (label, isHeader) => (
    <ListItemText 
      primary={<span style={{ fontWeight: 'bold' }}>{label}</span>} 
      sx={{ 
        color: isHeader ? 'inherit' : '#6bcab5', 
        width: '20%', 
        textAlign: 'center' 
      }} 
    />
  );

  return (
    <Box sx={{
      backgroundColor: 'transparent',
      color: '#6bcab5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      margin: 'auto',
    }}>
      {/* Header */}
      <Typography variant="h5" sx={{ marginBottom: '20px', color: 'red', fontWeight: 'bold' }}>
        Previously bought stocks
      </Typography>

      {/* Scrollable list container with outer scrollbar */}
      <Box sx={{
        width: '500px',
        maxHeight: '400px',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '20px',
        backgroundColor: '#1b263b',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
        padding: '20px'
      }}>
        <Box sx={{
          maxHeight: '340px',
          overflowY: 'scroll',
          paddingRight: '20px',
          scrollbarWidth: 'none',
        }}>
          <List sx={{ padding: 0 }}>
            <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
              {renderListItem("Ticker", true)}
              {renderListItem("Quantity", true)}
              {renderListItem("Average Price", true)}
            </ListItem>
            {portfolio.map((stock, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{
                  paddingLeft: 0,
                  paddingRight: 0,
                }}>
                  {renderListItem(stock.ticker, false)}
                  {renderListItem(stock.quantity, false)}
                  {renderListItem(`$${stock.average_price}`, false)}
                </ListItem>
                <Divider sx={{ backgroundColor: 'lightgreen', opacity: 0.2 }} />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};
