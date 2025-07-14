import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import Container from "@components/DashboardLayout/container";

const Dashboard = () => {


      let user = JSON.parse(localStorage.getItem("user"));

  let userName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "User";

  let lastLogin = user?.lastLogin
    ? new Date(user.lastLogin).toLocaleString()
    : "N/A";

  return (
    <Container divider={false}>
      <Grid container spacing={3} sx={{ width: "100%" }}>
        {/* Page Heading */}
        <Grid item xs={12}>
          <Box sx={{ paddingLeft: 6 }}>
            <Typography variant="h2" sx={{ fontSize: "2rem", fontWeight: 500 }}>
              Welcome back {userName}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1rem" }}>
              Last login: {lastLogin}
            </Typography>
          </Box>
        </Grid>

    
      </Grid>
    </Container>
  );
};

export default Dashboard;
