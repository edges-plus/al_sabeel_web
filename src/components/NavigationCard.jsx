
import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

const NavigationCard = ({ title, icon, onClick, buttonText = "View" }) => {
  return (
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
            {icon}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
        <Button
          onClick={onClick}
          variant="contained"
          size="small"
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default NavigationCard;
