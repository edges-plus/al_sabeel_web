import React, { useState } from 'react';
import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthLayout from "@components/AuthLayout.jsx";
import FormField from "@components/FormField.jsx";
import SubmitButton from "@components/SubmitButton.jsx";
import { forgotPassword} from '@root/redux/actions/authActions';
import { useDispatch } from 'react-redux';
const ForgotPassword = () => {
    const [email,setEmail] = useState('');
   const dispatch =useDispatch()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const result = await dispatch(forgotPassword({email}));
    if (result) {
      toast.success('Password reset link sent!')
    } else {
      toast.error("Password reset failed");
    }
   ;
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive a reset link"
      useCenteredTitle={true}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <SubmitButton text="Send Reset Link" marginBottom={2} />
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          mt: 1
        }}>
          <Link
            component={RouterLink}
            to="/"
            underline="hover"
            sx={{ 
              color: '#333', 
              fontSize: {
                xs: '13px',
                sm: '14px'
              },
              fontWeight: 400,
            }}
          >
            Back to login
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default ForgotPassword;