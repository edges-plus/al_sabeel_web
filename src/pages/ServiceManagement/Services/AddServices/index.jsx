import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormTextField from "@components/FormTextField";
import FormAutoComplete from "@components/FormAutoComplete";
import FormContainer from "@components/FormContainer";

const mockCategories = [
  { id: 1, name: "Cleaning" },
  { id: 2, name: "Plumbing" },
  { id: 3, name: "Electrical" },
];

const AddService = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: null,
    unitType: "",
    basePrice: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category) {
      return alert("Please fill in the name and category");
    }

    const payload = {
      ...formData,
      category: formData.category.name,
      basePrice: parseFloat(formData.basePrice),
    };

    console.log("Submitting service:", payload);
    navigate("/management/services");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          Add New Service
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormContainer>
            <FormTextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              size={{ md: 6, xs: 12 }}
            />

            <FormTextField
              name="unitType"
              label="Unit Type"
              value={formData.unitType}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, unitType: e.target.value }))
              }
              size={{ md: 6, xs: 12 }}
            />

            {/* Wider category field */}
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
              size={{ md: 8, xs: 12 }}
            />

            {/* Smaller base price to balance row */}
            <FormTextField
              name="basePrice"
              label="Base Price"
              type="number"
              value={formData.basePrice}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, basePrice: e.target.value }))
              }
              size={{ md: 4, xs: 12 }}
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

            <Grid size={12} sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Grid>
          </FormContainer>
        </form>
      </Box>
    </Container>
  );
};

export default AddService;
