import * as React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

export default function LatestStocks() {
  const transactions = [
    { id: 1, name: 'Figma', amount: '-$15.00' },
    { id: 2, name: 'Grammarly', amount: '-$10.00' },
    { id: 3, name: 'Blender',amount: '-$15.00' },
  ];

  return (
    <Card
      sx={{
        width: 350, // Adjust the card width
        borderRadius: '20px',
        backgroundColor: '#20C997', // Match the background
        color: '333333', // Text color to contrast
        padding: '16px',
        marginBottom: '20px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Add shadow for depth
      }}
    >
        <CardContent>

            {/* Transactions title */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', marginBottom: '16px' }}>
            <Typography variant="h6">Stocks</Typography>
            </Box>

            {/* List of transactions */}
            <List sx={{ padding: 0 }}>
            {transactions.map((transaction) => (
                <React.Fragment key={transaction.id}>
                    <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <ListItemText primary={transaction.name} sx={{ marginLeft: '16px', color: 'white' }} />
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                            {transaction.amount}
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
