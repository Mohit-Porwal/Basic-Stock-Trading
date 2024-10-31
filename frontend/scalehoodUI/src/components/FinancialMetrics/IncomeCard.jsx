import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function IncomeCard( {weeklyIncome} ) {

  const userWeeklyIncome = weeklyIncome;

  return (
    <Card sx={{ 
      width: 180,         // Diameter of the circle
      height: 180,        // Equal to width for circular shape
      backgroundColor: '#1b263b',
      borderRadius: '50%', // Circular shape
      display: 'flex',     // To center the content
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)', // Optional shadow for depth
      // border: '15px solid #007BFF',
      border: '10px solid #1b263b'
    }}>
      <CardContent sx={{ textAlign: 'center' }}>
        {/* Title */}
        <Typography gutterBottom sx={{ color: '#6bcab5', fontSize: 14 }}>
          Weekly Income
        </Typography>
        {/* Amount */}
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#6bcab5' }}>
          ${userWeeklyIncome}
        </Typography>
      </CardContent>
    </Card>
  );
}
