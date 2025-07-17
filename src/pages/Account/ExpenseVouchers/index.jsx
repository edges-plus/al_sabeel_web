import React, { useState, useEffect, useRef } from "react";
import { Grid, Button } from "@mui/material";
import HeaderContainer from "@components/DashboardLayout/Container";
import FormTextField from "@components/FormTextField";
import FormAutoComplete from "@components/FormAutoComplete";
import FormContainer from "@components/FormContainer";
import FormDatePicker from "@components/FormDatePicker";
import { isRequired } from "@root/utils/validators";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getLedgerOptions,
  clearLedgerOptions,
} from "@root/redux/actions/accountActions";

import { createJournalEntry } from "@root/redux/actions/journalEntry.actions";

import dayjs from "dayjs";

const Index = () => {
  const initialData = {
    date: dayjs(),
    expenseType: "",
    selectedExpenseType: null,
    amount: "",
    narration: "",
    paymentMode: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validatorMap = {
    date: isRequired,
    expenseType: isRequired,
    amount: isRequired,
    paymentMode: isRequired,
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

    // Submit logic here
    const amt = parseFloat(formData.amount);

    const payload = {
      date: new Date(formData.date).toISOString().split("T")[0],
      description: formData.narration,
      type: "ExpenseVoucher",

      lines: [
        {
          ledgerId: formData.selectedExpenseType.id,
          description: formData.narration,
          debit: amt,
          credit: 0,
        },
        {
          ledgerId: formData.paymentMode.id,
          description: formData.narration,
          debit: 0,
          credit: amt,
        },
      ],
    };

    dispatch(createJournalEntry(payload)).then((res) => {
      if (res) {
        // Close or navigate back on success
        navigate(-1);
      }
    });

  };

  return (
    <HeaderContainer
      header={id ? "Edit Expense Voucher" : "Add Expense Voucher"}
      addButton={false}
      divider={true}
    >
      <form onSubmit={handleSubmit}>
        <ExpenseVoucherForm
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

const ExpenseVoucherForm = ({
  formData,
  setFormData,
  handleChange,
  errors,
  setErrors,
}) => {
  const dateRef = useRef();
  const expenseTypeRef = useRef();
  const amountRef = useRef();
  const paymentModeRef = useRef();
  const narrationRef = useRef();
  const dispatch = useDispatch();
  const expenseTypeOptions = useSelector(
    (state) => state.account.fromOptions || []
  );

  const paymentModes = useSelector(
    (state) => state.account.paymentModeOptions || []
  );
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLedgerOptions("from", { search: inputValue, type: "Expense" }));
  }, [inputValue]);

  useEffect(() => {
    dispatch(getLedgerOptions("paymentMode", { searchType: "paymentMode" }));
  }, []);

  const onSelectExpenseType = (event, value) => {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        expenseType: value.id,
        selectedExpenseType: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        expenseType: "",
        selectedExpenseType: null,
      }));
    }

    if (errors.expenseType) {
      setErrors((prev) => ({
        ...prev,
        expenseType: "",
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
        inputRef={dateRef}

      />

      <FormAutoComplete
        name="expenseType"
        value={formData.selectedExpenseType}
        getOptionLabel={(option) => option?.name || ""}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        onChange={onSelectExpenseType}
        onInputChange={(event, value) => setInputValue(value)}
        loading={false}
        options={expenseTypeOptions}
        size={{ md: 6, xs: 12 }}
        label="Expense Type"
        errorText={errors.expenseType}
        inputRef={expenseTypeRef}

      />

      <FormTextField
        name="amount"
        label="Amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        size={{ md: 6, xs: 12 }}
        errorText={errors.amount}
        inputRef={amountRef}

      />

      <FormAutoComplete
        name="paymentMode"
        value={formData.paymentMode || null}
        options={paymentModes}
        getOptionLabel={(option) => option.name || ""}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        onChange={(event, value) => {
          setFormData((prev) => ({
            ...prev,
            paymentMode: value || "",
          }));
          if (errors.paymentMode) {
            setErrors((prev) => ({
              ...prev,
              paymentMode: "",
            }));
          }
        }}
        onInputChange={() => { }}
        loading={false}
        size={{ md: 6, xs: 12 }}
        label="Mode of Payment"
        errorText={errors.paymentMode}
        inputRef={paymentModeRef}

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
        inputRef={narrationRef}
   
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
