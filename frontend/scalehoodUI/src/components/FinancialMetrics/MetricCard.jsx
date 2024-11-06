import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function MetricCard({ title, amount }) {

  return (
    <Card
      sx={{
        width: 180,
        height: 180,
        backgroundColor: '#1b263b',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 16px rgba(31, 38, 135, 0.3)',
        border: '10px solid #1b263b'
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography gutterBottom sx={{ color: '#6bcab5', fontSize: 14 }}>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#6bcab5' }}>
          ${amount}
        </Typography>
      </CardContent>
    </Card>
  );
}
