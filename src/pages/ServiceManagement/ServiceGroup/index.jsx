import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Switch } from "@mui/material";

import Container from "@components/DashboardLayout/container";
import DataTable from "@components/DataTable";


import {
  getServiceGroups,
  updateServiceGroup,
  updateServiceGroupParams,
} from "@root/redux/actions/serviceGroupActions"; 

const ServiceGroupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: services, params } = useSelector((state) => state.serviceGroup);

  useEffect(() => {
    dispatch(getServiceGroups(params));
  }, [dispatch, params.page, params.rowsPerPage, params.search]);

  const handleSearchChange = (e) => {
    dispatch(updateServiceGroupParams({ ...params, search: e.target.value, page: 1 }));
  };

  const clearSearch = () => {
    dispatch(updateServiceGroupParams({ ...params, search: "", page: 1 }));
  };

  const addServiceGroup = () => {
    navigate("/ServiceManagement/serviceGroup/Add");
  };

  const updateParams = (newParams) => {
    dispatch(updateServiceGroupParams(newParams));
  };

  const columns = [
    { label: "Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "Unit Measure", key: "unitMeasure" },
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
          onChange={() => dispatch(updateServiceGroup(item.id, !item.active))}
        />
      ),
    },
    {
      label: "Actions",
      key: "actions",
      render: (row) => (
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => navigate(`/ServiceManagement/serviceGroup/Edit/${row.id}`)}
          sx={{ textTransform: "none", borderRadius: 1 }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Container
      header="Service Groups"
      buttonFunction={addServiceGroup}
      buttonText="New"
      addButton={true}
      divider={true}
      yScrol={{}}
      showSearch={true}
      searchValue={params.search}
      onSearchChange={handleSearchChange}
      onClearSearch={clearSearch}
      searchPlaceholder="Search by name, category or unit"
    >
      <DataTable
        columns={columns}
        data={services}
        emptyMessage="No service groups found."
        titleField="name"
        params={params}
        updateParams={updateParams}
        onRowClick={() => {}}
        count={params.count}
      />
    </Container>
  );
};

export default ServiceGroupPage;
