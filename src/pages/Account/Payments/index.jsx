import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import HeaderContainer from "@components/DashboardLayout/container";
import FormTextField from "@components/FormTextField";
import FormAutoComplete from "@components/FormAutoComplete";
import FormContainer from "@components/FormContainer";
import FormDatePicker from "@components/FormDatePicker";
import { isRequired } from "@root/utils/validators";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import {
  getLedgerOptions,
  clearLedgerOptions,
  getLedgerBalance
} from "@root/redux/actions/accountActions";
import { createJournalEntry } from "@root/redux/actions/journalEntry.actions";

const Index = () => {
  const initialData = {
    date: dayjs(),
    to: "",
    selectedTo: null,
    modeOfPayment: "",
    selectedSource: null,
    balance: 0,
    amount: "",
    dueDate: "",
    roundOff: "",
    narration: "",
  };

  const [formData, setFormData] = useState(initialData);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const validatorMap = {
    date: isRequired,
    to: isRequired,
    modeOfPayment: isRequired,
    amount: isRequired,
    narration: isRequired,
    // dueDate: isRequired,
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

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (!window.confirm("Are you sure you want to submit this form?")) {
      return;
    }

    const amt = parseFloat(formData.amount);

    const roundOffAmount = formData.roundOff !== '' && formData.roundOff !== '0'
      ? parseFloat(formData.roundOff)
      : null;

    const paidAmount = roundOffAmount !== null ? roundOffAmount : amt;
    const roundOffDiff = roundOffAmount !== null ? amt - roundOffAmount : 0;

    const lines = [
      {
        ledgerId: formData.selectedSource.id,
        description: formData.narration,
        debit: 0,
        credit: paidAmount,
      },
      {
        ledgerId: formData.selectedTo.id,
        description: formData.narration,
        debit: amt,
        credit: 0,
      },
    ];




    const payload = {
      date: new Date(formData.date).toISOString().split("T")[0],
      description: formData.narration,
      type: "Payment",
      lines,

      payment: {
        payment_date: new Date(formData.date).toISOString().split("T")[0],
        due_date: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : null,
        amount: paidAmount,
        narration: formData.narration,
        transaction_type: "Payment",
        contact_type: "Ledger",
        contact_id: formData.selectedTo.id,
      },
    };
    if (roundOffDiff !== 0) {
      payload.roundOff = {
        debit: roundOffDiff > 0 ? 0 : Math.abs(roundOffDiff),
        credit: roundOffDiff > 0 ? Math.abs(roundOffDiff) : 0,
      };

    }

    if (formData.dueDate) {
      payload.reminder = {
        type: "DuePayment",
        related_type: "Ledger",
        amount: paidAmount,
        related_id: formData.selectedTo.id,
        reminder_date: new Date(formData.dueDate).toISOString().split("T")[0],
        status: "pending",
        note: formData.narration || "",
      };
    }
    dispatch(createJournalEntry(payload)).then((res) => {
      if (res) {
        navigate(-1);
      }
    });
  };

  return (
    <HeaderContainer
      header={id ? "Edit Payment" : "Add Payment"}
      addButton={false}
      divider={true}
    >
      <form onSubmit={handleSubmit}>
        <PaymentFormFields
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

const PaymentFormFields = ({
  formData,
  setFormData,
  handleChange,
  errors,
  setErrors,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toOptions = useSelector((state) => state.account.fromOptions || []);
  const paymentModeOptions = useSelector(
    (state) => state.account.paymentModeOptions || []
  );

  const [toInput, setToInput] = useState("");
  const [modeOfPaymentInput, setModeOfPaymentInput] = useState("");

  useEffect(() => {
    dispatch(
      getLedgerOptions("from", { search: toInput, })
    );
  }, [toInput]);

  useEffect(() => {
    dispatch(getLedgerOptions("paymentMode", { searchType: "paymentMode" }));
  }, []);

  const onSelectTo = async (event, value) => {
    setFormData((prev) => ({
      ...prev,
      to: value?.id || "",
      selectedTo: value || null,
    }));

    if (value?.id) {

      const response = await dispatch(getLedgerBalance(value.id));
      const balance = response?.balance || 0;

      setFormData((prev) => ({
        ...prev,
        balance: balance,
      }))

      if (errors.to) {
        setErrors((prev) => ({ ...prev, to: "" }));
      }
    }
  }

  const onSelectSource = (event, value) => {
    setFormData((prev) => ({
      ...prev,
      modeOfPayment: value?.id || "",
      selectedSource: value || null,
    }));



    if (errors.modeOfPayment) {
      setErrors((prev) => ({ ...prev, modeOfPayment: "" }));
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
        size={{ md: 4, xs: 12 }}
        errorText={errors.date}
      />

      <FormAutoComplete
        name="to"
        label="To"
        value={formData.selectedTo}
        getOptionLabel={(option) => option?.name || ""}
        onChange={onSelectTo}
        onInputChange={(event, value) => setToInput(value)}
        options={toOptions}
        loading={false}
        size={{ md: 4, xs: 12 }}
        errorText={errors.to}
      />
      <FormTextField
        name="balance"
        label="Ledger Balance"
        type="number"
        value={formData.balance}
        size={{ md: 4, xs: 12 }}
        disabled={true}
      />


      <FormAutoComplete
        name="modeOfPayment"
        label="Mode Of Payment"
        value={formData.selectedSource}
        getOptionLabel={(option) => option?.name || ""}
        onChange={onSelectSource}
        onInputChange={(event, value) => setModeOfPaymentInput(value)}
        options={paymentModeOptions}
        loading={false}
        size={{ md: 6, xs: 12 }}
        errorText={errors.modeOfPayment}
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

      <FormDatePicker
        name="dueDate"
        label="Due Date"
        value={formData.dueDate}
        onChange={handleDateChange}
        size={{ md: 6, xs: 12 }}
        errorText={errors.dueDate}
      />

      <FormTextField
        name="roundOff"
        label="Paid Amount"
        type="number"
        value={formData.roundOff}
        onChange={handleChange}
        size={{ md: 6, xs: 12 }}
        errorText={errors.roundOff}
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

