import * as React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

export default function RecentTransactions({ recentTransactions }) {
  // Extract transactions data for easier mapping
  const transactions = recentTransactions.map(transaction => ({
    name: transaction[2],      // Stock symbol
    type: transaction[3],      // Transaction type
    price: transaction[5],     // Price
    totalAmount: transaction[6] // Total Amount
  }));

  // Reusable function to render list items
  const renderListItem = (label, value) => (
    <ListItemText
      primary={<span style={{ fontWeight: 'bold' }}>{label}</span>}
      sx={{ width: '20%', textAlign: 'center', color: '#6bcab5', fontWeight: 'bold' }}
    />
  );

  return (
    <Card
      sx={{
        width: 600,
        borderRadius: '16px',
        backgroundColor: '#1b263b',
        color: 'white',
        padding: 1.5,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        marginBottom: 3,
        marginLeft: 2
      }}
    >
      <CardContent>
        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#6bcab5' }}>
            Recent Transactions
          </Typography>
        </Box>

        <List>
          {/* Header Row */}
          <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
            {renderListItem("Ticker")}
            {renderListItem("Transaction")}
            {renderListItem("Price")}
            {renderListItem("Amount")}
          </ListItem>
          <Divider sx={{ backgroundColor: 'lightgreen', opacity: 0.3 }} />

          {/* Transaction Rows */}
          {transactions.map((transaction, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
                {renderListItem(transaction.name)}
                {renderListItem(transaction.type)}
                {renderListItem(`$${transaction.price}`)}
                {renderListItem(`$${transaction.totalAmount}`)}
              </ListItem>
              {index < transactions.length - 1 && <Divider sx={{ backgroundColor: 'lightgreen', opacity: 0.3 }} />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
