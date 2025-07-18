import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "@components/DashboardLayout/Container";
import DataTable from "@components/DataTable";
import { Button } from "@mui/material";
import { getUsers, updateUserParams } from "@root/redux/actions/userManagementActions";

const UserListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    rowsPerPage: 5,
    search: "",
    count: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, [params.page, params.rowsPerPage, params.search]);

  const fetchUsers = async () => {
    const response = await dispatch(getUsers(params));
    setUsers(response.data);
    setParams((prev) => ({ ...prev, count: response.params.count }));
  };

  const handleSearchChange = (e) => {
    const newParams = { ...params, search: e.target.value, page: 1 };
    setParams(newParams);
    dispatch(updateUserParams(newParams));
  };

  const clearSearch = () => {
    const newParams = { ...params, search: "", page: 1 };
    setParams(newParams);
    dispatch(updateUserParams(newParams));
  };

  const addUser = () => {
    navigate("/Settings/users/add");
  };

  const updateParams = (newParams) => {
    setParams(newParams);
    dispatch(updateUserParams(newParams));
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
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
          onClick={() => navigate(`/Management/Users/Edit/${row.id}`)}
          sx={{ textTransform: "none", borderRadius: 1 }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Container
      header="Users"
      buttonFunction={addUser}
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
        data={users}
        emptyMessage="No users found."
        titleField="name"
        params={params}
        updateParams={updateParams}
        onRowClick={(row) => {}}
        count={params.count}
      />
    </Container>
  );
};

export default UserListPage;
