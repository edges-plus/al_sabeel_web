import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 3,
        bgcolor: '#f5f5f5',
      }}
    >
      {/* Company Logo */}
      <Box component="img" src="/icons/AlSabeel_logo2.png" alt="Company Logo" sx={{ width: 220, mb: 2 }} />

      {/* Error Icon */}


      <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
        404
      </Typography>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Oops! Page Not Found
      </Typography>


      <Button variant="contained" onClick={() => navigate('/')}>
        Go to Home
      </Button>
      <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mt: { xs: 3, sm: 4 }
            }}
          >
            <Typography sx={{ 
              color: '#333', 
              fontSize: {
                xs: '0.75rem',
                sm: '0.8rem'
              }
            }}>
              Powered by
            </Typography>
            <Box
              component="img"
              src="/icons/edges_logo2.png"
              alt="Edges+ Logo"
              sx={{
                height: {
                  xs: 20,
                  sm: 22
                }
              }}
            />
          </Box>
    </Box>
  );
};

export default Index;

