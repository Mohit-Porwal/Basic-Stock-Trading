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

  const [method, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Card sx={{ width: 275, backgroundColor: '#EAF6FF' }}>
      <CardContent>
        {/* Title */}
        <Typography gutterBottom sx={{ color: 'black', fontSize: 20 }}>
          Buy ticker name
        </Typography>

        {/* Code for Basic Select materialUI */}
        <Box sx={{ width: '50%', marginTop: '20px'}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Invest in</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={method}
              label="Invest in"
              onChange={handleChange}
            >
              <MenuItem value="Dollars">Dollars</MenuItem>
              <MenuItem value="Shares">Shares</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
            />
          </FormControl>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
  
