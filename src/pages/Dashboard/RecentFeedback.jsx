import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  useTheme,
  Rating,
} from "@mui/material";

const feedbacks = [
  {
    customer: "Hafis Av",
    feedback: "Great service, very satisfied!",
    rating: 5,
    date: "Apr 20",
  },
  {
    customer: "Amaan ",
    feedback: "The team was professional and prompt.",
    rating: 4,
    date: "Apr 18",
  },
  {
    customer: "shadhin",
    feedback: "Could improve punctuality, but good overall.",
    rating: 3,
    date: "Apr 17",
  },
];

const RecentFeedback = () => {
  const theme = useTheme();

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Recent Customer Feedback
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Feedback</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Rating</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.map((fb, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: theme.palette.action.hover,
                    },
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell>{fb.customer}</TableCell>
                  <TableCell>{fb.feedback}</TableCell>
                  <TableCell>
                    <Rating value={fb.rating} readOnly size="small" />
                  </TableCell>
                  <TableCell>{fb.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentFeedback;
