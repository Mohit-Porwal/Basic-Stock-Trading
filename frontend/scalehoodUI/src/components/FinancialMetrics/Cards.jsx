import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import BalanceCard from './BalanceCard';
import IncomeCard from './IncomeCard';
import ExpenseCard from './ExpenseCard';

export default function FinancialMetrics({totalBalance, weeklyIncome, weeklyExpense}) {

  // const [data, setData] = useState({});

  // // Fetch user data when the component mounts
  // useEffect(() => {
  //   const fetchData = async () => {

  //     console.log("FETCH DATA HAS BEEN CALLED");

  //     try {
  //       const response = await fetch('http://127.0.0.1:5000?user_id=1'); 

  //       console.log("RESPONSE "+ response);

  //       const result = await response.json();

  //       console.log("THIS IS THE RESULT "+result);

  //       setData(result);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', backgroundColor: '#3C3C3E', marginBottom: '20px' }}>

      <BalanceCard totalBalance={totalBalance}/>
      <IncomeCard weeklyIncome={weeklyIncome}/>
      <ExpenseCard weeklyExpense={weeklyExpense}/>

    </Box>
  );
}
