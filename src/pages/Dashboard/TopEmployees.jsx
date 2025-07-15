import React from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Stack,
  useTheme,
} from "@mui/material";

const employees = [
  { name: "Sinan", progress: 90 },
  { name: "Amaan", progress: 70 },
  { name: "Shadhin", progress: 50 },
];

const TopEmployees = () => {
  const theme = useTheme();

  const getProgressColor = (value) => {
    if (value >= 80) return theme.palette.success.main;
    if (value >= 60) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Card
      elevation={2}
      sx={{ height: "100%", borderRadius: 3, display: "flex", flexDirection: "column" }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Top Employees
        </Typography>

        <Stack spacing={2}>
          {employees.map((emp, index) => (
            <Box key={index}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={0.5}
              >
                <Typography variant="subtitle2" fontWeight={500}>
                  {emp.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {emp.progress}%
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={emp.progress}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: theme.palette.grey[300],
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: getProgressColor(emp.progress),
                  },
                }}
              />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TopEmployees;
