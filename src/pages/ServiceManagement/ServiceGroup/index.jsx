import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "@components/DataTable";
import {
  getServiceCategories,
  updateServiceCategory,
  updateServiceCategoryParams,
} from "@root/redux/actions/serviceCategoriesActions";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { services, params } = useSelector((state) => state.serviceCategory); 

  useEffect(() => {
    dispatch(getServiceCategories(params));
  }, [dispatch, params.page, params.rowsPerPage]);

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
          onChange={() => dispatch(updateServiceCategory(item.id, !item.active))}
        />
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Service Group
        </Typography>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/ServiceManagement/serviceGroup/Add")}
        >
          + Add New Service
        </Button>
      </Grid>

      <DataTable
        columns={columns}
        data={services}
        params={params}
        updateParams={(newParams) => dispatch(updateServiceCategoryParams(newParams))}
      />
    </Box>
  );
};

export default Index;
