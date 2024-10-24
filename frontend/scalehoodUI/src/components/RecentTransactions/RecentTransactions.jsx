


// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// function createData(ticker, action, shares, price) {
//   return { ticker, action, shares, price };
// }

// const rows = [
//   createData('TSLA', 'BUY', 10, 24),
//   createData('MSFT', 'SELL', 20, 10),
//   createData('AAPL', 'BUY', 40, 5),
// ];

// export default function RecentTransactions() {
//   return (
//     <div style={{ marginTop: '30px' }}>
//       <h2>Recent Transactions</h2>
//       <TableContainer
//         component={Paper}
//         sx={{
//           borderRadius: '16px',
//           maxWidth: '800px', // Set max width for the container
//           margin: 'left', // Center the table
//         }}
//       >
//         <Table sx={{ width: '100%' }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Ticker</TableCell>
//               <TableCell align="right">Action</TableCell>
//               <TableCell align="right">Shares</TableCell>
//               <TableCell align="right">Price</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow
//                 key={row.ticker}
//                 sx={{
//                   '&:last-child td, &:last-child th': { border: 0 },
//                   borderBottom: 'none', // Remove row borders
//                 }}
//               >
//                 <TableCell component="th" scope="row">
//                   {row.ticker}
//                 </TableCell>
//                 <TableCell align="right">{row.action}</TableCell>
//                 <TableCell align="right">{row.shares}</TableCell>
//                 <TableCell align="right">{row.price}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }


import * as React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

export default function RecentTransactions() {
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
            <Typography variant="h6">Transactions</Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>
                View All
            </Typography>
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


// import * as React from 'react';
// import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

// export default function RecentTransactions() {
//   const transactions = [
//     { id: 1, name: 'Figma', amount: '-$15.00' },
//     { id: 2, name: 'Grammarly', amount: '-$10.00' },
//     { id: 3, name: 'Blender', amount: '-$15.00' },
//   ];

//   return (
//     <Card
//       sx={{
//         maxWidth: 350, // Adjust the card width
//         borderRadius: '20px', // Rounded corners
//         backgroundColor: 'rgba(0, 255, 0, 0.7)', // Transparent green background (light green with 20% opacity)
//         backdropFilter: 'blur(115px)', // Glass effect with a strong blur
//         color: 'white', // Text color
//         padding: '16px',
//         marginTop: '20px',
//         boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)', // Add shadow for depth
//         border: '1px solid rgba(255, 255, 255, 0.18)', // Light border for glassy effect
//       }}
//     >
//       <CardContent>
//         {/* Transactions title */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', marginBottom: '16px' }}>
//           <Typography variant="h6">Transactions</Typography>
//           <Typography variant="body2" sx={{ color: 'white' }}>
//             View All
//           </Typography>
//         </Box>

//         {/* List of transactions */}
//         <List sx={{ padding: 0 }}>
//           {transactions.map((transaction) => (
//             <React.Fragment key={transaction.id}>
//               <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//                   <ListItemText primary={transaction.name} sx={{ marginLeft: '16px', color: 'white' }} />
//                 </Box>
//                 <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
//                   {transaction.amount}
//                 </Typography>
//               </ListItem>
//               <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
//             </React.Fragment>
//           ))}
//         </List>
//       </CardContent>
//     </Card>
//   );
// }





