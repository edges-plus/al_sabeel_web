import React from "react";
import { Box, Typography } from "@mui/material";
import Container from "@components/DashboardLayout/Container";

import StatCards from "./StatCards";
import ManagementSections from "./ManagementSections";
import EarningsChart from "./EarningsChart";
import TopEmployees from "./TopEmployees";
import RecentFeedback from "./RecentFeedback";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "User";
  const lastLogin = user?.lastLogin
    ? new Date(user.lastLogin).toLocaleString()
    : "N/A";

  return (
    <Container
      divider={false}
      sx={{
        width: "100%",
        maxWidth: "100% !important",
        px: { xs: 2, md: 4 },
        py: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Welcome back, {userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last login: {lastLogin}
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Box sx={{ mb: 3 }}>
        <StatCards />
      </Box>

      {/* Job Schedule + Earnings Report */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Box
          flex="1 1 48%"
          minWidth="300px"
          bgcolor="#f9f9f9"
          borderRadius={2}
          p={2}
        >
          <ManagementSections />
        </Box>
        <Box
          flex="1 1 48%"
          minWidth="300px"
          bgcolor="#f9f9f9"
          borderRadius={2}
          p={2}
        >
          <EarningsChart />
        </Box>
      </Box>

      {/* Top Employees + Recent Jobs */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Box
          flex="1 1 48%"
          minWidth="300px"
          bgcolor="#f9f9f9"
          borderRadius={2}
          p={2}
        >
          <TopEmployees />
        </Box>
        <Box
          flex="1 1 48%"
          minWidth="300px"
          bgcolor="#f9f9f9"
          borderRadius={2}
          p={2}
        >
          <RecentFeedback />
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
