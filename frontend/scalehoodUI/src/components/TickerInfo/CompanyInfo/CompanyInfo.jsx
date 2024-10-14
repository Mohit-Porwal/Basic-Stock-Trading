import React from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material'

const CompanyInfo = () => {
  return (
    <Box sx={{ padding: '40px', backgroundColor: '#f0f0f0', width:'500px', margin: 'auto', borderRadius: '10px' }}>
      <Grid container spacing={3}>
        {/* First Column */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" fontWeight="bold">CEO</Typography>
          <Typography variant="body1">Timothy Donald Cook</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" fontWeight="bold">Market Cap</Typography>
          <Typography variant="body1">1.95T</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" fontWeight="bold">Employees</Typography>
          <Typography variant="body1">137,000</Typography>
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" fontWeight="bold">Headquarters</Typography>
          <Typography variant="body1">Cupertino, California</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" fontWeight="bold">Price-Earnings Ratio</Typography>
          <Typography variant="body1">36.77</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" fontWeight="bold">Dividend Yield</Typography>
          <Typography variant="body1">0.53</Typography>
        </Grid>

        {/* Third Column */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" fontWeight="bold">Founded</Typography>
          <Typography variant="body1">1976</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" fontWeight="bold">Average Volume</Typography>
          <Typography variant="body1">257.02M</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyInfo;
