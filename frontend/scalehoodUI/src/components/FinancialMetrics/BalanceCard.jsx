import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BalanceCard({ totalBalance }) {

  return (
    <Card
      sx={{
        width: 180,
        height: 180,
        // backgroundColor: '#EAF6FF',
        backgroundColor: '#1b263b',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 16px rgba(31, 38, 135, 0.3)',
        // border: '10px solid #007BFF',
        border: '10px solid #1b263b'
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography gutterBottom sx={{ color: '#6bcab5', fontSize: 14 }}>
          Your Balance
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#6bcab5' }}>
          ${totalBalance}
        </Typography>
      </CardContent>
    </Card>
  );
}
