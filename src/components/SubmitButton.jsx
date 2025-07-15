import React from 'react';
import { Button } from '@mui/material';

const SubmitButton = ({ 
  text, 
  marginBottom = 0,
  marginTop = 0 
}) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
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
        mb: marginBottom,
        mt: marginTop
      }}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;


