import React, { useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormContainer from "@components/FormContainer";
import FormTextField from "@components/FormTextField";
import FormDatePicker from "@components/FormDatePicker";
import FormAutoComplete from "@components/FormAutoComplete";

const mockCustomers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const AddWorkForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    customer: null,
    requestDate: null,
    source: "",
    notes: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.customer) newErrors.customer = "Customer is required";
    if (!formData.requestDate) newErrors.requestDate = "Request date is required";
    if (!formData.source) newErrors.source = "Source is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    console.log("Form submitted:", formData);
    // Add your save logic here
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <FormAutoComplete
            label="Customer"
            name="customer"
            options={mockCustomers}
            value={formData.customer}
            onChange={(name, value) => handleChange(name, value)}
            errorText={errors.customer}
            getOptionLabel={(option) => option?.name || ""}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <FormDatePicker
            label="Request Date"
            name="requestDate"
            value={formData.requestDate}
            onChange={(name, value) => handleChange(name, value)}
            errorText={errors.requestDate}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <FormTextField
            label="Source"
            name="source"
            value={formData.source}
            onChange={(e) => handleChange("source", e.target.value)}
            errorText={errors.source}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <FormTextField
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            errorText={errors.notes}
            multiline
            rows={3}
          />
        </Grid>

        <Grid item xs={12}>
          <Box textAlign="right">
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default AddWorkForm;
