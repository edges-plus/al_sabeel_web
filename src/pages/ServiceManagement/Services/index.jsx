import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Switch } from "@mui/material";

import Container from "@components/DashboardLayout/Container";
import DataTable from "@components/DataTable";


import {
  getServices,
  updateService,
} from "@root/redux/actions/serviceActions"; 

const ServiceGroupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [services,setServices]=useState([])
 const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
 const [count, seCount] = useState("");

 
 
  useEffect(() => {
    const fetchData = async () => {
      const result = await  dispatch(getServices(
        { page,
          rowsPerPage,
          order: "DESC",
  }
      ));
     
      
      setServices(result);
    };
  
    fetchData();
  }, [page,searchText,totalRows]);


  const addServiceGroup = () => {
    navigate("/ServiceManagement/serviceGroup/Add");
  };

  

  const columns = [
    { label: "Name", key: "name" },
    { label: "Category", key: "groupName" },
    { label: "Unit Measure", key: "unitType" },
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
          checked={item.isActive}
          onChange={() => dispatch(updateService(item.id, { isActive: !item.isActive }))}

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
     // searchValue={params.search}
     // onSearchChange={handleSearchChange}
      //onClearSearch={clearSearch}
      searchPlaceholder="Search by name, category or unit"
    >
      <DataTable
        columns={columns}
        data={services}
        emptyMessage="No service groups found."
        titleField="name"
       // params={params}
        //updateParams={updateParams}
        onRowClick={() => {}}
        //count={params.count}
      />
    </Container>
  );
};

export default ServiceGroupPage;
