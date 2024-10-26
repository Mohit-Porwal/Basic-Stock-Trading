import React from 'react';
import { Box, Typography, ListItemText } from '@mui/material';

const CompanyInfo = ({ marketcap, fullTimeEmployees, ceo, headquarters, dividendYield, averageVolume, earningsGrowth, grossMargins }) => {
  return (
    <Box sx={{ padding: '40px', backgroundColor: '#f0f0f0', width: '45%', margin: 'auto', borderRadius: '10px', marginBottom: '30px' }}>
      {/* First Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <ListItemText
          primary={<Typography variant="h6" fontWeight="bold">CEO</Typography>}
          secondary={<Typography variant="body1">{ceo}</Typography>}
          sx={{ width: '20%', textAlign: 'center', color: 'black' }}
        />
        <ListItemText
          primary={<Typography variant="h6" fontWeight="bold">Market Cap</Typography>}
          secondary={<Typography variant="body1">{marketcap}</Typography>}
          sx={{ width: '20%', textAlign: 'center', color: 'black' }}
        />
        <ListItemText
          primary={<Typography variant="h6" fontWeight="bold">Employees</Typography>}
          secondary={<Typography variant="body1">{fullTimeEmployees}</Typography>}
          sx={{ width: '20%', textAlign: 'center', color: 'black' }}
        />
        <ListItemText
          primary={<Typography variant="h6" fontWeight="bold">Headquarters</Typography>}
          secondary={<Typography variant="body1">{headquarters}</Typography>}
          sx={{ width: '20%', textAlign: 'center', color: 'black' }}
        />
      </Box>

      {/* Second Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <ListItemText
          primary={<Typography variant="h6" fontWeight="bold">Dividend Yield</Typography>}
          secondary={<Typography variant="body1">{dividendYield}</Typography>}
          sx={{ width: '20%', textAlign: 'center', color: 'black' }}
        />
        <ListItemText
          primary={<Typography variant="h6" fontWeight="bold">Average Volume</Typography>}
          secondary={<Typography variant="body1">{averageVolume}</Typography>}
          sx={{ width: '20%', textAlign: 'center', color: 'black' }}
        />
        <ListItemText
          primary={<Typography variant="h6" fontWeight="bold">Earnings Growth</Typography>}
          secondary={<Typography variant="body1">{earningsGrowth}</Typography>}
          sx={{ width: '20%', textAlign: 'center', color: 'black' }}
        />
        <ListItemText
          primary={<Typography variant="h6" fontWeight="bold">Gross Margins</Typography>}
          secondary={<Typography variant="body1">{grossMargins}</Typography>}
          sx={{ width: '20%', textAlign: 'center', color: 'black' }}
        />
      </Box>
    </Box>
  );
};

export default CompanyInfo;
