import * as React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

export default function RecentTransactions({ recentTransactions }) {

  console.log("RECENT TRANSACTIONS "+recentTransactions);
  
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
        width: 350, // Adjust the card width
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

        {/* List of transactions */}
        <List sx={{ padding: 0 }}>
          {transactions.map((transaction, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <ListItemText
                    primary={`${transaction.name} (${transaction.type})`}
                    sx={{ marginLeft: '16px', color: 'white' }}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {transaction.price} / {transaction.totalAmount}
                </Typography>
              </ListItem>
              <Divider sx={{ backgroundColor: 'white' }} />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
