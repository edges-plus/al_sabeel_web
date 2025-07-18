import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Button, Grid ,Select,MenuItem} from "@mui/material";
import HeaderContainer from "@components/DashboardLayout/Container";
import FormContainer from "@components/FormContainer";
import FormTextField from "@components/FormTextField";
import FormAutoComplete from "@components/FormAutoComplete";
import { countryCodes } from "@root/helpers/utils";
import { isRequired, validate,  combineValidators,isValidEmail,isValidPhone } from "@root/utils/validators";
import { createCustomer, updateCustomer,getCustomer } from "@root/redux/actions/customerActions";


const AddCustomer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const initialState = {
    customerType: "",
    companyName: "",
    contactPerson: "",
    email: "",
    countryCode: "+971",
    address: "",
    landMark: "",
    permissions: "",
    remarks: "",
    phone:""
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validatorMap = {
    customerType: isRequired,
    companyName: isRequired,
    contactPerson: isRequired,
    email: combineValidators(isRequired, isValidEmail),
   phone: combineValidators(isRequired, isValidPhone),
    address: isRequired,
  };


     useEffect(() => {
    const getCustomerById = async () => {
      const result = await  dispatch(getCustomer(id));
    setFormData(result?.data)
     
    };
  
  getCustomerById();
  }, []);
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    const fieldError = validate(updated, validatorMap)[field] || "";
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to save this customer?")) return;

    const newErrors = validate(formData, validatorMap);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      if (id) {
        await dispatch(updateCustomer(id, formData));
      } else {
        await dispatch(createCustomer(formData));
      }

      navigate("/CRM/Customers");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <HeaderContainer
      header={id ? "Edit Customer" : "Add Customer"}
      addButton={false}
      divider
    >
      <form onSubmit={handleSubmit}>
        <CustomerFormFields
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
      </form>
    </HeaderContainer>
  );
};

const CustomerFormFields = ({ formData, errors, handleChange }) => {
  const navigate = useNavigate();

  return (
    <FormContainer>
      <FormAutoComplete
        name="customerType"
        label="Customer Type"
        value={formData.customerType}
        onChange={(e, value) => handleChange("customerType")({ target: { value } })}
        options={["Institutional", "B2B", "Individual"]}
        size={{ md: 6, xs: 12 }}
        errorText={errors.customerType}
      />

      <FormTextField
        name="companyName"
        label="Company Name"
        value={formData.companyName}
        onChange={handleChange("companyName")}
        size={{ md: 6, xs: 12 }}
        errorText={errors.companyName}
      />

      <FormTextField
        name="contactPerson"
        label="Contact Person"
        value={formData.contactPerson}
        onChange={handleChange("contactPerson")}
        size={{ md: 6, xs: 12 }}
        errorText={errors.contactPerson}
      />

      <FormTextField
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange("email")}
        size={{ md: 6, xs: 12 }}
        errorText={errors.email || ""}
      />

      <Grid size={{ md: 6, xs: 12 }}>
        <FormTextField
            name="Mobile Number"
            value={formData.phone}
            onChange={handleChange("phone")}
            placeholder="Enter mobile number"
            errorText={errors.phone || ""}
            shrink={true}
            prefix={
            <Select
                value={formData.countryCode}
                onChange={handleChange("countryCode")}
                variant="standard"
                disableUnderline
                renderValue={(selected) => selected}
                sx={{ fontSize: "0.875rem", minWidth: "60px" }}
            >
                {countryCodes.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                    {country.code} {country.country}
                </MenuItem>
                ))}
            </Select>
            }
        />
        </Grid>

      <FormTextField
        name="address"
        label="Address"
        value={formData.address}
        onChange={handleChange("address")}
        size={{ md: 6, xs: 12 }}
        errorText={errors.address}
        multiline
        rows={2}
      />

      <FormTextField
        name="landMark"
        label="Landmark"
        value={formData.landMark}
        onChange={handleChange("landMark")}
        size={{ md: 6, xs: 12 }}
        multiline
        rows={2}
      />

      <FormTextField
        name="permissions"
        label="Permissions"
        value={formData.permissions}
        onChange={handleChange("permissions")}
        size={{ md: 6, xs: 12 }}
        placeholder="e.g., security pass, ID check, etc."
        multiline
        rows={2}
      />

      <FormTextField
        name="remarks"
        label="Remarks"
        value={formData.remarks}
        onChange={handleChange("remarks")}
        multiline
        rows={2}
        size={{ md: 12, xs: 12 }}
      />

      <Grid size={12} sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
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
  );
};

export default AddCustomer;
