import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeaderContainer from "@components/DashboardLayout/container";
import FormContainer from "@components/FormContainer";
import FormAutoComplete from "@components/FormAutoComplete";
import FormTextField from "@components/FormTextField";
import FormDatePicker from "@components/FormDatePicker";

const AddWorkForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer: null,
    requestDate: null,
    source: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log("Form Submitted:", formData);
  };

  return (
    <HeaderContainer header="Add Work" addButton={false} divider>
      <FormContainer onSubmit={handleSubmit}>
        <FormAutoComplete
          name="customer"
          label="Customer"
          value={formData.customer}
          onChange={(e, value) => handleChange("customer")(value)}
          options={["John Doe", "Jane Smith", "Company XYZ"]} // Replace with dynamic data
          errorText={errors.customer}
          size={{ md: 3, xs: 12 }}
        />

        <FormDatePicker
          name="requestDate"
          label="Request Date"
          value={formData.requestDate}
          onChange={handleChange("requestDate")}
          errorText={errors.requestDate}
          size={{ md: 3, xs: 12 }}
        />

        <FormTextField
          name="source"
          label="Source"
          value={formData.source}
          onChange={handleChange("source")}
          errorText={errors.source}
          size={{ md: 3, xs: 12 }}
        />

        <FormTextField
          name="notes"
          label="Notes"
          value={formData.notes}
          onChange={handleChange("notes")}
          errorText={errors.notes}
          size={{ md: 3, xs: 12 }}
          rows={1}
          multiline
        />

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </FormContainer>
    </HeaderContainer>
  );
};

export default AddWorkForm;
