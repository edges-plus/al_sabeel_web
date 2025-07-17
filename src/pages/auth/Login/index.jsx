import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { login } from "@actions/authActions";

// Import our reusable components
import AuthLayout from "@components/AuthLayout.jsx";
import FormField from "@components/FormField.jsx";
import SubmitButton from "@components/SubmitButton.jsx";
import Loader from "@components/loader/Loader.jsx";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { loaderStatus } = useSelector((state) => state.loaderReducer);
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log("it is ok to navigate");
      
      navigate("/dashboard/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  if (isLoggedIn) {
    return <div>Redirecting...</div>;
  }

  return (
    <AuthLayout 
      title="Sign In" 
      logoRequired={true} 
      useCenteredTitle={false}
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
          name="email"
          value={loginData.email}
          onChange={handleInputChange}
          required={true}
          disabled={loaderStatus}
        />
        
        <FormField
          label="Password"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          required={true}
          disabled={loaderStatus}
          marginBottom={1}
        />
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mb: { xs: 2, sm: 2.5, md: 3 } 
        }}>
          <Link
            component={RouterLink}
            to="/forgotPassword"
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
            Forgot password?
          </Link>
        </Box>
        
        <SubmitButton 
          text="Sign In" 
          loading={loaderStatus}
        />
      </Box>
    </AuthLayout>
  );
};

export default Login;