import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import HeaderContainer from "@components/DashboardLayout/container";
import FormContainer from "@components/FormContainer";
import FormTextField from "@components/FormTextField";
import FormAutoComplete from "@components/FormAutoComplete";
import FormDatePicker from "@components/FormDatePicker";
import { isRequired } from "@root/utils/validators";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import {
  getLedgerOptions,
  clearLedgerOptions,
} from "@root/redux/actions/accountActions";
import { createJournalEntry } from "@root/redux/actions/journalEntry.actions";

const Index = () => {
  const initialData = {
    date: dayjs(),
    provisions: "",
    selectedProvisionsLedger: null,
    expense: "",
    selectedExpenseLedger: null,
    amount: "",
    narration: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validatorMap = {
    date: isRequired,
    provisions: isRequired,
    expense: isRequired,
    amount: isRequired,
    narration: isRequired,
  };

  const validate = (formData) => {
    const errors = {};
    Object.keys(validatorMap).forEach((field) => {
      const validator = validatorMap[field];
      const error = validator(formData[field]);
      if (error) errors[field] = error;
    });
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
    if (Object.keys(newErrors).length > 0) return;

    if (!window.confirm("Are you sure you want to submit this form?")) {
      return;
    }

    const amt = parseFloat(formData.amount);
    const payload = {
      date: new Date(formData.date).toISOString().split("T")[0],
      description: formData.narration,
      type: "ClosingEntry",
      lines: [
        {
          ledgerId: formData.selectedProvisionsLedger.id,
          description: formData.narration,
          debit: 0,
          credit: amt,
        },
        {
          ledgerId: formData.selectedExpenseLedger.id,
          description: formData.narration,
          debit: amt,
          credit: 0,
        },
      ],
    };
    dispatch(createJournalEntry(payload)).then((res) => {
      if (res) {
        navigate(-1);
      }
    });
  };

  return (
    <HeaderContainer
      header={id ? "Edit Closing Entry" : "Add Closing Entry"}
      addButton={false}
      divider={true}
    >
      <form onSubmit={handleSubmit}>
        <ClosingEntryFormFields
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
          setErrors={setErrors}
        />
      </form>
    </HeaderContainer>
  );
};

const ClosingEntryFormFields = ({
  formData,
  setFormData,
  handleChange,
  errors,
  setErrors,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const provisionsOptions = useSelector((state) => state.account.fromOptions || []);
const expenseOptions = useSelector((state) => state.account.toOptions || []);

  const [provisionsInputValue, setProvisionsInputValue] = useState("");
  const [expenseInputValue, setExpenseInputValue] = useState("");

  useEffect(() => {
      dispatch(getLedgerOptions("from", { search: provisionsInputValue })
    );
  }, [provisionsInputValue]);


  useEffect(() => {
      dispatch(getLedgerOptions("to", { search: expenseInputValue }));
  }, [expenseInputValue]);

  const onSelectProvisionsLedger = (event, value) => {
    setFormData((prev) => ({
      ...prev,
      provisions: value?.id || "",
      selectedProvisionsLedger: value || null,
    }));

    if (errors.provisions) {
      setErrors((prev) => ({
        ...prev,
        provisions: "",
      }));
    }
  };

  const onSelectExpenseLedger = (event, value) => {
    setFormData((prev) => ({
      ...prev,
      expense: value?.id || "",
      selectedExpenseLedger: value || null,
    }));

    if (errors.expense) {
      setErrors((prev) => ({
        ...prev,
        expense: "",
      }));
    }
  };

  const handleDateChange = (name, newValue) => {
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <FormContainer>
      <FormDatePicker
        name="date"
        label="Date"
        value={formData.date}
        onChange={handleDateChange}
        size={{ md: 6, xs: 12 }}
        errorText={errors.date}
      />

      <FormAutoComplete
        name="provisions"
        value={formData.selectedProvisionsLedger}
        getOptionLabel={(option) => option?.name || ""}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        onChange={onSelectProvisionsLedger}
        onInputChange={(event, value) => setProvisionsInputValue(value)}
        loading={false}
        options={provisionsOptions}
        size={{ md: 6, xs: 12 }}
        label="Provisions"
        errorText={errors.provisions}
      />

      <FormAutoComplete
        name="expense"
        value={formData.selectedExpenseLedger}
        getOptionLabel={(option) => option?.name || ""}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        onChange={onSelectExpenseLedger}
        onInputChange={(event, value) => setExpenseInputValue(value)}
        loading={false}
        options={expenseOptions}
        size={{ md: 6, xs: 12 }}
        label="Expense Ledger"
        errorText={errors.expense}
      />

      <FormTextField
        name="amount"
        label="Amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        size={{ md: 6, xs: 12 }}
        errorText={errors.amount}
      />

      <FormTextField
        name="narration"
        label="Narration"
        value={formData.narration}
        onChange={handleChange}
        placeholder="Enter Narration"
        size={{ md: 12, xs: 12 }}
        multiline
        rows={2}
        errorText={errors.narration}
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

export default Index;

