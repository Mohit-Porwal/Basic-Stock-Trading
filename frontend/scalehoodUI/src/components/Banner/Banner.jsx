import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function Banner({ sectorWiseTopCompanies }) {
  const [selectedSector, setSelectedSector] = React.useState(null);

  React.useEffect(() => {
    const sectors = Object.keys(sectorWiseTopCompanies);
    const randomSector = sectors[Math.floor(Math.random() * sectors.length)];
    setSelectedSector(randomSector);
  }, [sectorWiseTopCompanies]);

  if (!selectedSector) return null;

  return (
    <Card
      sx={{
        width: 350,
        borderRadius: '16px',
        backgroundColor: '#1b263b',
        color: '#6bcab5',
        padding: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        marginBottom: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}>
          Top Companies in {selectedSector}
        </Typography>

        <List sx={{ padding: 0 }}>
          {sectorWiseTopCompanies[selectedSector].map((company, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <ListItemText primary={<span style={{ fontWeight: 'bold' }}>{company}</span>} sx={{ textAlign: 'center' }} />
              </ListItem>
              {index < sectorWiseTopCompanies[selectedSector].length - 1 && (
                <Divider sx={{ backgroundColor: '#fff' }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}


