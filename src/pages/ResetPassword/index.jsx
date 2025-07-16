import React, { useState } from 'react';
import { Box, Link } from '@mui/material';
import { Navigate, Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthLayout from "@components/AuthLayout.jsx";
import FormField from "@components/FormField.jsx";
import SubmitButton from "@components/SubmitButton.jsx";
import { forgotPasswordReset } from '@root/redux/actions/authActions';
import { useDispatch } from 'react-redux';

const ResetPassword = () => {
    const dispatch =useDispatch()
const navigate =useNavigate()
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
const result = await dispatch(forgotPasswordReset({ token, newPassword: password }));
if (result) {
  navigate("/login"); 
} else {
  toast.error("Password reset failed");
}

    try {
     
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password"
      useCenteredTitle={true}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <FormField
          label="New Password"
          type="password"
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormField
          label="Confirm Password"
          type="password"
          required={true}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <SubmitButton text="Reset Password" marginBottom={2} />

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

export default ResetPassword;
