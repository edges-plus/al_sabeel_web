/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer(props) {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        padding: '6px 50px',
        backgroundColor: 'background.default',
        borderTop: '1px solid #e0e0e0', // optional: similar to Ant's subtle divider
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Designed and Developed by Edges+ 2025
      </Typography>
    </Box>
  );
}

export default Footer;

