import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import BuildIcon from "@mui/icons-material/Build";
import HandymanIcon from "@mui/icons-material/Handyman"; // For Tools & Consumables
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // For Purchases

import { useNavigate } from "react-router-dom";
import NavigationCard from "@components/NavigationCard.jsx";

const Index = () => {
  const navigate = useNavigate();

  const serviceItems = [
    {
      title: "Service Groups",
      icon: <CategoryIcon />,
      onClick: () => navigate("/ServiceManagement/service-groups"),
    },

        {

      title: "Services",

      icon: <BuildIcon />,
      onClick: () => navigate("/ServiceManagement/services"),
    },
    {
      title: "Tools & Consumables",
      icon: <HandymanIcon />,
      onClick: () => navigate("/ServiceManagement/tools-consumables"),
    },
    {
      title: "Purchases",
      icon: <ShoppingCartIcon />,
      onClick: () => navigate("/ServiceManagement/purchases"),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom mb={5}>
        Service Management
      </Typography>

      <Grid container spacing={3}>
        {serviceItems.map((item, index) => (
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
