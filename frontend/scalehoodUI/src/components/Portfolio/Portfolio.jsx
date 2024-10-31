// import React, { useState, useEffect } from 'react';
// import { Box, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

// const Portfolio = () => {
//   const [portfolio, setPortfolio] = useState([]);
//   const [visibleStocks, setVisibleStocks] = useState(5);

//   useEffect(() => {
//     const fetchPortfolio = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5000/portfolio?user_id=1`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log("Portfolio " + data.portfolio);
//         setPortfolio(data.portfolio);
//         console.log("Portfolio after " + portfolio);
//       } catch (error) {
//         console.error('Error fetching portfolio:', error);
//       }
//     };
//     fetchPortfolio();
//   }, []);

//   const handleScroll = (e) => {
//     const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
//     if (bottom && visibleStocks < portfolio.length) {
//       setVisibleStocks((prev) => Math.min(prev + 5, portfolio.length));
//     }
//   };

//   return (
//     <Box sx={{
//       backgroundColor: 'transparent',
//       color: '#6bcab5',
//       minHeight: '100vh',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       padding: '20px',
//       margin: 'auto',
//     }}>
//       {/* Header */}
//       <Typography variant="h5" sx={{ marginBottom: '20px', color: 'red', fontWeight: 'bold' }}>
//         Previously bought stocks
//       </Typography>

//       {/* Scrollable list container with outer scrollbar */}
//       <Box sx={{
//         width: '500px',
//         maxHeight: '400px',
//         overflow: 'hidden',
//         position: 'relative',
//         borderRadius: '20px',
//         backgroundColor: '#1b263b',
//         boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
//         padding: '20px'
//       }}>
//         <Box sx={{
//           maxHeight: '340px',
//           overflowY: 'scroll',
//           paddingRight: '20px',
//           scrollbarWidth: 'none',
//         }} onScroll={handleScroll}>
//           <List sx={{ padding: 0 }}>
//             <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
//               <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Ticker</span>} sx={{ width: '20%', textAlign: 'center' }} />
//               <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Quantity</span>} sx={{ width: '20%', textAlign: 'center' }} />
//               <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Average Price</span>} sx={{ width: '20%', textAlign: 'center' }} />
//             </ListItem>
//             {portfolio.slice(0, visibleStocks).map((stock, index) => (
//               <React.Fragment key={index}>
//                 <ListItem sx={{
//                   paddingLeft: 0,
//                   paddingRight: 0,
//                 }}>
//                   <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{stock.ticker}</span>} sx={{ color: '#6bcab5', width: '20%', textAlign: 'center' }} />
//                   <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{`${stock.quantity}`}</span>} sx={{ color: '#6bcab5', width: '20%', textAlign: 'center' }} />
//                   <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{`$${stock.average_price}`}</span>} sx={{ color: '#6bcab5', width: '20%', textAlign: 'center' }} />
//                 </ListItem>
//                 <Divider sx={{ backgroundColor: 'lightgreen', opacity: 0.2 }} />
//               </React.Fragment>
//             ))}
//           </List>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Portfolio;


import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/portfolio?user_id=1`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Portfolio " + data.portfolio);
        setPortfolio(data.portfolio);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <Box sx={{
      backgroundColor: 'transparent',
      color: '#6bcab5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      margin: 'auto',
    }}>
      {/* Header */}
      <Typography variant="h5" sx={{ marginBottom: '20px', color: 'red', fontWeight: 'bold' }}>
        Previously bought stocks
      </Typography>

      {/* Scrollable list container with outer scrollbar */}
      <Box sx={{
        width: '500px',
        maxHeight: '400px',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '20px',
        backgroundColor: '#1b263b',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
        padding: '20px'
      }}>
        <Box sx={{
          maxHeight: '340px',
          overflowY: 'scroll',
          paddingRight: '20px',
          scrollbarWidth: 'none',
        }}>
          <List sx={{ padding: 0 }}>
            <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
              <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Ticker</span>} sx={{ width: '20%', textAlign: 'center' }} />
              <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Quantity</span>} sx={{ width: '20%', textAlign: 'center' }} />
              <ListItemText primary={<span style={{ fontWeight: 'bold' }}>Average Price</span>} sx={{ width: '20%', textAlign: 'center' }} />
            </ListItem>
            {portfolio.map((stock, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{
                  paddingLeft: 0,
                  paddingRight: 0,
                }}>
                  <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{stock.ticker}</span>} sx={{ color: '#6bcab5', width: '20%', textAlign: 'center' }} />
                  <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{`${stock.quantity}`}</span>} sx={{ color: '#6bcab5', width: '20%', textAlign: 'center' }} />
                  <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{`$${stock.average_price}`}</span>} sx={{ color: '#6bcab5', width: '20%', textAlign: 'center' }} />
                </ListItem>
                <Divider sx={{ backgroundColor: 'lightgreen', opacity: 0.2 }} />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Portfolio;

