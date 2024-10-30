// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// export default function BalanceCard({totalBalance}) {

//   //const userCurrentBalance = total_balance.total_balance;

//   const userCurrentBalance = totalBalance;

//   return (
//     <Card
//       sx={{
//         width: 180,         // Diameter of the circle
//         height: 180,        // Equal to width for circular shape
//         backgroundColor: '#EAF6FF',
//         borderRadius: '50%', // Circular shape
//         display: 'flex',     // To center the content
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)', // Optional shadow for depth
//         border: '15px solid #007BFF',
//       }}
//     >
//       <CardContent sx={{ textAlign: 'center' }}>
//         {/* Title */}
//         <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
//           Your Balance
//         </Typography>
//         {/* Amount */}
//         <Typography variant="h5" component="div">
//           {userCurrentBalance}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small" sx={{ marginTop: '10px' }}>Learn More</Button>
//       </CardActions>
//     </Card>
//   );
// }


// Chat gpt recommended


// import * as React from 'react';
// import { Card, CardContent, Typography, Box } from '@mui/material';

// export default function BalanceCard({ totalBalance }) {
//   return (
//     <Card
//       sx={{
//         width: 180,
//         height: 180,
//         backgroundColor: '#EAF6FF',
//         borderRadius: '50%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         boxShadow: '0 8px 16px rgba(31, 38, 135, 0.2)',
//         border: '10px solid #007BFF',
//         color: '#007BFF',
//         textAlign: 'center',
//       }}
//     >
//       <CardContent>
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           Your Balance
//         </Typography>
//         <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
//           ${totalBalance}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }

//Chat gpt second recommendation

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BalanceCard({ totalBalance }) {

  return (
    <Card
      sx={{
        width: 180,
        height: 180,
        // backgroundColor: '#EAF6FF',
        backgroundColor: '#F8F9FA',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 16px rgba(31, 38, 135, 0.3)',
        // border: '10px solid #007BFF',
        border: '10px solid #F8F9FA'
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography gutterBottom sx={{ color: '#6bcab5', fontSize: 14 }}>
          Your Balance
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#6bcab5' }}>
          ${totalBalance}
        </Typography>
      </CardContent>
    </Card>
  );
}
