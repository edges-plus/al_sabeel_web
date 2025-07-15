import React, { useState, useEffect, useCallback } from "react";
import { Grid, Button, MenuItem } from "@mui/material";
import HeaderContainer from "@components/DashboardLayout/container";
import FormContainer from "@components/FormContainer";
import FormTextField from "@components/FormTextField";
import FormAutoComplete from "@components/FormAutoComplete";
import { isRequired } from "@root/utils/validators";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import debounce from 'lodash.debounce';
import {
  createLedgerGroup,
  resetLedgerGroupForm,
  updateFormField,
  fetchUnderGroups,
  clearUnderGroups,
  initEditLedger,
  initFromParent,
  updateLedger
} from "@root/redux/actions/ledgerAction";
const Index = () => {
  const formData = useSelector((state) => state.ledger.formData);
  const underOptions = useSelector((state) => state.ledger.underOptions);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const parent_id = query.get("parent_id");
  const id = query.get("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  // Define validation rules for each field
  const validatorMap = {
    ledgerName: isRequired,
    under: isRequired,
    code: isRequired,
    currency: isRequired,
    conversionRate: (value) => {
      if (formData.currency !== "AED" && !value) {
        return "Conversion rate is required when currency is not AED";
      }
      return null;
    },
  };

  // Validation function
  const validate = (formData) => {
    const errors = {};
    Object.keys(validatorMap).forEach((field) => {
      const validator = validatorMap[field];
      const error = validator(formData[field]);
      if (error) errors[field] = error;
    });
    return errors;
  };
  useEffect(() => {
    if (id) {
      dispatch(initEditLedger(id));
    } else if (parent_id) {
      dispatch(initFromParent(parent_id));
    } else {
      dispatch(resetLedgerGroupForm());
    }
  }, [dispatch, id, parent_id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormField(name, value));

    // Clear error for this field if needed
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      console.log("Validation errors:", newErrors);
      
      return;
    }

    if (!window.confirm("Are you sure you want to submit this form?")) {
      return;
    }

    const payload = {
      code: formData.code,
      name: formData.ledgerName,
      type: formData.type,
      group_type: formData.group_type || null,
      financial_statement: formData.financialStatement,
      parent_id: formData.under ? formData.under.id : null,
      is_group: false,
      currency: formData.currency || 'AED',
      conversion_rate: formData.conversionRate || "1",
    };
    

    if (id) {
      payload.id = id;
      dispatch(updateLedger(payload))
        .then((res) => {
          if (res) {
            navigate(-1);
          }
        });
    } else {
      dispatch(createLedgerGroup(payload))
        .then((res) => {
          if (res) {
            navigate(-1);
          }
        });
    }
  };

  return (
    <HeaderContainer
      header={id ? "Edit Ledger" : "Create Ledger"}
      addButton={false}
      divider={true}
    >
      <form onSubmit={handleSubmit}>
        <LedgerFormFields
          formData={formData}
          underOptions={underOptions}
          handleChange={handleChange}
          errors={errors}
        />
        <Grid container spacing={2}>
          <Grid  >
            <Button type="submit" variant="contained" color="primary">
              {id ? "Update" : "Save"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 2 }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </HeaderContainer>
  );
};

const LedgerFormFields = ({ formData, underOptions, handleChange, errors }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.length >= 2) {
        dispatch(fetchUnderGroups(query));
      } else {
        dispatch(clearUnderGroups());
      }
    }, 300),
    [dispatch]
  );
  useEffect(() => {
    debouncedSearch(inputValue);
    return debouncedSearch.cancel;
  }, [inputValue, debouncedSearch]);

  const showGroupType = formData.type === 'Revenue' || formData.type === 'Expense';

  return (
    <FormContainer>
      <FormTextField
        name="code"
        label="Code"
        value={formData.code || ""}
        onChange={handleChange}
        placeholder="Enter Code"
        size={{ md: 6, xs: 12 }}
        errorText={errors.code}
      />

      <FormTextField
        name="ledgerName"
        label="Ledger Name"
        value={formData.ledgerName}
        onChange={handleChange}
        placeholder="Enter Ledger Name"
        size={{ md: 6, xs: 12 }}
        errorText={errors.ledgerName}
      />
      <FormAutoComplete
        name="under"
        value={formData.under || null}
        getOptionLabel={(option) => option?.name || ""}
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return <li key={key} {...rest}>{option.name}</li>;
        }}
        onInputChange={(event, value) => setInputValue(value)}

        onChange={(event, value) => {
          dispatch(updateFormField('under', value));
        }}
        options={underOptions}
        size={{ md: 6, xs: 12 }}
        label="Under"
        required={false}
      />
      <FormAutoComplete
        name="type"
        disabled={formData.under !== null}
        value={formData.type || null}
        getOptionLabel={(option) => option || ""}

        options={[]}
        size={{ md: 6, xs: 12 }}
        label="Type"
        errorText={errors.type}
      />

      <FormTextField
        disabled={true}
        name="financialStatement"
        label="Financial Statement"
        value={formData.financialStatement || ""}
        size={{ md: 6, xs: 12 }}
        InputProps={{
          readOnly: true,
        }}
      />

      {showGroupType && (
        <FormAutoComplete
          disabled={true}
          name="groupType"
          value={formData.group_type || null}
          getOptionLabel={(option) => option || ""}


          options={[]}
          size={{ md: 6, xs: 12 }}
          label="Group Type"
        />
      )}
      {/* <FormAutoComplete
        name="currency"
        value={formData.currency }
        getOptionLabel={(option) => option || ""}
        onChange={(event, value) => {
          dispatch(updateFormField('currency', value));
          if (value === "AED") {
            dispatch(updateFormField('conversionRate', "1"));
          }else{
                dispatch(updateFormField('conversionRate', ""));
          }
        }}
        errorText={errors.currency}
        options={["AED", "$"]}
        size={{ md: 6, xs: 12 }}
        label="Currency"
      /> */}
{/* 
      {formData.currency && formData.currency !== "AED" && (
        <FormTextField
          name="conversionRate"
          label="Conversion Rate to AED"
          value={formData.conversionRate || ""}
          onChange={handleChange}
          placeholder="Enter conversion rate"
          size={{ md: 6, xs: 12 }}
          type="number"
          errorText={errors.conversionRate}

          InputProps={{
            inputProps: { min: "0", step: "0.001" }
          }}
        />
      )} */}
    </FormContainer>
  );
};

export default Index;

