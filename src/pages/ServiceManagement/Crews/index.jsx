import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "@components/DashboardLayout/Container";
import DataTable from "@components/DataTable";
import { Button } from "@mui/material";
import { getCrews, updateCrewParams } from "@actions/crewActions";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [crews, setCrews] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    rowsPerPage: 5,
    search: "",
    count: 0,
  });

  useEffect(() => {
    fetchCrews();
  }, [params.page, params.rowsPerPage, params.search]);

  const fetchCrews = async () => {
    const response = await dispatch(getCrews(params));
    setCrews(response.data);
    setParams((prev) => ({ ...prev, count: response.params.count }));
  };

  const handleSearchChange = (e) => {
    const newParams = { ...params, search: e.target.value, page: 1 };
    setParams(newParams);
    dispatch(updateCrewParams(newParams));
  };

  const clearSearch = () => {
    const newParams = { ...params, search: "", page: 1 };
    setParams(newParams);
    dispatch(updateCrewParams(newParams));
  };

  const addCrew = () => {
    navigate("/ServiceManagement/crews/add");
  };

  const updateParams = (newParams) => {
    setParams(newParams);
    dispatch(updateCrewParams(newParams));
  };

  const columns = [
    { key: "employeeNo", label: "Employee No" },
    { key: "name", label: "Name" },
    { key: "jobTitle", label: "Job Title" },
    { key: "department", label: "Department" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => navigate(`/ServiceManagement/crews/edit/${row.id}`)}
          sx={{ textTransform: "none", borderRadius: 1 }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Container
      header="Crews"
      buttonFunction={addCrew}
      buttonText="New"
      addButton={true}
      divider={true}
      yScrol={{}}
      showSearch={true}
      searchValue={params.search}
      onSearchChange={handleSearchChange}
      onClearSearch={clearSearch}
      searchPlaceholder="Search"
    >
      <DataTable
        columns={columns}
        data={crews}
        emptyMessage="No crews found."
        titleField="name"
        params={params}
        updateParams={updateParams}
        onRowClick={(row) => {}}
        count={params.count}
      />
    </Container>
  );
};

export default Index;
