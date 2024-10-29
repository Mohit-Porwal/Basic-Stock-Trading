// import './NavBar.css'
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import React from 'react'
// export default function NavBar(){

//     const[ticker, setTicker] = useState('');
//     const navigate = useNavigate();

//     const onSubmit = (event) => {
//         if(event.key === 'Enter' && ticker.trim()!== ''){
//             navigate(`/tickerInfo/${ticker}`);
//         }
//     }

//     return(
//         <div className="header">
//             <div className="logo-container">
//             <img
//                 className="hoodlogo"
//                 src="C:\Users\porwa\OneDrive\Desktop\SellScaleHood\frontend\scalehoodUI\logos\hood.png"
//                 alt='scale hood logo'
//             />
//             <span className="app-name">ScaleHood</span>
//             </div>

//             <div className="search-container">
//             <input
//                 type="text"
//                 placeholder='Search Tickers'
//                 className= "search-bar"
//                 value={ticker}
//                 onChange={(e) => setTicker(e.target.value)}
//                 onKeyUp={onSubmit}  // Trigger search on Enter
//             />
//             </div>

//             <div className="userGreetings">
//             <span>Hi Mohit!</span>
//             </div>
//         </div>
//     )

// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, InputBase, Typography, IconButton, Box, Avatar } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import logo from './hood.png'; // Update the path to your logo image

const NavBar = () => {
  const [ticker, setTicker] = useState('');
  const navigate = useNavigate();

  const onSubmit = (event) => {
    if (event.key === 'Enter' && ticker.trim() !== '') {
      navigate(`/tickerInfo/${ticker}`);
    }
  };

  return (
    <AppBar position="static" sx={{ background: '#3C3C3E', padding: '10px 0' }}>
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
          <Typography variant="h6" sx={{ color: '#FF3B30', fontWeight: 700 }}>Hi Mohit!</Typography>
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
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

export default NavBar;
