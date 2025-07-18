import React, { useEffect, useState } from "react";
import { Grid, Button, Select, MenuItem } from "@mui/material";
import HeaderContainer from "@components/DashboardLayout/container";
import FormContainer from "@components/FormContainer";
import FormTextField from "@components/FormTextField";
import FormAutoComplete from "@components/FormAutoComplete";
import { useParams, useNavigate } from "react-router-dom";
import {
  isRequired,
  combineValidators,
  isValidEmail,
  isValidPhone,
  validate,
} from "@root/utils/validators";
import { countryCodes } from "@root/helpers/utils";
import { createUser, getUserById, updateUser } from "@root/redux/actions/userManagementActions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Staff", value: "staff" },
];

const AddEditUser = () => {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    countryCode: "+971",
    mobileNumber: "",
    userRole: null,
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const splitPhoneNumber = (fullPhone) => {
    const country = countryCodes.find(c => fullPhone.startsWith(c.code));
    return country
      ? { countryCode: country.code, mobileNumber: fullPhone.slice(country.code.length) }
      : { countryCode: "+971", mobileNumber: fullPhone };
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id)).then((res) => {
        const user = res.data;
        const { countryCode, mobileNumber } = splitPhoneNumber(user.phone);
        setFormData({
          name: user.name,
          email: user.email,
          userRole: roleOptions.find(role => role.value === user.userRole),
          countryCode,
          mobileNumber,
        });
      });
    }
  }, [id, dispatch]);

  const validatorMap = {
    name: isRequired,
    email: combineValidators(isRequired, isValidEmail),
    mobileNumber: combineValidators(isRequired, isValidPhone),
    userRole: isRequired,
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    const error = validate({ ...formData, [field]: value }, validatorMap)[field];
    setErrors((prev) => ({ ...prev, [field]: error || "" }));
  };

  const handleRoleChange = (_, value) => {
    setFormData((prev) => ({ ...prev, userRole: value }));
    setErrors((prev) => ({ ...prev, userRole: value ? "" : "Role is required" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(formData, validatorMap);
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.countryCode + formData.mobileNumber,
      userRole: formData.userRole.value,
    };

    try {
      const res = id
        ? await dispatch(updateUser(id, payload))
        : await dispatch(createUser(payload));

      if (res) {
        toast.success(id ? "User updated successfully" : "User created successfully");
        navigate(-1);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <HeaderContainer
      header={id ? "Edit User" : "Create User"}
      addButton={false}
      divider
    >
      <form onSubmit={handleSubmit}>
        <UserForm
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleRoleChange={handleRoleChange}
          errors={errors}
        />
      </form>
    </HeaderContainer>
  );
};

const UserForm = ({ formData, handleChange, handleRoleChange, errors }) => {
  const navigate = useNavigate();

  return (
    <FormContainer>
      <FormTextField
        name="name"
        value={formData.name}
        onChange={handleChange("name")}
        size={{ md: 6, xs: 12 }}
        placeholder="Enter full name"
        errorText={errors.name}
      />

      <FormTextField
        name="Email"
        value={formData.email}
        onChange={handleChange("email")}
        size={{ md: 6, xs: 12 }}
        placeholder="Enter email address"
        errorText={errors.email}
      />

      <FormTextField
        name="Mobile Number"
        value={formData.mobileNumber}
        onChange={handleChange("mobileNumber")}
        size={{ md: 6, xs: 12 }}
        placeholder="Enter mobile number"
        errorText={errors.mobileNumber}
        shrink
        prefix={
          <Select
            value={formData.countryCode}
            onChange={handleChange("countryCode")}
            variant="standard"
            disableUnderline
            renderValue={(selected) => selected}
            sx={{ fontSize: "0.875rem", minWidth: "60px" }}
          >
            {countryCodes.map((c) => (
              <MenuItem key={c.code} value={c.code}>
                {c.code} {c.country}
              </MenuItem>
            ))}
          </Select>
        }
      />

      <FormAutoComplete
        name="role"
        label="User Role"
        value={formData.userRole}
        onChange={handleRoleChange}
        options={roleOptions}
        getOptionLabel={(option) => option?.label || ""}
        size={{ md: 6 }}
        errorText={errors.userRole}
      />

      <Grid size={12} sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
        <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Grid>
    </FormContainer>
  );
};

export default AddEditUser;
