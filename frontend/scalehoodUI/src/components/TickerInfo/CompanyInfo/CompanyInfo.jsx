import React from 'react';
import { Box, Typography, ListItemText } from '@mui/material';

const CompanyInfo = ({ marketcap, fullTimeEmployees, ceo, headquarters, dividendYield, averageVolume, earningsGrowth, grossMargins }) => {

  const renderListItem = (label, value) => (
    <ListItemText
      primary={<Typography variant="h6" fontWeight="bold">{label}</Typography>}
      secondary={<Typography variant="body1">{value}</Typography>}
      sx={{ width: '20%', textAlign: 'center', color: '#6bcab5' }}
    />
  )
  return (
    <Box sx={{ padding: '20px', backgroundColor: '#1b263b', width: '70%', margin: 'auto', borderRadius: '10px', marginBottom: '30px' }}>
      {/* First Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', color: '#6bcab5' }}>
        {renderListItem('CEO', ceo)}
        {renderListItem('Market Cap', marketcap)}
        {renderListItem('Employees', fullTimeEmployees)}
        {renderListItem('Headquarters', headquarters)}
      </Box>

      {/* Second Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        {renderListItem('Dividend Yield', dividendYield)}
        {renderListItem('Average Volume', averageVolume)}
        {renderListItem('Earnings Growth', earningsGrowth)}
        {renderListItem('Gross Margins', grossMargins)}
      </Box>
    </Box>
  );
};

export default CompanyInfo;
