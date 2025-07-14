import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = () => {
  return (
    <Box
      className="loader"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px', // adjust based on your layout
        width: '100%',
      }}
    >
      <CircularProgress size={40} />
    </Box>
  );
};

export default Loader;

