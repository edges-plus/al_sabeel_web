import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import FormTextField from "@components/FormTextField";
import DataTable from "@components/DataTable"; 

const Index = () => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([
    { id: 1, name: "Cleaning" },
    { id: 2, name: "Plumbing" },
  ]);

  const [params, setParams] = useState({
    page: 1,
    rowsPerPage: 10,
    count: 2,
  });

  const columns = [
    { label: "Category Name", key: "name" },
  ];

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      return alert("Please enter category name");
    }

    const newCategory = {
      id: categories.length + 1,
      name: categoryName,
    };

    setCategories([newCategory, ...categories]);
    setCategoryName("");
    setOpen(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Service Categories
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)} sx={{ textTransform: "none" }}>
          + Add New
        </Button>
      </Grid>

      <DataTable
        columns={columns}
        data={categories.slice(
          (params.page - 1) * params.rowsPerPage,
          params.page * params.rowsPerPage
        )}
        params={{ ...params, count: categories.length }}
        updateParams={setParams}
      />

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <FormTextField
            name="category"
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleAddCategory} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Index;
