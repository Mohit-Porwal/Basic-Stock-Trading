import * as React from 'react';
import { Box } from '@mui/material';
import BalanceCard from './BalanceCard';
import IncomeCard from './IncomeCard';
import ExpenseCard from './ExpenseCard';

export default function FinancialMetrics({ totalBalance, weeklyIncome, weeklyExpense }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, backgroundColor: '#3C3C3E', color: '#6bcab5', padding: 2, borderRadius: '12px' }}>
      <BalanceCard totalBalance={totalBalance} />
      <IncomeCard weeklyIncome={weeklyIncome} />
      <ExpenseCard weeklyExpense={weeklyExpense} />
    </Box>
  );
}

