import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const EarningsChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Earnings",
        data: [450, 380, 300, 420, 500, 700, 600],
        fill: true,
        borderColor: "#1976d2",
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(25, 118, 210, 0.5)");
          gradient.addColorStop(1, "rgba(25, 118, 210, 0.05)");
          return gradient;
        },
        tension: 0.4,
        pointBackgroundColor: "#1976d2",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 250,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        Earnings Report
      </Typography>
      <Box sx={{ flex: 1 }}>
        <Line ref={chartRef} data={data} options={options} />
      </Box>
    </Box>
  );
};

export default EarningsChart;
