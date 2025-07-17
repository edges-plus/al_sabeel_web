import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import FormTextField from "@components/FormTextField";
import FormAutoComplete from "@components/FormAutoComplete";

const ToolConsumableModal = ({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  errors,
  isEdit = false,
}) => {
  const types = ["Tool", "Consumable"];

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit" : "Add"} Tool / Consumable</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} mt={0.5}>
          <FormTextField
            label="Name"
            value={formData.name}
            onChange={handleChange("name")}
            size={{ md: 6, xs: 12 }}
            errorText={errors.name}
          />

          <FormAutoComplete
            name="type"
            label="Type"
            value={formData.type}
            onChange={(e, value) => handleChange("type")({ target: { value } })}
            options={types}
            size={{ md: 6, xs: 12 }}
            errorText={errors.type}
          />

          <FormTextField
            label="Description"
            value={formData.description}
            onChange={handleChange("description")}
            multiline
            rows={2}
            size={{ md: 12, xs: 12 }}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          {isEdit ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ToolConsumableModal;
