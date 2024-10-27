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
import { useState } from 'react';

export default function TradeCard({ tickerName, tickerPrice }) {

  //const [method, setMethod] = useState('Dollars'); // Default to Dollars
  const [amount, setAmount] = useState(''); // To store the amount or shares value

  const [dollars, setDollars] = useState(true);
  const [shares, setShares] = useState(false);
  const [purchaseType, setpurchaseType] = useState('Dollars');

  const handleMethodChange = (event) => {

    if(event.target.value==='Dollars'){
      setDollars(true);
      setShares(false);
      setpurchaseType('Dollars');
    }
    else{
      setShares(true);
      setDollars(false);
      setpurchaseType('Shares');
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const getEstimate = () => {
    if(dollars){
      const estimatedQty = amount/tickerPrice;
      return `Estimated Qty: ${estimatedQty} shares`;
    }else{
      const estimatedAmount = amount*tickerPrice;
      return `Estimated Cost: $${estimatedAmount}`;
    }
  }
  return (
    <Card sx={{ width: 275, backgroundColor: '#EAF6FF' }}>
      <CardContent>
        {/* Title */}
        <Typography gutterBottom sx={{ color: 'black', fontSize: 20 }}>
          Buy {tickerName}
        </Typography>

        {/* Code for Basic Select materialUI */}
        <Box sx={{ width: '100%', marginTop: '20px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Invest in</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={purchaseType}
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
              {purchaseType === 'Dollars' ? 'Amount in Dollars' : 'Number of Shares'}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={amount}
              onChange={handleAmountChange}
              endAdornment={
                <InputAdornment position="start">
                  {purchaseType}
                </InputAdornment>
              }
              label={purchaseType === 'Dollars' ? 'Amount in Dollars' : 'Number of Shares'}
              type="number" // Ensure the user can only input numbers
            />
          </FormControl>
        </Box>
      </CardContent>

      {amount && (
        <Box sx={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: 'gray' }}>
          {getEstimate()}
        </Box>
      )}
      
      <CardActions>
        <Button sx = {{textTransform: 'none', backgroundColor: 'lightgreen', color: 'black', borderRadius: '15px', '&:hover': {backgroundColor: '#45A049'}, margin: 'auto', fontWeight: 'bold'}}>Buy</Button>
      </CardActions>
    </Card>
  );
}
