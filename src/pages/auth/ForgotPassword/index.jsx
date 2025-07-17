import React, { useState } from 'react';
import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthLayout from "@components/AuthLayout.jsx";
import FormField from "@components/FormField.jsx";
import SubmitButton from "@components/SubmitButton.jsx";
import Loader from "@components/loader/Loader.jsx";
import { forgotPassword} from '@root/redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
    const [email,setEmail] = useState('');
   const dispatch = useDispatch()
    const navigate = useNavigate();
   const { loaderStatus } = useSelector((state) => state.loaderReducer);
  const handleSubmit = async(e) => {
    e.preventDefault();
    const result = await dispatch(forgotPassword({email}));
    if (result) {
      toast.success('Password reset link sent!')
      // Add this at the top of your component
     

      // And add this line where the placeholder is
      navigate('/');
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
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        noValidate
        sx={{ position: 'relative' }}
      >
        {loaderStatus && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.8)",
              zIndex: 10,
              borderRadius: 2,
            }}
          >
            <Loader />
          </Box>
        )}
        
        <FormField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loaderStatus}
        />
        
        <SubmitButton 
          text="Send Reset Link" 
          marginBottom={2} 
          loading={loaderStatus}
        />
        
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
              pointerEvents: loaderStatus ? 'none' : 'auto',
              opacity: loaderStatus ? 0.6 : 1,
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