import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormTextField from "@components/FormTextField";
import FormAutoComplete from "@components/FormAutoComplete";
import FormContainer from "@components/FormContainer";
import { isRequired, validate } from "@root/utils/validators";

const mockCategories = [
  { id: 1, name: "Cleaning" },
  { id: 2, name: "Plumbing" },
  { id: 3, name: "Electrical" },
];

const mockUnitMeasure = [
  { id: 1, name: "Litre" },
  { id: 2, name: "Kg" },
];

const AddService = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: null,
    unitMeasure: null,
    basePrice: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validatorMap = {
    name: isRequired,
    category: isRequired,
    unitMeasure: isRequired,
    basePrice: isRequired,
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    const fieldError = validate(updated, validatorMap)[field] || "";
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData, validatorMap);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      ...formData,
      category: formData.category.name,
      unitMeasure: formData.unitMeasure.name,
      basePrice: parseFloat(formData.basePrice),
    };

    console.log("Submitting service:", payload);
    setOpenSnackbar(true);
    setTimeout(() => navigate("/ServiceManagement"), 1500);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          Add New Service
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormContainer>
            <FormAutoComplete
              name="category"
              label="Category"
              options={mockCategories}
              value={formData.category}
              getOptionLabel={(option) => option.name}
              onChange={(e, newValue) =>
                setFormData((prev) => ({ ...prev, category: newValue }))
              }
              onInputChange={() => {}}
              size={{ md: 6, xs: 12 }}
              errorText={errors.category}
            />

            <FormTextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange("name")}
              size={{ md: 6, xs: 12 }}
              errorText={errors.name}
            />

            <FormAutoComplete
              name="unitMeasure"
              label="Unit Measure"
              options={mockUnitMeasure}
              value={formData.unitMeasure}
              getOptionLabel={(option) => option.name}
              onChange={(e, newValue) =>
                setFormData((prev) => ({ ...prev, unitMeasure: newValue }))
              }
              onInputChange={() => {}}
              size={{ md: 6, xs: 12 }}
              errorText={errors.unitMeasure}
            />

            <FormTextField
              name="basePrice"
              label="Base Price"
              type="number"
              value={formData.basePrice}
              onChange={handleChange("basePrice")}
              size={{ md: 6, xs: 12 }}
              errorText={errors.basePrice}
            />

            <FormTextField
              name="description"
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              size={{ md: 12, xs: 12 }}
            />

         <Box
  sx={{
    mt: 3,
    display: "flex",
    justifyContent: "flex-end",
    gap: 2, 
    flexWrap: "wrap", 
  }}
>
  <Button variant="outlined" onClick={() => navigate(-1)}>
    Cancel
  </Button>
  <Button type="submit" variant="contained">
    Save
  </Button>
</Box>

          </FormContainer>
        </form>
      </Box>

      {/* Snackbar for confirmation */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Service added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddService;
