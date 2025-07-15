import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import HeaderContainer from "@components/DashboardLayout/container";
import FormContainer from "@components/FormContainer";
import FormTextField from "@components/FormTextField";
import FormAutoComplete from "@components/FormAutoComplete";
import { isRequired } from "@root/utils/validators";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  getLedgerOptions,
  clearLedgerOptions,
} from "@root/redux/actions/accountActions";
import FormDatePicker from "@components/FormDatePicker";
import { createJournalEntry } from "@root/redux/actions/journalEntry.actions";

const Index = () => {
  const initialData = {
    date: dayjs(),
    customer: "",
    selectedCustomer: null,
    product: "",
    selectedProduct: null,
    amount: "",
    modeOfCollection: "",
    selectedCollectionMode: null,
    narration: "",
  };

  const [formData, setFormData] = useState(initialData);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const validatorMap = {
    date: isRequired,
    customer: isRequired,
    product: isRequired,
    amount: isRequired,
    modeOfCollection: isRequired,
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
      description: formData.narration || "Other Sale",
      type: "OtherSale",
      lines: [
        {
          ledgerId: formData.selectedProduct.id,
          description: formData.narration,
          debit: 0,
          credit: amt,
        },
        {
          ledgerId: formData.selectedCustomer.id,
          description: formData.narration,
          debit: amt,
          credit: 0,
        },
        {
          ledgerId: formData.selectedCustomer.id,
          description: formData.narration,
          debit: 0,
          credit: amt,
        },
        {
          ledgerId: formData.selectedCollectionMode.id,
          description: formData.narration,
          debit: amt,
          credit: 0,
        },
      ],
    };

    dispatch(createJournalEntry(payload)).then((res) => {
      if (res) {
        setFormData(initialData);
        navigate(-1); 
      }
    });
  };

  return (
    <HeaderContainer
      header={id ? "Edit Other Sale" : "Add Other Sale"}
      addButton={false}
      divider={true}
    >
      <form onSubmit={handleSubmit}>
        <OtherSalesFormFields
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

const OtherSalesFormFields = ({
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
  const paymentModeOptions = useSelector(
    (state) => state.account.paymentModeOptions || []
  );

  const [customerInput, setCustomerInput] = useState("");
  const [productInput, setProductInput] = useState("");
  const [paymentInput, setPaymentInput] = useState("");


  useEffect(() => {
      dispatch(getLedgerOptions("from", { search: customerInput }));
  }, [customerInput]);

  useEffect(() => {
      dispatch(getLedgerOptions("to", { search: productInput }));
  }, [productInput]);

  useEffect(() => {
    dispatch(getLedgerOptions("paymentMode", { searchType: "paymentMode" }));
  }, []);

  const handleSelectCustomer = (e, value) => {
    setFormData((prev) => ({
      ...prev,
      customer: value?.id || "",
      selectedCustomer: value || null,
    }));
    if (errors.customer) setErrors((prev) => ({ ...prev, customer: "" }));
  };

  const handleSelectProduct = (e, value) => {
    setFormData((prev) => ({
      ...prev,
      product: value?.id || "",
      selectedProduct: value || null,
    }));
    if (errors.product) setErrors((prev) => ({ ...prev, product: "" }));
  };

  const handleSelectPaymentMode = (e, value) => {
    setFormData((prev) => ({
      ...prev,
      modeOfCollection: value?.id || "",
      selectedCollectionMode: value || null,
    }));
    if (errors.modeOfCollection)
      setErrors((prev) => ({ ...prev, modeOfCollection: "" }));
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
        name="customer"
        label="Customer"
        value={formData.selectedCustomer}
        onChange={handleSelectCustomer}
        onInputChange={(e, value) => setCustomerInput(value)}
        options={fromOptions}
        getOptionLabel={(option) => option?.name || ""}
        size={{ md: 6, xs: 12 }}
        errorText={errors.customer}
      />

      <FormAutoComplete
        name="product"
        label="Product"
        value={formData.selectedProduct}
        onChange={handleSelectProduct}
        onInputChange={(e, value) => setProductInput(value)}
        options={toOptions}
        getOptionLabel={(option) => option?.name || ""}
        size={{ md: 6, xs: 12 }}
        errorText={errors.product}
      />

       <FormAutoComplete
        name="modeOfCollection"
        label="Mode of Collection"
        value={formData.selectedCollectionMode}
        onChange={handleSelectPaymentMode}
        onInputChange={(e, value) => setPaymentInput(value)}
        options={paymentModeOptions}
        getOptionLabel={(option) => option?.name || ""}
        size={{ md: 6, xs: 12 }}
        errorText={errors.modeOfCollection}
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
        multiline
        rows={2}
        size={{ md: 12, xs: 12 }}
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
