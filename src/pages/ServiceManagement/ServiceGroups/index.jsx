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
import Container from "@components/DashboardLayout/Container";

import { useDispatch, useSelector } from "react-redux";
import {
  getServiceGroups,
  createServiceGroup,
  updateServiceGroup,

} from "@root/redux/actions/serviceGroupActions";
import useDebouncedSearch from "@root/utils/useDebouncedSearch";

const Index = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [groupName, setGroupName] = useState("");
const [serviceGroups,setServiceGroups]=useState([])
  // 🔁 Fetch categories when params change
useEffect(() => {
  const fetchData = async () => {
    const result = await dispatch(getServiceGroups());
    console.log("result",result);
    
    setServiceGroups(result);
  };

  fetchData();
}, []);

  const handleOpenDialog = (category = null) => {
    if (category) {
      setEditingId(category.id);
      setGroupName(category.name);
    } else {
      setEditingId(null);
      setGroupName("");
    }
    setOpen(true);
  };

  const handleSaveCategory = () => {
    const name = groupName.trim();
    if (!name) return alert("Please enter a category name");


    if (editingId) {
      dispatch(updateServiceGroup(editingId,{name})).then(() =>
        dispatch(getServiceGroups())
      );
    } else {
      dispatch(createServiceGroup({ name })).then(() =>
        dispatch(getServiceGroups())
      );
    }

    setOpen(false);
    setGroupName("");
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
     // searchValue={params.search}
      onSearchChange={handleSearchChange}
      onClearSearch={clearSearch}
      searchPlaceholder="Search by category name"
    >
      <DataTable
        columns={columns}
        data={serviceGroups}
        emptyMessage="No categories found."
        titleField="name"
       // params={params}
        updateParams={(newParams) =>
          dispatch(updateServiceCategoryParams(newParams))
        }
        onRowClick={() => {}}
       // count={count}
      />

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? "Edit Group" : "Add Group"}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <FormTextField
            name="group"
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
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
