import React from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  Avatar,
  CardContent,
  CardActions,
} from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const crmItems = [
    {
      title: "Customers",
      icon: <ContactPhoneIcon />,
      onClick: () => navigate("/management/crm"),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom mb={2}>
        CRM
      </Typography>

      <Grid container spacing={3}>
        {crmItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                minWidth: "300px",
                borderRadius: 3,
                transition: "transform 0.2s ease, box-shadow 0.3s ease",
                ":hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
                <Button
                  onClick={item.onClick}
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "none", borderRadius: 2 }}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Index;
