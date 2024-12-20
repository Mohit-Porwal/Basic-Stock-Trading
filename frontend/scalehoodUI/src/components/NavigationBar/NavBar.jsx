import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, InputBase, Typography, IconButton, Box, Avatar } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import logo from './hood.png';

const NavBar = () => {
  const [ticker, setTicker] = useState('');
  const navigate = useNavigate();

  const onSubmit = (event) => {
    if (event.key === 'Enter' && ticker.trim() !== '') {
      navigate(`/tickerInfo/${ticker}`);
    }
  };

  return (
    <AppBar position="static" sx={{ background: 'black', padding: '10px 0' }}>
      <Toolbar sx={{ maxWidth: '1000px', width: '100%', mx: 'auto' }}>
        
        {/* Logo and App Name */}
        <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
          <Avatar src={logo} alt="ScaleHood logo" sx={{ height: 40, width: 40, mr: 1 }} />
          <Typography variant="h5" sx={{ color: '#FF3B30', fontWeight: 'bold' }}>ScaleHood</Typography>
        </Box>
        
        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Tickers"
            inputProps={{ 'aria-label': 'search' }}
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            onKeyUp={onSubmit} // Trigger search on Enter
          />
        </Search>
        
        {/* User Greeting */}
        <Box sx={{ ml: 'auto' }}>
          <Typography variant="h6" sx={{ color: 'red', fontWeight: 700 }}>Hi Mohit!</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Styled Components for Search
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000', // Sets the input text color to black
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#FF3B30',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
    // Red placeholder color
    '&::placeholder': {
      color: 'red', 
      opacity: 1,
    },
  },
}));

export default NavBar;
