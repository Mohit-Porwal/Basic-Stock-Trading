import * as React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

export default function RecentTransactions({ recentTransactions }) {

  console.log("RECENT TRANSACTIONS " + recentTransactions);

  // Transform the transaction data to extract only the needed columns
  const transactions = recentTransactions.map(transaction => ({
    name: transaction[2],      // 3rd column (Stock symbol)
    type: transaction[3],      // 4th column (Transaction type)
    price: transaction[5],     // 5th column (Price)
    totalAmount: transaction[6], // 6th column (Total Amount)
  }));

  return (
    <Card
      sx={{
        width: 600, // Adjust the card width
        borderRadius: '20px',
        backgroundColor: '#20C997', // Match the background
        color: '#333333', // Text color to contrast
        padding: '16px',
        marginBottom: '20px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Add shadow for depth
      }}
    >
      <CardContent>
        {/* Transactions title */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', marginBottom: '16px' }}>
          <Typography variant="h6" sx={{ color: 'white' }}>Recent Transactions</Typography>
        </Box>

        <List>
          <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              {/* Adjusting each ListItemText with a fixed width */}
              <ListItemText
                primary="Ticker"
                sx={{ width: '20%', textAlign: 'center', color: 'white' }}
              />
              <ListItemText
                primary="Transaction"
                sx={{ width: '20%', textAlign: 'center', color: 'white' }}
              />
              <ListItemText
                primary="Price"
                sx={{ width: '20%', textAlign: 'center', color: 'white' }}
              />
              <ListItemText
                primary="Amount"
                sx={{ width: '20%', textAlign: 'center', color: 'white' }}
              />
            </Box>
          </ListItem>
        </List>

        {/* List of transactions */}
        <List sx={{ padding: 0 }}>
          {transactions.map((transaction, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <ListItemText
                    primary={transaction.name}
                    sx={{ width: '20%', textAlign: 'center', color: 'white' }}
                  />
                  <ListItemText
                    primary={transaction.type}
                    sx={{ width: '20%', textAlign: 'center', color: 'white' }}
                  />
                  <ListItemText
                    primary={transaction.price}
                    sx={{ width: '20%', textAlign: 'center', color: 'white' }}
                  />
                  <ListItemText
                    primary={transaction.totalAmount}
                    sx={{ width: '20%', textAlign: 'center', color: 'white' }}
                  />
                </Box>
              </ListItem>
              <Divider sx={{ backgroundColor: 'white' }} />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
