import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import HeaderContainer from "@components/DashboardLayout/container";
import FormContainer from "@components/FormContainer";
import FormTextField from "@components/FormTextField";
import FormDatePicker from "@components/FormDatePicker";
import FormAutoComplete from "@components/FormAutoComplete";
import { useDispatch } from "react-redux";
import { createWorkEntry } from "@root/redux/actions/AddWorkActions";
import { getCustomers } from "@root/redux/actions/customerActions";

// Mock Data
const mockCustomers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const mockWorkItems = [
  { id: 1, name: "Painting", unit: "sqft", price: 12 },
  { id: 2, name: "Plumbing", unit: "hour", price: 25 },
];

const AddWorkForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    customer: null,
    requestDate: new Date(),
    source: "",
    notes: "",
    nextProcess: "",
  });

  const [Works, setWorks] = useState([
    {
      service: null,
      unitOfMeasure: "",
      unitPrice: "",
      qty: "",
      totalValue: "",
    },
  ]);

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    const value = e?.target?.value ?? e;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWorkLineChange = (index, field, value) => {
    const updatedLines = [...Works];
    updatedLines[index][field] = value;
    setWorks(updatedLines);
  };

  const addWorkLine = () => {
    setWorks([
      ...Works,
      {
        service: null,
        unitOfMeasure: "",
        unitPrice: "",
        qty: "",
        totalValue: "",
      },
    ]);
  };

  const removeWorkLine = (index) => {
    const updatedLines = Works.filter((_, i) => i !== index);
    setWorks(updatedLines);
  };

  const handleSubmit = async (e) => {
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
      Works: Works.map((w) => ({
        serviceId: w.service?.id,
        unitOfMeasure: w.unitOfMeasure,
        unitPrice: parseFloat(w.unitPrice),
        qty: w.qty,
        totalValue: parseFloat(w.totalValue),
      })),
    };

    const result = await dispatch(createWorkEntry(payload));
    if (result) {
      navigate("/works");
    }
  };

  return (
    <HeaderContainer header="Add Work" addButton={false} divider>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <FormDatePicker
            label="Date"
            name="requestDate"
            value={formData.requestDate}
            onChange={(name, value) =>
              handleChange("requestDate")({ target: { value } })
            }
            errorText={errors.requestDate}
            size={{ md: 6, xs: 12 }}
          />
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

          {Works.map((line, index) => (
            <Grid
              size={{ xs: 12, md: 12 }}
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
              <Grid size={{ xs: 6, md: 2 }}>
                <FormAutoComplete
                  name={`service-${index}`}
                  label="Service"
                  options={mockWorkItems}
                  value={line.service}
                  onChange={(e, value) => {
                    handleWorkLineChange(index, "service", value);
                    handleWorkLineChange(
                      index,
                      "unitOfMeasure",
                      value?.unit || ""
                    ); // if service has unit
                    handleWorkLineChange(
                      index,
                      "unitPrice",
                      value?.price || ""
                    );
                  }}
                  getOptionLabel={(option) => option?.name || ""}
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value?.id
                  }
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 6, md: 2 }}>
                <FormAutoComplete
                  label="Unit of Measure"
                  options={[line.unitOfMeasure].filter(Boolean)}
                  value={line.unitOfMeasure}
                  getOptionLabel={(option) => option}
                  freeSolo={false}
                  disableClearable
                  disabled
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 6, md: 2 }}>
                <FormAutoComplete
                  label="Unit Price"
                  options={[line.unitPrice].filter(Boolean)}
                  value={line.unitPrice}
                  onChange={(e, value) =>
                    handleWorkLineChange(index, "unitPrice", value)
                  }
                  getOptionLabel={(option) => option.toString()}
                  freeSolo
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 6, md: 2 }}>
                <FormTextField
                  label="Qty"
                  value={line.qty}
                  onChange={(e) =>
                    handleWorkLineChange(index, "qty", e.target.value)
                  }
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 6, md: 2 }}>
                <FormTextField
                  label="Total Value"
                  value={line.totalValue}
                  onChange={(e) =>
                    handleWorkLineChange(index, "totalValue", e.target.value)
                  }
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 6, md: 2 }}>
                <IconButton
                  color="error"
                  onClick={() => removeWorkLine(index)}
                  disabled={Works.length === 1}
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
            name="nextProcess"
            label="Next Process"
            options={["Site inception", "Enquiry", "Work Order"]}
            value={formData.nextProcess || ""}
            onChange={(e, value) =>
              handleChange("nextProcess")({ target: { value: value || "" } })
            }
            errorText={errors.nextProcess}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
          />

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
