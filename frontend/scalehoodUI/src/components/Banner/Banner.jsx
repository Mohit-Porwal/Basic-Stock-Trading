


// import React from 'react';
// import { Card, CardContent, Typography, List, ListItem, ListItemText, Box, Divider } from '@mui/material';

// export default function Banner({ sectorWiseTopCompanies, latestStocks }) {

//   const [selectedSector, setSelectedSector] = React.useState(null);

//   React.useEffect(() => {
//     // Select a random sector on every render
//     const sectors = Object.keys(sectorWiseTopCompanies);
//     const randomSector = sectors[Math.floor(Math.random() * sectors.length)];
//     setSelectedSector(randomSector);
//   }, [sectorWiseTopCompanies]);

//   if (!selectedSector) return null; // Ensure the sector is selected before rendering

//   return (
//     <Card
//       sx={{
//         width: 350,
//         borderRadius: '20px',
//         backgroundColor: '#20C997',
//         color: '#333333',
//         padding: '16px',
//         marginBottom: '20px',
//         boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
//       }}
//     >
//       <CardContent>
//         {/* Display the sector name as title */}
//         <Typography variant="h6">
//           Top Companies in {selectedSector.charAt(0).toUpperCase() + selectedSector.slice(1)}
//         </Typography>

//         <List sx={{ padding: 0 }}>
//           {sectorWiseTopCompanies[selectedSector].map((company, index) => (
//             <React.Fragment key={index}>
//               <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
//                 <ListItemText primary={company} sx={{ marginLeft: '16px', color: 'white' }} />
//               </ListItem>
//               {index < sectorWiseTopCompanies[selectedSector].length - 1 && (
//                 <Divider sx={{ backgroundColor: 'white' }} />
//               )}
//             </React.Fragment>
//           ))}
//         </List>
//       </CardContent>
//     </Card>
//   );
// }

//Chat gpt recommended 

import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function Banner({ sectorWiseTopCompanies }) {
  const [selectedSector, setSelectedSector] = React.useState(null);

  React.useEffect(() => {
    const sectors = Object.keys(sectorWiseTopCompanies);
    const randomSector = sectors[Math.floor(Math.random() * sectors.length)];
    setSelectedSector(randomSector);
  }, [sectorWiseTopCompanies]);

  if (!selectedSector) return null;

  return (
    <Card
      sx={{
        width: 350,
        borderRadius: '16px',
        backgroundColor: '#1b263b',
        color: '#6bcab5',
        padding: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        marginBottom: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}>
          Top Companies in {selectedSector}
        </Typography>

        <List sx={{ padding: 0 }}>
          {sectorWiseTopCompanies[selectedSector].map((company, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{company}</span>} sx={{ textAlign: 'center' }} />
              </ListItem>
              {index < sectorWiseTopCompanies[selectedSector].length - 1 && (
                <Divider sx={{ backgroundColor: '#fff' }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}


