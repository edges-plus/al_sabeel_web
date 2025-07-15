import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Payment,
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import the tab components
import Account from '@pages/Account';

function SettingsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { permissions } = useSelector((state) => state.auth);
  const hasPermission = (perm) => permissions?.includes(perm);

  const allTabRoutes = [
    {
      label: 'Accounts',
      icon: <Payment />,
      path: 'account',
      component: <Account />,
      permission: 'app.accounts',
    },
  ];

  // Filter tabs based on permission
  const tabRoutes = allTabRoutes.filter(tab => hasPermission(tab.permission));

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") || "users";
  const defaultIndex = tabRoutes.findIndex(t => t.path === tabParam);
  const [tabValue, setTabValue] = useState(defaultIndex === -1 ? 0 : defaultIndex);

  const handleTabChange = (event, newValue) => {
  setTabValue(newValue);
    setSearchParams({ tab: tabRoutes[newValue].path });
  };

  if (tabRoutes.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">You do not have permission to access any settings.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 2 }, maxWidth: 1200, mx: 'auto', bgcolor: 'white' }}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 1, sm: 1, md: 1 },
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
        }}
      >
        Settings
      </Typography>

      <Paper
        sx={{
          mb: 2,
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
          bgcolor: 'white',
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="settings tabs"
          variant={isMobile ? "fullWidth" : "standard"}
          centered={!isMobile}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              color: '#9e9e9e',
              textTransform: 'none',
              '&.Mui-selected': {
                color: '#424242'
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#424242',
              height: 2
            }
          }}
        >
          {tabRoutes.map((tab) => (
            <Tab
              key={tab.path}
              icon={tab.icon}
              label={tab.label}
              iconPosition={isMobile ? 'top' : 'start'}
            />
          ))}
        </Tabs>

        <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'white' }}>
      {tabRoutes[tabValue]?.component}
        </Box>
      </Paper>
    </Box>
  );
}

export default SettingsPage;
