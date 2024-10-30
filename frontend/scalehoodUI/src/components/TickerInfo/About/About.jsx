import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

export default function About({summary}){
  const [isExpanded, setIsExpanded] = useState(false);

  const aboutText = summary;

  // Function to toggle the "Read More" and "Read Less" state
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card sx={{ width: '70%', margin: 'auto', padding: '20px', marginBottom: '20px', borderRadius: '10px', backgroundColor: '#F8F9FA', color: '#6bcab5'}}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom fontWeight={'bold'}>
          About Us
        </Typography>
        <Typography variant="body2" color="#6bcab5" sx={{ whiteSpace: 'pre-line', marginTop: '20px' }} fontWeight={'bold'}>
          {isExpanded ? aboutText : `${aboutText.substring(0, 200)}...`}
        </Typography>
        <Button size="small" onClick={toggleReadMore} sx={{ marginTop: '10px' }}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </Button>
      </CardContent>
    </Card>
  );
};



