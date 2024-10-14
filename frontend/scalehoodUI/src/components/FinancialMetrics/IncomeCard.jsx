import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function IncomeCard(weekly_income) {

  const userWeeklyIncome = weekly_income.weekly_income

  return (
    <Card sx={{ width: 275, backgroundColor: '#EAF6FF' }}>
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
