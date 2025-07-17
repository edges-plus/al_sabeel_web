import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, IconButton } from "@mui/material";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import HeaderContainer from "@components/DashboardLayout/container";
import FormContainer from "@components/FormContainer";
import FormTextField from "@components/FormTextField";
import FormDatePicker from "@components/FormDatePicker";
import FormAutoComplete from "@components/FormAutoComplete";

// Mock Data
const mockCustomers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const mockWorkItems = [
  { id: 1, name: "Painting" },
  { id: 2, name: "Plumbing" },
  { id: 3, name: "Cleaning" },
];

const AddWorkForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer: null,
    requestDate: null,
    source: "",
    notes: "",
  });

  const [workLines, setWorkLines] = useState([{ work: null, description: "" }]);

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    const value = e?.target?.value ?? e;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWorkLineChange = (index, field, value) => {
    const updatedLines = [...workLines];
    updatedLines[index][field] = value;
    setWorkLines(updatedLines);
  };

  const addWorkLine = () => {
    setWorkLines([...workLines, { work: null, description: "" }]);
  };

  const removeWorkLine = (index) => {
    const updatedLines = workLines.filter((_, i) => i !== index);
    setWorkLines(updatedLines);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.customer) newErrors.customer = "Customer is required";
    if (!formData.requestDate)
      newErrors.requestDate = "Request date is required";
    if (!formData.source) newErrors.source = "Source is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      ...formData,
      workLines,
    };

    console.log("Submitted:", payload);
    // submit logic
  };

  return (
    <HeaderContainer header="Add Work" addButton={false} divider>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          {/* Basic Fields */}
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
            multiline
            rows={3}
            size={{ md: 6, xs: 12 }}
          />

          {workLines.map((line, index) => (
            <Grid
              size={{ xs: 12, md: 6 }}
              key={index}
              container
              spacing={2}
              alignItems="center"
              sx={{
                bgcolor: "#f4f6f8",
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              {/* Work AutoComplete Field */}
              <Grid size={10}>
                <FormAutoComplete
                  name={`work-${index}`}
                  label="Work"
                  options={mockWorkItems}
                  value={line.work}
                  onChange={(e, value) =>
                    handleWorkLineChange(index, "work", value)
                  }
                  getOptionLabel={(option) => option?.name || ""}
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value?.id
                  }
                  fullWidth
                />
              </Grid>

              {/* Delete Button */}
              <Grid size={2}>
                <IconButton
                  color="error"
                  onClick={() => removeWorkLine(index)}
                  disabled={workLines.length === 1}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <Grid
            size={{ xs: 12 }}
            sx={{
              mb: 3,
              mx: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              startIcon={<Add />}
              onClick={addWorkLine}
              variant="outlined"
              color="primary"
            >
              Add Line
            </Button>
          </Grid>

          <FormAutoComplete
            size={{ xs: 12, md: 6 }}
            name="nextWork"
            label="Next Work"
            options={["Site inception", "Enquiry", "Work Order"]}
            value={formData.nextWork}
            onChange={(e, value) =>
              handleChange("nextWork")({ target: { value } })
            }
            errorText={errors.nextWork}
            getOptionLabel={(option) => option?.name || option}
            isOptionEqualToValue={(option, value) =>
              (option?.id ?? option) === (value?.id ?? value)
            }
          />

          {/* Submit Buttons */}
          <Grid
            size={12}
            sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(-1)}
            >
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
