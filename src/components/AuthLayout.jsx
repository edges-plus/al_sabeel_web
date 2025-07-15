import React from 'react';
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

const AuthLayout = ({ 
  title, 
  subtitle, 
  children, 
  logoRequired = false,
  useCenteredTitle = true
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
  // Determine layout direction based on screen size
  const useVerticalLayout = isMobile || isTablet;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: useVerticalLayout ? 'column' : 'row',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: useVerticalLayout ? 'space-evenly' : logoRequired ? 'space-evenly' : 'center',
        bgcolor: '#f5f5f7',
        padding: {
          xs: 2, // Mobile
          sm: 3, // Tablet
          md: 4, // Desktop
          lg: 5  // Large screens
        },
      }}
    >
      {/* Logo section - only render if logoRequired is true */}
      {logoRequired && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: useVerticalLayout ? 'center' : 'center',
            height: useVerticalLayout ? 'auto' : '100%',
            position: 'relative',
            mb: useVerticalLayout ? 4 : 0,
            mt: useVerticalLayout ? { xs: 2, sm: 4 } : 0,
            width: useVerticalLayout ? '100%' : { md: '40%', lg: '35%' },
            maxWidth: useVerticalLayout ? '300px' : '450px',
          }}
        >
          <Box
            component="img"
            src="/icons/AlSabeel_logo.png"
            alt="Al Sabeel Logo"
            sx={{
              width: '100%',
              maxWidth: {
                xs: '180px',  // Mobile
                sm: '220px',  // Tablet
                md: '300px',  // Desktop
                lg: '300px'   // Large screens
              },
              height: 'auto',
              marginBottom: useVerticalLayout ? 0 : 6
            }}
          />
          
          {!useVerticalLayout && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                marginTop: 'auto'
              }}
            >
              <Typography sx={{ color: '#333', fontSize: '1rem' }}>
                Powered by
              </Typography>
              <Box
                component="img"
                src="/icons/edges_logo2.png"
                alt="Edges+ Logo"
                sx={{
                  height: 24
                }}
              />
            </Box>
          )}
        </Box>
      )}

      {/* Auth form card */}
      <Box
        sx={{
          bgcolor: '#FBFAFA',
          padding: {
            xs: '20px', // Mobile
            sm: '30px', // Tablet
            md: '40px', // Desktop
            lg: '42px'  // Large screens
          },
          borderRadius: {
            xs: '12px',
            sm: '14px',
            md: '16px'
          },
          boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
          maxWidth: {
            xs: '90%',     // Mobile
            sm: '450px',   // Tablet
            md: '400px',   // Desktop
            lg: '420px'    // Large screens
          },
          width: '100%'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 600, 
            mb: subtitle ? 1 : { xs: 2, sm: 2.5, md: 3 }, 
            fontSize: {
              xs: '22px',
              sm: '24px',
              md: '28px',
              lg: '32px'
            },
            color: '#1A1A1A',
            textAlign: useCenteredTitle ? 'center' : useVerticalLayout ? 'center' : 'left'
          }}
        >
          {title}
        </Typography>
        
        {subtitle && (
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              mb: { xs: 2, sm: 2.5, md: 3 },
              textAlign: 'center',
              fontSize: {
                xs: '14px',
                sm: '15px',
                md: '16px'
              }
            }}
          >
            {subtitle}
          </Typography>
        )}
        
        {children}
        
        {/* Show "Powered by" at bottom for mobile and tablet portrait when logo is required */}
        {logoRequired && useVerticalLayout && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mt: { xs: 3, sm: 4 }
            }}
          >
            <Typography sx={{ 
              color: '#333', 
              fontSize: {
                xs: '0.75rem',
                sm: '0.8rem'
              }
            }}>
              Powered by
            </Typography>
            <Box
              component="img"
              src="/icons/edges_logo2.png"
              alt="Edges+ Logo"
              sx={{
                height: {
                  xs: 16,
                  sm: 18
                }
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AuthLayout;
