// import * as React from 'react';
// import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

// export default function Banner({sectorWiseTopCompanies, latestStocks}) {

//   const transactions = [
//     { id: 1, name: 'Figma', amount: '-$15.00' },
//     { id: 2, name: 'Grammarly', amount: '-$10.00' },
//     { id: 3, name: 'Blender', amount: '-$15.00' },
//   ];

//   const [currentIndex, setCurrentIndex] = React.useState(0);

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % transactions.length);
//     }, 3000); // Update every 3 seconds

//     return () => clearInterval(interval); // Clean up on component unmount
//   }, [transactions.length]);

//   return (
//     <Card
//       sx={{
//         width: 350,
//         borderRadius: '20px',
//         backgroundColor: '#20C997',
//         color: '333333',
//         padding: '16px',
//         marginBottom: '20px',
//         boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
//       }}
//     >
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', marginBottom: '16px' }}>
//           <Typography variant="h6">Stocks</Typography>
//         </Box>

//         <List sx={{ padding: 0, transition: 'transform 0.5s ease-in-out'}}>
//           <React.Fragment key={transactions[currentIndex].id}>
//             <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//                 <ListItemText primary={transactions[currentIndex].name} sx={{ marginLeft: '16px', color: 'white' }} />
//               </Box>
//               <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
//                 {transactions[currentIndex].amount}
//               </Typography>
//             </ListItem>
//             <Divider sx={{ backgroundColor: 'white' }} />
//           </React.Fragment>
//         </List>
//       </CardContent>
//     </Card>
//   );
// }


import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box, Divider } from '@mui/material';

export default function Banner({ sectorWiseTopCompanies, latestStocks }) {

  const [selectedSector, setSelectedSector] = React.useState(null);

  React.useEffect(() => {
    // Select a random sector on every render
    const sectors = Object.keys(sectorWiseTopCompanies);
    const randomSector = sectors[Math.floor(Math.random() * sectors.length)];
    setSelectedSector(randomSector);
  }, [sectorWiseTopCompanies]);

  if (!selectedSector) return null; // Ensure the sector is selected before rendering

  return (
    <Card
      sx={{
        width: 350,
        borderRadius: '20px',
        backgroundColor: '#20C997',
        color: '#333333',
        padding: '16px',
        marginBottom: '20px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
      }}
    >
      <CardContent>
        {/* Display the sector name as title */}
        <Typography variant="h6">
          Top Companies in {selectedSector.charAt(0).toUpperCase() + selectedSector.slice(1)}
        </Typography>

        <List sx={{ padding: 0 }}>
          {sectorWiseTopCompanies[selectedSector].map((company, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <ListItemText primary={company} sx={{ marginLeft: '16px', color: 'white' }} />
              </ListItem>
              {index < sectorWiseTopCompanies[selectedSector].length - 1 && (
                <Divider sx={{ backgroundColor: 'white' }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}



{/* <Card
sx={{
  width: 350,
  borderRadius: '20px',
  backgroundColor: '#20C997',
  color: '333333',
  padding: '16px',
  marginBottom: '20px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
}}
>
<CardContent>
  
  <LatestStocks latestStocks/>
  <TopCompanies sectorWiseTopCompanies/>

  <List sx={{ padding: 0, transition: 'transform 0.5s ease-in-out'}}>
    <React.Fragment key={transactions[currentIndex].id}>
      <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <ListItemText primary={transactions[currentIndex].name} sx={{ marginLeft: '16px', color: 'white' }} />
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
          {transactions[currentIndex].amount}
        </Typography>
      </ListItem>
      <Divider sx={{ backgroundColor: 'white' }} />
    </React.Fragment>
  </List>
</CardContent> */}