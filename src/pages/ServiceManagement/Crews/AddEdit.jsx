// AddEditCrew.jsx
import React, { useEffect, useState } from "react";
import { Grid, Button, Select, MenuItem } from "@mui/material";
import HeaderContainer from "@components/DashboardLayout/container";
import FormContainer from "@components/FormContainer";
import FormTextField from "@components/FormTextField";
import { useParams, useNavigate } from "react-router-dom";
import {
  isRequired,
  combineValidators,
  isValidEmail,
  isValidPhone,
  validate,
} from "@root/utils/validators";
import { countryCodes } from "@root/helpers/utils";
import { createCrew, getCrewById, updateCrew } from "@root/redux/actions/crewActions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const AddEditCrew = () => {
  const initialData = {
    // employeeNo: "",
    name: "",
    jobTitle: "",
    department: "",
    email: "",
    countryCode: "+971",
    mobileNumber: "",
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
      dispatch(getCrewById(id)).then((res) => {
        const crew = res.data;
        const { countryCode, mobileNumber } = splitPhoneNumber(crew.phone);
        setFormData({
        //   employeeNo: crew.employeeNo,
          name: crew.name,
          jobTitle: crew.jobTitle,
          department: crew.department,
          email: crew.email,
          countryCode,
          mobileNumber,
        });
      });
    }
  }, [id, dispatch]);

  const validatorMap = {
    // employeeNo: isRequired,
    name: isRequired,
    jobTitle: isRequired,
    department: isRequired,
    email: combineValidators(isRequired, isValidEmail),
    mobileNumber: combineValidators(isRequired, isValidPhone),
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    const error = validate({ ...formData, [field]: value }, validatorMap)[field];
    setErrors((prev) => ({ ...prev, [field]: error || "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(formData, validatorMap);
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    const payload = {
    //   employeeNo: formData.employeeNo,
      name: formData.name,
      jobTitle: formData.jobTitle,
      department: formData.department,
      email: formData.email,
      phone: formData.countryCode + formData.mobileNumber,
    };

    try {
      const res = id
        ? await dispatch(updateCrew(id, payload))
        : await dispatch(createCrew(payload));

      if (res) {
        toast.success(id ? "Crew updated successfully" : "Crew created successfully");
        navigate(-1);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <HeaderContainer
      header={id ? "Edit Crew" : "Create Crew"}
      addButton={false}
      divider
    >
      <form onSubmit={handleSubmit}>
        <CrewForm
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      </form>
    </HeaderContainer>
  );
};

const CrewForm = ({ formData, handleChange, errors }) => {
  const navigate = useNavigate();

  return (
    <FormContainer>
      {/* <FormTextField
        name="Employee No"
        value={formData.employeeNo}
        onChange={handleChange("employeeNo")}
        size={{ md: 6, xs: 12 }}
        errorText={errors.employeeNo}
      /> */}

      <FormTextField
        name="Name"
        value={formData.name}
        onChange={handleChange("name")}
        size={{ md: 6, xs: 12 }}
        errorText={errors.name}
      />

      <FormTextField
        name="Job Title"
        value={formData.jobTitle}
        onChange={handleChange("jobTitle")}
        size={{ md: 6, xs: 12 }}
        errorText={errors.jobTitle}
      />

      <FormTextField
        name="Department"
        value={formData.department}
        onChange={handleChange("department")}
        size={{ md: 6, xs: 12 }}
        errorText={errors.department}
      />

      <FormTextField
        name="Email"
        value={formData.email}
        onChange={handleChange("email")}
        size={{ md: 6, xs: 12 }}
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

export default AddEditCrew;