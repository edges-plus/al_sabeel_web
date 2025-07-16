import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { useNavigate } from "react-router-dom";
import NavigationCard from "@components/NavigationCard.jsx";

const Index = () => {
  const navigate = useNavigate();

  const crmItems = [
    {
      title: "Customers",
      icon: <ContactPhoneIcon />,
      onClick: () => navigate("/CRM/Customers"),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom mb={5}>
        CRM
      </Typography>

      <Grid container spacing={3}>
        {crmItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <NavigationCard
              title={item.title}
              icon={item.icon}
              onClick={item.onClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Index;
