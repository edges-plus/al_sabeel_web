import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const SubmitButton = ({ 
  text, 
  marginBottom = 0,
  marginTop = 0,
  loading = false 
}) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      disabled={loading}
      sx={{
        py: {
          xs: 1.25,
          sm: 1.5,
          md: 1.75
        },
        borderRadius: {
          xs: '10px',
          sm: '12px',
          md: '14px'
        },
        textTransform: 'none',
        fontSize: {
          xs: '15px',
          sm: '16px',
          md: '18px'
        },
        fontWeight: 500,
        bgcolor: 'brand.main',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        '&:hover': {
          bgcolor: 'brand.dark',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        },
        '&:disabled': {
          bgcolor: 'grey.400',
          color: 'white',
          boxShadow: 'none',
        },
        mb: marginBottom,
        mt: marginTop
      }}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: 'white' }} />
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;


