import React, { useState, useEffect, useCallback } from "react";
import { Grid, Button } from "@mui/material";
import HeaderContainer from "@components/DashboardLayout/container";
import FormContainer from "@components/FormContainer";
import FormTextField from "@components/FormTextField";
import FormAutoComplete from "@components/FormAutoComplete";
import { isRequired } from "@root/utils/validators";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce';
import { useLocation } from "react-router-dom";
import {
  createLedgerGroup,
  resetLedgerGroupForm,
  updateFormField,
  fetchUnderGroups,
  clearUnderGroups,
  updateFormFieldType,
  initFromParent,
  initEditLedger,
  updateLedger
} from "@root/redux/actions/ledgerAction";

const Index = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const parent_id = query.get("parent_id");
  const id = query.get("id");
  // Get form data from Redux store
  const formData = useSelector((state) => state.ledger.formData);
  const underOptions = useSelector((state) => state.ledger.underOptions);
  const typeOptions = useSelector((state) => state.ledger.typeOptions);
  const groupTypeOptions = useSelector((state) => state.ledger.groupTypeOptions);

  const [errors, setErrors] = useState({});
  useEffect(() => {
 

    if (id) {
      dispatch(initEditLedger(id));
    } else if (parent_id) {
      dispatch(initFromParent(parent_id));
    }else {
      dispatch(resetLedgerGroupForm());
    }
  }, [dispatch, id,parent_id]);



  const validatorMap = {
    code: isRequired,
    ledgerName: isRequired,
    type: isRequired,
  };

  const validate = (formData) => {
    const errors = {};
    Object.keys(validatorMap).forEach((field) => {
      if (validatorMap[field]) {
        const validator = validatorMap[field];
        const error = validator(formData[field]);
        if (error) errors[field] = error;
      }
    });
    return errors;
  };

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
        is_group: true,
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
      header={id ? "Edit Ledger Group" : "Create Ledger Group"}
      addButton={false}
      divider={true}
    >
      <form onSubmit={handleSubmit}>
        <LedgerGroupFormFields
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          underOptions={underOptions}
          typeOptions={typeOptions}
          groupTypeOptions={groupTypeOptions}
        />
        <Grid  size={12} sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ ml: 2 }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {id ? "Update" : "Save"}
          </Button>
        </Grid>
      </form>
    </HeaderContainer>
  );
};

const LedgerGroupFormFields = ({
  formData,
  handleChange,
  errors,
  underOptions,
  typeOptions,
  groupTypeOptions,

}) => {
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
        label="Ledger Group Name"
        value={formData.ledgerName || ""}
        onChange={handleChange}
        placeholder="Enter Ledger Group Name"
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
        onChange={(event, value) => {
          if (value) {
            dispatch(updateFormFieldType(value));
          }
        }}
        options={typeOptions}
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
          disabled={formData.under !== null}
          name="groupType"
          value={formData.group_type || null}
          getOptionLabel={(option) => option || ""}
        
          onChange={(event, value) => {
            if (value) {
              dispatch(updateFormField('group_type', value));
            } else {
              dispatch(updateFormField('group_type', null));

            }
          }}
          options={groupTypeOptions}
          size={{ md: 6, xs: 12 }}
          label="Group Type"
        />
      )}


    </FormContainer>
  );
};

export default Index;