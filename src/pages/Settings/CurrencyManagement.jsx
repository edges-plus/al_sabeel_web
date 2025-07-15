import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  AccountBalanceWallet,
  CurrencyExchange,
  Star,
} from '@mui/icons-material';
import HeaderContainer from "@components/DashboardLayout/container";

function CurrencyManagement() {
  const [primaryCurrency] = useState('AED');
  const [availableCurrencies] = useState([
    { code: 'AED', name: 'United Arab Emirates Dirham', symbol: '', isPrimary: true },
    // { code: 'USD', name: 'United States Dollar', symbol: '$', isPrimary: false }
  ]);

  return (
    <HeaderContainer>
      <Box sx={{ p: 3, mx: 'auto', bgcolor: 'white', }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Currency Management
          </Typography>
        
        </Box>

        <Grid container spacing={3}>
          {/* Primary Currency Card */}
          <Grid size={{
            xs:12, md: 6
          }}>
            <Card elevation={2} sx={{
           backgroundColor:'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Star sx={{ color: '#FFD700', mr: 1 }} />
                  <Typography variant="h6" component="h2">
                    Primary Currency
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <AccountBalanceWallet sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" component="div" color="primary.main">
                    {primaryCurrency}
                  </Typography>
                  <Typography variant="body1" >
                    United Arab Emirates Dirham
                  </Typography>
                  
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    This is your primary currency for all financial reports and base calculations.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Available Currencies Card */}
          <Grid size ={{xs:12, md: 6 }}>
            <Card elevation={2}  sx={{
           backgroundColor:'white'
            } }>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CurrencyExchange sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" component="h2">
                    Available Currencies
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <List>
                  {availableCurrencies.map((currency) => (
                    <ListItem key={currency.code} sx={{ px: 0 }}>
                    
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" color='black' component="span">
                              {currency.code}
                            </Typography>
                            <Typography variant="h6" component="span">
                              {currency.symbol}
                            </Typography>
                            {currency.isPrimary && (
                              <Chip 
                                label="Primary" 
                                size="small" 
                               
                                variant="outlined"
                              />
                            )}
                          </Box>
                        }
                        secondary={currency.name}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

        
        </Grid>
      </Box>
    </HeaderContainer>
  );
}

export default CurrencyManagement;

