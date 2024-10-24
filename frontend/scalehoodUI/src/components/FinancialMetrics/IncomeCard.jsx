import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function IncomeCard(weekly_income) {

  const userWeeklyIncome = weekly_income.weekly_income

  return (
    <Card sx={{ 
      width: 180,         // Diameter of the circle
      height: 180,        // Equal to width for circular shape
      backgroundColor: '#EAF6FF',
      borderRadius: '50%', // Circular shape
      display: 'flex',     // To center the content
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)', // Optional shadow for depth
      border: '15px solid #007BFF',
    }}>
      <CardContent>
        {/* Title */}
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Income
        </Typography>
        {/* Amount */}
        <Typography variant="h5" component="div">
          {userWeeklyIncome}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
