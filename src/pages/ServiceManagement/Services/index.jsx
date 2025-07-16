import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DataTable from "@components/DataTable";

const Index = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Bathroom Cleaning",
      category: "Cleaning",
      unitType: "Per Hour",
      basePrice: 300,
      description: "Deep clean bathroom service",
      active: true,
    },
    {
      id: 2,
      name: "Pipe Fixing",
      category: "Plumbing",
      unitType: "Per Service",
      basePrice: 500,
      description: "Fix leaking pipes",
      active: false,
    },
  ]);

  const [params, setParams] = useState({
    page: 1,
    rowsPerPage: 10,
    count: 2,
  });

  const columns = [
    { label: "Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "Unit Type", key: "unitType" },
    {
      label: "Base Price",
      key: "basePrice",
      render: (item) => `₹${item.basePrice}`,
    },
    { label: "Description", key: "description" },
    {
      label: "Status",
      key: "active",
      render: (item) => (
        <Switch
          checked={item.active}
          onChange={() => {
            setServices((prev) =>
              prev.map((s) =>
                s.id === item.id ? { ...s, active: !s.active } : s
              )
            );
          }}
        />
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Services
        </Typography>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/ServiceManagement/services/Add")}
        >
          + Add New Service
        </Button>
      </Grid>

      <DataTable
        columns={columns}
        data={services.slice(
          (params.page - 1) * params.rowsPerPage,
          params.page * params.rowsPerPage
        )}
        params={{ ...params, count: services.length }}
        updateParams={setParams}
      />
    </Box>
  );
};

export default Index;
