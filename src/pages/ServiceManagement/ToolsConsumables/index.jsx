import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Container from "@components/DashboardLayout/Container";
import DataTable from "@components/DataTable";
import { Button } from "@mui/material";
import { getToolConsumables ,createToolAndConsumable,updateToolAndConsumables} from "@root/redux/actions/toolConsumableActions";
import {
  isRequired,
  validate,
  combineValidators,
} from "@root/utils/validators";
import ToolConsumableModal from "@pages/ServiceManagement/ToolsConsumables/ToolConsumableModal";
import useDebouncedSearch from "@root/utils/useDebouncedSearch";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [editingId, setEditingId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const validatorMap = {
    name: isRequired,
    type: isRequired,
  };

  const [toolAndConsumables, setToolConsumables] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");





  const fetchToolConsumables = async () => {
 const result = await dispatch(getToolConsumables({
  page,
  rowsPerPage,
  order: "DESC",
  search: searchText,
}));
    setToolConsumables( result?.data)
    setTotalRows(result.count || 0);
  };
  const debouncedSearch = useDebouncedSearch(fetchToolConsumables, 500);

  useEffect(() => {
    debouncedSearch();
  }, [page, searchText, rowsPerPage]);

  const addToolConsumable = () => {
    setFormData({ name: "", type: "", description: "" });
    setModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
  };



const handleEdit = (id) => {
  const item = toolAndConsumables.find((el) => el.id === id);
  if (item) {
    setFormData({
      name: item.name,
      type: item.type,
      SKU:item.SKU,
      description: item.description,
    });
    setEditingId(id);
    setModalOpen(true);
  }
};


  const columns = [
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    { key: "SKU", label: "SKU" },
    { key: "description", label: "Description" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <Button
          variant="contained"
          size="small"
          color="secondary"
        onClick={() => handleEdit(row.id)}

          sx={{ textTransform: "none", borderRadius: 1 }}
        >
          Edit
        </Button>
      ),
    },
  ];
  const handleSubmit = () => {
    const newErrors = validate(formData, validatorMap);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    try {
     if (editingId) {
    
       dispatch(updateToolAndConsumables(editingId,formData));
      
      } else {
        dispatch(createToolAndConsumable(formData));
      }
       setModalOpen(false)
    fetchToolConsumables()
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <Container
      header="Tools & Consumables"
      buttonFunction={addToolConsumable}
      buttonText="New"
      addButton={true}
      divider={true}
      yScrol={{}}
      showSearch={true}
      searchValue={searchText}
      onSearchChange={handleSearchChange}
      onClearSearch={clearSearch}
      searchPlaceholder="Search by name, type or SKU"
    >
      <DataTable
        columns={columns}
        data={toolAndConsumables}
        emptyMessage="No tools or consumables found."
        titleField="name"
          params={{
          count: totalRows,
          rowsPerPage: rowsPerPage,
          page: page,
        }}
         updateParams={({ page, rowsPerPage }) => {
          setPage(page);
          setRowsPerPage(rowsPerPage);
        }}
        onRowClick={() => {}}
      />
      <ToolConsumableModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setErrors({});
        }}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
      />
    </Container>
  );
};

export default Index;
