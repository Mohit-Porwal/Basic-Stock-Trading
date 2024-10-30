//************ORIGINAL ONE MADE BY ME */

// import * as React from 'react';
// import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

// export default function RecentTransactions({ recentTransactions }) {

//   console.log("RECENT TRANSACTIONS " + recentTransactions);

//   // Transform the transaction data to extract only the needed columns
//   const transactions = recentTransactions.map(transaction => ({
//     name: transaction[2],      // 3rd column (Stock symbol)
//     type: transaction[3],      // 4th column (Transaction type)
//     price: transaction[5],     // 5th column (Price)
//     totalAmount: transaction[6], // 6th column (Total Amount)
//   }));

//   return (
//     <Card
//       sx={{
//         width: 600, // Adjust the card width
//         borderRadius: '20px',
//         backgroundColor: '#20C997', // Match the background
//         color: '#333333', // Text color to contrast
//         padding: '16px',
//         marginBottom: '20px',
//         boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Add shadow for depth
//       }}
//     >
//       <CardContent>
//         {/* Transactions title */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px', marginBottom: '16px' }}>
//           <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>Recent Transactions</Typography>
//         </Box>

//         <List>
//           <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//               {/* Adjusting each ListItemText with a fixed width */}
//               <ListItemText
//                 primary="Ticker"
//                 sx={{ width: '20%', textAlign: 'center', color: 'black' }}
//               />
//               <ListItemText
//                 primary="Transaction"
//                 sx={{ width: '20%', textAlign: 'center', color: 'black' }}
//               />
//               <ListItemText
//                 primary="Price"
//                 sx={{ width: '20%', textAlign: 'center', color: 'black' }}
//               />
//               <ListItemText
//                 primary="Amount"
//                 sx={{ width: '20%', textAlign: 'center', color: 'black' }}
//               />
//             </Box>
//           </ListItem>
//         </List>

//         {/* List of transactions */}
//         <List sx={{ padding: 0 }}>
//           {transactions.map((transaction, index) => (
//             <React.Fragment key={index}>
//               <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//                   <ListItemText
//                     primary={transaction.name}
//                     sx={{ width: '20%', textAlign: 'center', color: 'black', fontWeight: 'bold' }}
//                   />
//                   <ListItemText
//                     primary={transaction.type}
//                     sx={{ width: '20%', textAlign: 'center', color: 'black', fontWeight: 'bold' }}
//                   />
//                   <ListItemText
//                     primary={`$${transaction.price}`}
//                     sx={{ width: '20%', textAlign: 'center', color: 'black', fontWeight: 'bold' }}
//                   />
//                   <ListItemText
//                     primary={transaction.totalAmount}
//                     sx={{ width: '20%', textAlign: 'center', color: 'black', fontWeight: 'bold' }}
//                   />
//                 </Box>
//               </ListItem>
//               <Divider sx={{ backgroundColor: 'white' }} />
//             </React.Fragment>
//           ))}
//         </List>
//       </CardContent>
//     </Card>
//   );
// }

//***********Chat GPT first suggestion */

// import * as React from 'react';
// import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

// export default function RecentTransactions({ recentTransactions }) {
//   console.log("RECENT TRANSACTIONS:", recentTransactions);

//   // Transform the transaction data to extract only the needed columns
//   const transactions = recentTransactions.map(transaction => ({
//     name: transaction[2],       // 3rd column (Stock symbol)
//     type: transaction[3],       // 4th column (Transaction type)
//     price: transaction[5],      // 5th column (Price)
//     totalAmount: transaction[6] // 6th column (Total Amount)
//   }));

//   return (
//     <Card
//       sx={{
//         width: '100%',
//         maxWidth: 600, // Limit width for larger screens
//         borderRadius: '12px',
//         backgroundColor: '#ffffff',
//         color: '#333333',
//         boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
//         margin: '0 auto 20px auto', // Center card with bottom margin
//       }}
//     >
//       <CardContent>
//         {/* Title */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
//           <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#20C997' }}>
//             Recent Transactions
//           </Typography>
//         </Box>

