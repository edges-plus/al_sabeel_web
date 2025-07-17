import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import HeaderContainer from "@components/DashboardLayout/container";
import FormContainer from "@components/FormContainer";
import FormTextField from "@components/FormTextField";
import FormDatePicker from "@components/FormDatePicker";
import FormAutoComplete from "@components/FormAutoComplete";

// Mock data for customer
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

  const handleChange = (field) => (e) => {
    const value = e?.target?.value ?? e;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.customer) newErrors.customer = "Customer is required";
    if (!formData.requestDate) newErrors.requestDate = "Request date is required";
    if (!formData.source) newErrors.source = "Source is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    console.log("Form submitted:", formData);
    // submit logic here
  };

  return (
    <HeaderContainer header="Add Work" addButton={false} divider>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <FormAutoComplete
            name="customer"
            label="Customer"
            options={mockCustomers}
            value={formData.customer}
            onChange={(e, value) =>
              handleChange("customer")({ target: { value } })
            }
            errorText={errors.customer}
            getOptionLabel={(option) => option?.name || ""}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            size={{ md: 6, xs: 12 }}
          />

          <FormDatePicker
            label="Request Date"
            name="requestDate"
            value={formData.requestDate}
            onChange={(name, value) =>
              handleChange("requestDate")({ target: { value } })
            }
            errorText={errors.requestDate}
            size={{ md: 6, xs: 12 }}
          />

          <FormTextField
            label="Source"
            name="source"
            value={formData.source}
            onChange={handleChange("source")}
            errorText={errors.source}
            size={{ md: 6, xs: 12 }}
          />

          <FormTextField
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange("notes")}
            errorText={errors.notes}
            multiline
            rows={3}
            size={{ md: 6, xs: 12 }}
          />

          <Grid
            item
            xs={12}
            sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}
          >
            <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </FormContainer>
      </form>
    </HeaderContainer>
  );
};

export default AddWorkForm;
