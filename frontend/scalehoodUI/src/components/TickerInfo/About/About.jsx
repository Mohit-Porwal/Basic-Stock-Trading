// {
//     return (
//         <div>
            
//         </div>
//     )
// }

import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

export default function About(){
  const [isExpanded, setIsExpanded] = useState(false);

  const aboutText = `Our company has been a leader in the industry for over 20 years, specializing in high-quality solutions for a diverse range of clients.
  We pride ourselves on innovation, integrity, and customer satisfaction. From our humble beginnings, we've expanded our reach globally, always focusing on
  delivering cutting-edge technology and exceptional service. Our team of experts is dedicated to pushing the boundaries of what’s possible, ensuring that we
  remain at the forefront of industry trends. As we continue to grow, we remain committed to our core values and the continuous improvement of our services.`;

  // Function to toggle the "Read More" and "Read Less" state
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '16px' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
          {isExpanded ? aboutText : `${aboutText.substring(0, 200)}...`}
        </Typography>
        <Button size="small" onClick={toggleReadMore} sx={{ marginTop: '10px' }}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Button>
      </CardContent>
    </Card>
  );
};



