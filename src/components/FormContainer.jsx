import React from 'react';
import { Grid } from '@mui/material';

const FormContainer = ({ children, spacing = 2, sx = {} }) => {
  return (
    <Grid container spacing={spacing} sx={{ mb: 2, ...sx }}>
      {children}
    </Grid>
  );
};

export default FormContainer;


