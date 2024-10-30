// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import BalanceCard from './BalanceCard';
// import IncomeCard from './IncomeCard';
// import ExpenseCard from './ExpenseCard';

// export default function FinancialMetrics({totalBalance, weeklyIncome, weeklyExpense}) {

//   return (
//     <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', backgroundColor: '#3C3C3E', marginBottom: '20px' }}>

//       <BalanceCard totalBalance={totalBalance}/>
//       <IncomeCard weeklyIncome={weeklyIncome}/>
//       <ExpenseCard weeklyExpense={weeklyExpense}/>

//     </Box>
//   );
// }


//CHat gpt recommended


import * as React from 'react';
import { Box } from '@mui/material';
import BalanceCard from './BalanceCard';
import IncomeCard from './IncomeCard';
import ExpenseCard from './ExpenseCard';

export default function FinancialMetrics({ totalBalance, weeklyIncome, weeklyExpense }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', backgroundColor: 'white', color: '#F8F9FA', padding: 2, borderRadius: '12px' }}>
      <BalanceCard totalBalance={totalBalance} />
      <IncomeCard weeklyIncome={weeklyIncome} />
      <ExpenseCard weeklyExpense={weeklyExpense} />
    </Box>
  );
}

