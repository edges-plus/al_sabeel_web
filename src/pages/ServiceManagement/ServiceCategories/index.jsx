import React, { useEffect, useMemo, useState } from "react";
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
import Container from "@components/DashboardLayout/container";

import { useDispatch, useSelector } from "react-redux";
import {
  getServiceCategories,
  createServiceCategory,
  updateServiceCategory,
  updateServiceCategoryParams
} from "@root/redux/actions/serviceCategoriesActions";


const Index = () => {
  const dispatch = useDispatch();
  const { data, count, params } = useSelector((state) => state.serviceCategory);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  // 🔁 Fetch categories when params change
  useEffect(() => {
    dispatch(getServiceCategories(params));
  }, [params.page, params.rowsPerPage, params.search]);

  const paginatedData = useMemo(() => data || [], [data]);

  const handleOpenDialog = (category = null) => {
    if (category) {
      setEditingId(category.id);
      setCategoryName(category.name);
    } else {
      setEditingId(null);
      setCategoryName("");
    }
    setOpen(true);
  };

  const handleSaveCategory = () => {
    const name = categoryName.trim();
    if (!name) return alert("Please enter a category name");

    if (editingId) {
      dispatch(updateServiceCategory(editingId, { name })).then(() =>
        dispatch(getServiceCategories(params))
      );
    } else {
      dispatch(createServiceCategory({ name })).then(() =>
        dispatch(getServiceCategories(params))
      );
    }

    setOpen(false);
    setCategoryName("");
    setEditingId(null);
  };

  const handleSearchChange = (e) => {
    dispatch(
      updateServiceCategoryParams({ search: e.target.value, page: 1 })
    );
  };

  const clearSearch = () => {
    dispatch(updateServiceCategoryParams({ search: "", page: 1 }));
  };

  const columns = [
    { label: "Category Name", key: "name" },
    {
      label: "Actions",
      key: "actions",
      render: (row) => (
        <Button
          size="small"
          variant="outlined"
          onClick={() => handleOpenDialog(row)}
          sx={{ textTransform: "none", borderRadius: 1 }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Container
      header="Service Categories"
      buttonFunction={() => handleOpenDialog(null)}
      buttonText="New"
      addButton={true}
      divider={true}
      yScrol={{}}
      showSearch={true}
      searchValue={params.search}
      onSearchChange={handleSearchChange}
      onClearSearch={clearSearch}
      searchPlaceholder="Search by category name"
    >
      <DataTable
        columns={columns}
        data={paginatedData}
        emptyMessage="No categories found."
        titleField="name"
        params={params}
        updateParams={(newParams) =>
          dispatch(updateServiceCategoryParams(newParams))
        }
        onRowClick={() => {}}
        count={count}
      />

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? "Edit Category" : "Add Category"}</DialogTitle>
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
          <Button onClick={handleSaveCategory} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Index;
