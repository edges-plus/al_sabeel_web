import React from 'react';
import { TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

const FormField = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder,
  required = false,
  marginBottom = { xs: 2, sm: 2.5, md: 3 }
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {!isMobile && label && (
        <Typography sx={{ mb: 1, fontWeight: 500, color: '#333' }}>{label}</Typography>
      )}
      <TextField
        fullWidth
        type={type}
        variant="outlined"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={isMobile ? label : placeholder}
        InputProps={{
          sx: {
            borderRadius: '12px',
            height: {
              xs: '44px',
              sm: '46px',
              md: '48px'
            },
          }
        }}
        sx={{
          mb: marginBottom,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#e0e0e0',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: 'brand.main',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'brand.dark',
            },
          }
        }}
      />
    </>
  );
};

export default FormField;


