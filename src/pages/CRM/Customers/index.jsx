import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "@components/DashboardLayout/Container";
import DataTable from "@components/DataTable";
import { Button } from "@mui/material";
import {
  getCustomers,
  updateCustomerParams,
} from "@root/redux/actions/customerActions";

const CustomerListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customers, params } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomers(params));
  }, [dispatch, params.page, params.rowsPerPage, params.search]);

  const handleSearchChange = (e) => {
    dispatch(updateCustomerParams({ ...params, search: e.target.value, page: 1 }));
  };

  const clearSearch = () => {
    dispatch(updateCustomerParams({ ...params, search: "", page: 1 }));
  };

  const addCustomer = () => {
    navigate("/CRM/Customers/Add");
  };

  const updateParams = (newParams) => {
    dispatch(updateCustomerParams(newParams));
  };

  const columns = [
    { key: "customerType", label: "Customer Type" },
    { key: "companyName", label: "Company Name" },
    { key: "contactPerson", label: "Contact Person" },
    { key: "address", label: "Address" },
    { key: "phone", label: "Phone" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => navigate(`/Customer/Edit/${row.id}`)}
          sx={{ textTransform: "none", borderRadius: 1 }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Container
      header="Customers"
      buttonFunction={addCustomer}
      buttonText="New"
      addButton={true}
      divider={true}
      yScrol={{}}
      showSearch={true}
      searchValue={params.search}
      onSearchChange={handleSearchChange}
      onClearSearch={clearSearch}
      searchPlaceholder="Search by name, contact or phone"
    >
      <DataTable
        columns={columns}
        data={customers}
        emptyMessage="No customers found."
        titleField="companyName"
        params={params}
        updateParams={updateParams}
        onRowClick={(row) => {}}
        count={params.count}
      />
    </Container>
  );
};

export default CustomerListPage;
