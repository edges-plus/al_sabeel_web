import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "@components/DashboardLayout/container";
import DataTable from "@components/DataTable";
import { Button } from "@mui/material";
import {
  getToolConsumables,
  updateToolConsumableParams,
} from "@root/redux/actions/toolConsumableActions";
import { isRequired, validate, combineValidators } from "@root/utils/validators";
import ToolConsumableModal from "@pages/ServiceManagement/ToolsConsumables/ToolConsumableModal";


const ToolConsumableListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toolConsumables, params } = useSelector((state) => state.toolConsumable);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", type: "",  description: "" });
  const [errors, setErrors] = useState({});

  const validatorMap = {
  name: isRequired,
  type: isRequired,
};

  useEffect(() => {
    dispatch(getToolConsumables(params));
  }, [dispatch, params.page, params.rowsPerPage, params.search]);

  const handleSearchChange = (e) => {
    dispatch(updateToolConsumableParams({ ...params, search: e.target.value, page: 1 }));
  };

  const clearSearch = () => {
    dispatch(updateToolConsumableParams({ ...params, search: "", page: 1 }));
  };

  const addToolConsumable = () => {
     setFormData({ name: "", type: "", description: "" }); 
     setModalOpen(true);
  };

  const updateParams = (newParams) => {
    dispatch(updateToolConsumableParams(newParams));
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    { key: "sku", label: "SKU" },
    { key: "description", label: "Description" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => navigate(`/ServiceManagement/tools-consumables/edit/${row.id}`)}
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

  // Submit logic here (e.g., dispatch action)
  console.log("Submitted:", formData);
  setModalOpen(false);
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
      searchValue={params.search}
      onSearchChange={handleSearchChange}
      onClearSearch={clearSearch}
      searchPlaceholder="Search by name, type or SKU"
    >
      <DataTable
        columns={columns}
        data={toolConsumables}
        emptyMessage="No tools or consumables found."
        titleField="name"
        params={params}
        updateParams={updateParams}
        onRowClick={() => {}}
        count={params.count}
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

export default ToolConsumableListPage;