//         {/* Header Row */}
//         <List sx={{ padding: 0 }}>
//           <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//               <ListItemText
//                 primary={<Typography variant="subtitle2" sx={{ color: '#555555' }}>Ticker</Typography>}
//                 sx={{ width: '25%', textAlign: 'center' }}
//               />
//               <ListItemText
//                 primary={<Typography variant="subtitle2" sx={{ color: '#555555' }}>Transaction</Typography>}
//                 sx={{ width: '25%', textAlign: 'center' }}
//               />
//               <ListItemText
//                 primary={<Typography variant="subtitle2" sx={{ color: '#555555' }}>Price</Typography>}
//                 sx={{ width: '25%', textAlign: 'center' }}
//               />
//               <ListItemText
//                 primary={<Typography variant="subtitle2" sx={{ color: '#555555' }}>Amount</Typography>}
//                 sx={{ width: '25%', textAlign: 'center' }}
//               />
//             </Box>
//           </ListItem>
//           <Divider sx={{ backgroundColor: '#CCCCCC' }} />
//         </List>

//         {/* List of transactions */}
//         <List sx={{ padding: 0 }}>
//           {transactions.map((transaction, index) => (
//             <React.Fragment key={index}>
//               <ListItem sx={{
//                 paddingLeft: 0,
//                 paddingRight: 0,
//                 backgroundColor: index % 2 === 0 ? '#F7F9FA' : 'transparent', // Alternate row colors
//               }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//                   <ListItemText
//                     primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>{transaction.name}</Typography>}
//                     sx={{ width: '25%', textAlign: 'center', color: '#333333' }}
//                   />
//                   <ListItemText
//                     primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>{transaction.type}</Typography>}
//                     sx={{ width: '25%', textAlign: 'center', color: transaction.type === 'Buy' ? '#20C997' : '#FF3B30' }}
//                   />
//                   <ListItemText
//                     primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>${transaction.price}</Typography>}
//                     sx={{ width: '25%', textAlign: 'center', color: '#333333' }}
//                   />
//                   <ListItemText
//                     primary={<Typography variant="body2" sx={{ fontWeight: 'bold' }}>{transaction.totalAmount}</Typography>}
//                     sx={{ width: '25%', textAlign: 'center', color: '#333333' }}
//                   />
//                 </Box>
//               </ListItem>
//               <Divider sx={{ backgroundColor: '#E0E0E0' }} />
//             </React.Fragment>
//           ))}
//         </List>
//       </CardContent>
//     </Card>
//   );
// }

import * as React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

export default function RecentTransactions({ recentTransactions }) {
  const transactions = recentTransactions.map(transaction => ({
    name: transaction[2],      // Stock symbol
    type: transaction[3],      // Transaction type
    price: transaction[5],     // Price
    totalAmount: transaction[6] // Total Amount
  }));

  return (
    <Card
      sx={{
        width: 600,
        borderRadius: '16px',
        backgroundColor: '#1b263b',
        color: 'white',
        padding: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        marginBottom: 3,
      }}
    >
      <CardContent>
        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#6bcab5' }}>
            Recent Transactions
          </Typography>
        </Box>

        <List>
          <ListItem sx={{ paddingLeft: 0, paddingRight: 0, fontWeight: 700, color: '#6bcab5'}}>
            <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Ticker</span>} sx={{ width: '20%', textAlign: 'center' }} />
            <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Transaction</span>} sx={{ width: '20%', textAlign: 'center' }} />
            <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Price</span>} sx={{ width: '20%', textAlign: 'center' }} />
            <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Amount</span>} sx={{ width: '20%', textAlign: 'center' }} />
          </ListItem>
          <Divider sx={{ backgroundColor: 'lightgreen' }} />

          {transactions.map((transaction, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ paddingLeft: 0, paddingRight: 0, color: '#6bcab5',fontWeight: 'bold' }}>
                <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{transaction.name}</span>} sx={{ width: '20%', textAlign: 'center' }} />
                <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{transaction.type}</span>} sx={{ width: '20%', textAlign: 'center' }} />
                <ListItemText primary={<span style={{ fontWeight: 'bold' }}>${transaction.price}</span>} sx={{ width: '20%', textAlign: 'center'}} />
                <ListItemText primary={<span style={{ fontWeight: 'bold' }}>${transaction.totalAmount}</span>} sx={{ width: '20%', textAlign: 'center'}} />
              </ListItem>
              {index < transactions.length - 1 && <Divider sx={{ backgroundColor: 'lightgreen' }} />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
