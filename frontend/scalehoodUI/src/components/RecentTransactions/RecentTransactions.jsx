import * as React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

export default function RecentTransactions({ recentTransactions }) {
  const transactions = recentTransactions.map(transaction => ({
    name: transaction[2],      // Stock symbol
    type: transaction[3],      // Transaction type
    price: transaction[5],     // Price
    totalAmount: transaction[6] // Total Amount
  }));

  return (
    <Card
      sx={{
        width: 600,
        borderRadius: '16px',
        backgroundColor: '#1b263b',
        color: 'white',
        padding: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        marginBottom: 3,
      }}
    >
      <CardContent>
        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#6bcab5' }}>
            Recent Transactions
          </Typography>
        </Box>

        <List>
          <ListItem sx={{ paddingLeft: 0, paddingRight: 0, fontWeight: 700, color: '#6bcab5'}}>
            <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Ticker</span>} sx={{ width: '20%', textAlign: 'center' }} />
            <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Transaction</span>} sx={{ width: '20%', textAlign: 'center' }} />
            <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Price</span>} sx={{ width: '20%', textAlign: 'center' }} />
            <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Amount</span>} sx={{ width: '20%', textAlign: 'center' }} />
          </ListItem>
          <Divider sx={{ backgroundColor: 'lightgreen', opacity: 0.3}} />

          {transactions.map((transaction, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ paddingLeft: 0, paddingRight: 0, color: '#6bcab5',fontWeight: 'bold' }}>
                <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{transaction.name}</span>} sx={{ width: '20%', textAlign: 'center' }} />
                <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{transaction.type}</span>} sx={{ width: '20%', textAlign: 'center' }} />
                <ListItemText primary={<span style={{ fontWeight: 'bold' }}>${transaction.price}</span>} sx={{ width: '20%', textAlign: 'center'}} />
                <ListItemText primary={<span style={{ fontWeight: 'bold' }}>${transaction.totalAmount}</span>} sx={{ width: '20%', textAlign: 'center'}} />
              </ListItem>
              {index < transactions.length - 1 && <Divider sx={{ backgroundColor: 'lightgreen', opacity: 0.3 }} />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
