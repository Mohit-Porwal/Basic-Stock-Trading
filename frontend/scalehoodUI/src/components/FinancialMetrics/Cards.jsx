import * as React from 'react';
import { Box } from '@mui/material';
import MetricCard from './MetricCard';

export default function FinancialMetrics({ totalBalance, weeklyIncome, weeklyExpense }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, backgroundColor: 'black', padding: 2, borderRadius: '12px' }}>
      <MetricCard title="Total Balance" amount={totalBalance} />
      <MetricCard title="Weekly Income" amount={weeklyIncome} />
      <MetricCard title="Weekly Expense" amount={weeklyExpense} />
    </Box> 
  );
}

