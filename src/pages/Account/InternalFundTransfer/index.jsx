import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import HeaderContainer from "@components/DashboardLayout/Container";
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
    fromAccount: "",
    selectedFromAccount: null,
    toAccount: "",
    selectedToAccount: null,
    amount: "",
    narration: "",
  };

  const [formData, setFormData] = useState(initialData);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const validatorMap = {
    date: isRequired,
    fromAccount: isRequired,
    toAccount: isRequired,
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
      setErrors((prev) => ({ ...prev, [name]: "" }));
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

    const amount = parseFloat(formData.amount);

    const payload = {
      date: new Date(formData.date).toISOString().split("T")[0],
      description: formData.narration,
      type: "InternalFundTransfer",
      lines: [
        {
          ledgerId: formData.selectedFromAccount.id,
          description: formData.narration,
          debit: 0,
          credit: amount,
        },
        {
          ledgerId: formData.selectedToAccount.id,
          description: formData.narration,
          debit: amount,
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
      header={id ? "Edit Internal Fund Transfer" : "Add Internal Fund Transfer"}
      addButton={false}
      divider={true}
    >
      <form onSubmit={handleSubmit}>
        <InternalTransferFormFields
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

const InternalTransferFormFields = ({
  formData,
  setFormData,
  handleChange,
  errors,
  setErrors,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fromOptions = useSelector((state) => state.account.fromOptions || []);
  const toOptions = useSelector((state) => state.account.toOptions || []);

  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");

  useEffect(() => {
      dispatch(getLedgerOptions("from", { search: fromInput }));
  }, [fromInput]);

  useEffect(() => {
      dispatch(getLedgerOptions("to", { search: toInput }));
  }, [toInput]);

  const onSelectFromAccount = (event, value) => {
    setFormData((prev) => ({
      ...prev,
      fromAccount: value?.id || "",
      selectedFromAccount: value || null,
    }));
    if (errors.fromAccount) {
      setErrors((prev) => ({ ...prev, fromAccount: "" }));
    }
  };

  const onSelectToAccount = (event, value) => {
    setFormData((prev) => ({
      ...prev,
      toAccount: value?.id || "",
      selectedToAccount: value || null,
    }));
    if (errors.toAccount) {
      setErrors((prev) => ({ ...prev, toAccount: "" }));
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
        name="fromAccount"
        label="From Account"
        value={formData.selectedFromAccount}
        onChange={onSelectFromAccount}
        onInputChange={(e, value) => setFromInput(value)}
        options={fromOptions}
        getOptionLabel={(option) => option?.name || ""}
        size={{ md: 6, xs: 12 }}
        errorText={errors.fromAccount}
      />

      <FormAutoComplete
        name="toAccount"
        label="To Account"
        value={formData.selectedToAccount}
        onChange={onSelectToAccount}
        onInputChange={(e, value) => setToInput(value)}
        options={toOptions}
        getOptionLabel={(option) => option?.name || ""}
        size={{ md: 6, xs: 12 }}
        errorText={errors.toAccount}
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
