import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";

const statCards = [
  {
    title: "Total Jobs",
    value: 150,
    icon: <CleaningServicesIcon />,
    color: "#E3F2FD",
  },
  {
    title: "Service in Progress",
    value: 12,
    icon: <BuildCircleIcon />,
    color: "#E8F5E9",
  },
  {
    title: "Scheduled Works",
    value: 30,
    icon: <AttachMoneyIcon />,
    color: "#FFF3E0",
  },
  {
    title: "Completed Works",
    value: 54,
    icon: <PeopleIcon />,
    color: "#F3E5F5",
  },
];

const StatCards = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
<Box
  display="flex"
  flexWrap="wrap"
  gap={2}
  justifyContent={{ xs: "center", sm: "flex-start", md: "space-between" }}
>
  {statCards.map((stat, idx) => (
    <Card
      key={idx}
      sx={{
        flex: {
          xs: "1 1 100%",      // full width on mobile
          sm: "1 1 calc(50% - 16px)", // two per row on tablets
          md: "1 1 calc(25% - 16px)", // four per row on desktop
        },
        backgroundColor: stat.color,
        borderRadius: 3,
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar
        sx={{
          bgcolor: "white",
          color: theme.palette.primary.main,
          width: 48,
          height: 48,
        }}
      >
        {stat.icon}
      </Avatar>
      <Box>
        <Typography
          variant="body1"
          fontWeight={600}
          color="text.primary"
          sx={{ mb: 0.5 }}
        >
          {stat.title}
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          {stat.value}
        </Typography>
      </Box>
    </Card>
  ))}
</Box>

  );
};

export default StatCards;
