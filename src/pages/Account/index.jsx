import React from 'react'; 
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Stack
} from '@mui/material';
import {
  FolderOutlined,
  DescriptionOutlined,
  CurrencyExchangeOutlined,
  ChevronRight
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



function AccountTab() {
  // Financial management items with redirection
  const navigate = useNavigate();
  const financialItems = [
     {
      title: 'Chart of Accounts',
      description: '',
      icon: <FolderOutlined />,
      onClick: () => navigate('/Settings/Ledger/view') 
    },
    {
      title: 'Ledger Group Creation',
      description: '',
      icon: <FolderOutlined />,
      onClick: () => navigate('/Settings/LedgerGroup') 
    },
    {
      title: 'Ledger Creation',
      description: '',
      icon: <DescriptionOutlined />,
      onClick: () => navigate('/Settings/Ledger')
    },
    {
      title: 'Currency Settings',
      description: '',
      icon: <CurrencyExchangeOutlined />,
      onClick: () => navigate('/Settings/CurrencyManagement')
    },
  
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h6" component="h3" color="brand.darkBlue" sx={{ px: 2,py:1 }}>
        Accounts Settings
      </Typography>
      <Divider />
      
      {/* Make this Box scrollable instead of relying on HeaderContainer's scroll */}
      <Box sx={{ 
        p: 1, 
        flexGrow: 1, 
        overflowY: 'auto',
        maxHeight: {
          xs: 'calc(70vh - 65px)', // Mobile - subtract header height
          sm: 'calc(80vh - 65px)', // Tablet - subtract header height
          md: 'calc(60vh - 65px)'  // Desktop - subtract header height
        }
      }}>
        <Box sx={{ bgcolor: 'background.paper', borderRadius: 1, border: '1px solid #e0e0e0' }}>
          <Divider />
          <Box sx={{ p: 1 }}>
            <Stack spacing={1}>
              {financialItems.map((item, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    overflow: 'hidden'
                  }}
                >
                  <Button
                    fullWidth
                    onClick={item.onClick}
                    sx={{
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      p: 1,
                      '&:hover': {
                        bgcolor: '#f5f5f5'
                      },
                      color: 'inherit'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Box sx={{ color: '#9e9e9e', mr: 2 }}>
                        {item.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" fontWeight="medium" color="#424242" align="left" sx={{ textTransform: 'none' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="#9e9e9e" align="left">
                          {item.description}
                        </Typography>
                      </Box>
                      <ChevronRight sx={{ color: '#bdbdbd' }} />
                    </Box>
                  </Button>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AccountTab;