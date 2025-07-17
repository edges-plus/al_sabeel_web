import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import HeaderContainer from "@components/DashboardLayout/container";
import FormContainer from "@components/FormContainer";
import FormTextField from "@components/FormTextField";
import FormDatePicker from "@components/FormDatePicker";
import FormAutoComplete from "@components/FormAutoComplete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PurchaseLine from "./PurchaseLine";
// import { getVendorOptions } from "@root/redux/actions/vendorActions";
import useDebouncedSearch from "@root/utils/useDebouncedSearch";
import { useDispatch } from "react-redux";
import { isRequired, validate, } from "@root/utils/validators";
import ToolConsumableModal from "@pages/ServiceManagement/ToolsConsumables/ToolConsumableModal";


const Index = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [vendor, setVendor] = useState(null);
  const [description, setDescription] = useState("");
  const [lines, setLines] = useState([{ name: null, quantity: "", price: "" }]);
  const [vendorOptions, setVendorOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", type: "",  description: "" });

    const validatorMap = {
    name: isRequired,
    type: isRequired,
  };

  const debouncedVendorSearch = useDebouncedSearch((value) => {
    dispatch(getVendorOptions({ search: value })).then((action) => {
      if (action?.payload?.options) {
        setVendorOptions(action.payload.options);
      }
    });
  }, 400);
    const addToolConsumable = () => {
     setFormData({ name: "", type: "", description: "" }); 
     setModalOpen(true);
  };

  const handleLineChange = (idx, field, value) => {
    setLines((prev) =>
      prev.map((line, i) => (i === idx ? { ...line, [field]: value } : line))
    );
  };

  const addLine = () => setLines((prev) => [...prev, { name: null, quantity: "", price: "" }]);

  const removeLine = (idx) => setLines((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = () => {
    const newErrors = {};
    let hasError = false;

    if (!date) {
      newErrors.date = "Date is required";
      hasError = true;
    }

    if (!vendor || !vendor.id) {
      newErrors.vendor = "Vendor is required";
      hasError = true;
    }

    lines.forEach((line, idx) => {
      if (!line.name || !line.name.id) {
        newErrors[`name-${idx}`] = "Item is required";
        hasError = true;
      }
      if (!line.quantity) {
        newErrors[`qty-${idx}`] = "Quantity is required";
        hasError = true;
      }
      if (!line.price) {
        newErrors[`price-${idx}`] = "Price is required";
        hasError = true;
      }
    });

    if (hasError) return setErrors(newErrors);

    const payload = {
      date,
      vendorId: vendor.id,
      description,
      items: lines.map((line) => ({
        toolId: line.name.id,
        quantity: Number(line.quantity),
        price: Number(line.price),
      })),
    };

    console.log("Submitting payload", payload);
    // dispatch(createToolPurchase(payload));
  };

  const handleModalSubmit = () => {
    const newErrors = validate(formData, validatorMap);
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length > 0) return;
  
    // Submit logic here (e.g., dispatch action)
    console.log("Submitted:", formData);
    setModalOpen(false);
  };

  return (
    <HeaderContainer
      header="Purchases" 
      addButton={true} 
      buttonFunction={addToolConsumable}
      buttonText="New ITEM"
      yScrol={{}}
      divider
      >
      <FormContainer>
          <FormDatePicker
            label="Date"
            value={date}
            onChange={(name, newDate) => setDate(newDate)}
            errorText={errors.date}
            size={{ md: 4, xs: 12 }}
          />
          <FormAutoComplete
            label="Vendor"
            value={vendor}
            options={vendorOptions}
            onInputChange={(e, value) => debouncedVendorSearch(value)}
            onChange={(e, value) => setVendor(value)}
            getOptionLabel={(option) => option?.name || ""}
            errorText={errors.vendor}
            size={{ md: 4, xs: 12 }}
          />

        {lines.map((line, idx) => (
            <Grid size={12}>
          <PurchaseLine
            key={idx}
            idx={idx}
            line={line}
            onChange={handleLineChange}
            onRemove={removeLine}
            disableRemove={lines.length === 1}
            errorName={errors[`name-${idx}`]}
            errorQty={errors[`qty-${idx}`]}
            errorPrice={errors[`price-${idx}`]}
          /></Grid>
        ))} 

        <Grid size={{ xs: 12 }} sx={{ mb: 3, mx: 'auto', display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addLine}
            sx={{ fontWeight: 600, px: 3, py: 1.5, borderRadius: 2, boxShadow: 2 }}
          >
            Add Item
          </Button>
        </Grid>

        <Grid size={12} sx={{ mb: 2, mx: 'auto' }}>
          <FormTextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
        </Grid>

        <Grid size={12} sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
          <Button variant="contained" color="secondary"  onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </FormContainer>
        <ToolConsumableModal
              open={modalOpen}
              onClose={() => {
                  setModalOpen(false);
                  setErrors({}); 
                  }}
              onSubmit={handleModalSubmit}
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              />
    </HeaderContainer>
  );
};

export default Index;
