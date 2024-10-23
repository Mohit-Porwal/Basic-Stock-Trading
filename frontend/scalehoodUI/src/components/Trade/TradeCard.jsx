import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export default function TradeCard() {

  const [method, setMethod] = React.useState('Dollars'); // Default to Dollars
  const [amount, setAmount] = React.useState(''); // To store the amount or shares value

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <Card sx={{ width: 275, backgroundColor: '#EAF6FF' }}>
      <CardContent>
        {/* Title */}
        <Typography gutterBottom sx={{ color: 'black', fontSize: 20 }}>
          Buy ticker name
        </Typography>

        {/* Code for Basic Select materialUI */}
        <Box sx={{ width: '100%', marginTop: '20px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Invest in</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={method}
              label="Invest in"
              onChange={handleMethodChange}
            >
              <MenuItem value="Dollars">Dollars</MenuItem>
              <MenuItem value="Shares">Shares</MenuItem>
            </Select>
          </FormControl>
          
          {/* FormControl for Amount/Shares Input */}
          <FormControl fullWidth sx={{ marginTop: '16px' }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              {method === 'Dollars' ? 'Amount in Dollars' : 'Shares'}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={amount}
              onChange={handleAmountChange}
              startAdornment={
                <InputAdornment position="start">
                  {method === 'Dollars' ? '$' : ''}
                </InputAdornment>
              }
              label={method === 'Dollars' ? 'Amount in Dollars' : 'Shares'}
              type="number" // Ensure the user can only input numbers
            />
          </FormControl>
        </Box>
      </CardContent>
      <CardActions>
        <Button sx = {{textTransform: 'none', backgroundColor: 'lightgreen', color: 'black', borderRadius: '15px', '&:hover': {backgroundColor: '#45A049'}, margin: 'auto', fontWeight: 'bold'}}>Buy</Button>
      </CardActions>
    </Card>
  );
}
