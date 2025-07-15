import React, { useState, useEffect } from "react";
import { Grid, Button, Checkbox, FormControlLabel } from "@mui/material";
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
    billDate: dayjs(),
    vendor: "",
    selectedVendor: null,
    product: "",
    selectedProduct: null,
    paymentMode: "",
    selectedPaymentMode: null,
    billAmount: "",
    vatAmount: "",
    totalAmount: "",
    billNumber: "",
    narration: "",
  };

  const [formData, setFormData] = useState(initialData);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const validatorMap = {
    billDate: isRequired,
    vendor: isRequired,
    product: isRequired,
    paymentMode: isRequired,
    billAmount: isRequired,
    vatAmount: isRequired,
    billNumber: isRequired,
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

    const billAmount = parseFloat(formData.billAmount || 0);
    const vatAmount = parseFloat(formData.vatAmount || 0);
    const totalAmount = parseFloat(formData.totalAmount || 0);

    const lines = [
      {
        ledgerId: formData.selectedProduct.id,
        description: `Purchase from ${formData.selectedVendor.name}`,
        debit: billAmount,
        credit: 0,
      },
      {
        ledgerId: formData.selectedVendor.id,
        description: `Payable to ${formData.selectedVendor.name}`,
        debit: 0,
        credit: totalAmount,
      }
    
    
    ];
    if(vatAmount!== 0) {
      lines.push(   {
        ledgerId: 22,
        description: `VAT for purchase from ${formData.selectedVendor.name}`,
        debit: vatAmount,
        credit: 0,
      },)}

    if (formData.isPaid) {

      lines.push({
        ledgerId: formData.selectedVendor.id,
        description: `Payment to ${formData.selectedVendor.name}`,
        debit: totalAmount,
        credit: 0,
      });


      lines.push({
        ledgerId: formData.selectedPaymentMode.id,
        description: `Payment via ${formData.selectedPaymentMode.name}`,
        debit: 0,
        credit: totalAmount,
      });
    } 

    const payload = {
      date: new Date(formData.billDate).toISOString().split("T")[0],
      description: formData.narration,
      type: "OtherPurchase",
      lines,
      invoice: {
        invoice_number: formData.billNumber || '', // or generate dynamically
        invoice_date: new Date(formData.billDate),
        due_date: formData.dueDate ? new Date(formData.dueDate) : null,
        amount: totalAmount,
        status: formData.isPaid ? 'paid' : 'unpaid',
        narration: formData.narration,
      }
    };


    dispatch(createJournalEntry(payload)).then((res) => {
      if (res) {
        navigate(-1);
      }
    });
  };

  return (
    <HeaderContainer
      header={id ? "Edit Other Purchase" : "Add Other Purchase"}
      addButton={false}
      divider={true}
    >
      <form onSubmit={handleSubmit}>
        <OtherPurchasesFormFields
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

const OtherPurchasesFormFields = ({
  formData,
  setFormData,
  handleChange,
  errors,
  setErrors,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fromOptions = useSelector((state) => state.account.fromOptions || []);
  const toOptions = useSelector((state) => state.account.toOptions || []);
  const paymentModeOptions = useSelector((state) => state.account.paymentModeOptions || []);

  const [vendorInput, setVendorInput] = useState("");
  const [productInput, setProductInput] = useState("");
  const [paymentInput, setPaymentInput] = useState("");


  useEffect(() => {
    dispatch(getLedgerOptions("from", { search: vendorInput, }));
  }, [vendorInput]);

  useEffect(() => {
    dispatch(getLedgerOptions("to", { search: productInput }));
  }, [productInput]);

  useEffect(() => {
    dispatch(getLedgerOptions("paymentMode", { searchType: "paymentMode" }));
  }, []);

  useEffect(() => {
    const bill = parseFloat(formData.billAmount) || 0;
    const vat = parseFloat(formData.vatAmount) || 0;
    const total = bill + vat;

    setFormData((prev) => ({
      ...prev,
      totalAmount: total.toFixed(2),
    }));
  }, [formData.billAmount, formData.vatAmount]);

  const handleSelectVendor = (e, value) => {
    setFormData((prev) => ({
      ...prev,
      vendor: value?.id || "",
      selectedVendor: value,
    }));
    if (errors.vendor) setErrors((prev) => ({ ...prev, vendor: "" }));
  };

  const handleSelectProduct = (e, value) => {
    setFormData((prev) => ({
      ...prev,
      product: value?.id || "",
      selectedProduct: value,
    }));
    if (errors.product) setErrors((prev) => ({ ...prev, product: "" }));
  };

  const handleSelectPaymentMode = (e, value) => {
    setFormData((prev) => ({
      ...prev,
      paymentMode: value?.id || "",
      selectedPaymentMode: value,
    }));
    if (errors.paymentMode) setErrors((prev) => ({ ...prev, paymentMode: "" }));
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
        name="billDate"
        label="Bill Date"
        value={formData.billDate}
        onChange={handleDateChange}
        size={{ md: 6, xs: 12 }}
        errorText={errors.billDate}
      />

      <FormAutoComplete
        name="vendor"
        label="Vendor"
        value={formData.selectedVendor}
        onChange={handleSelectVendor}
        onInputChange={(e, value) => setVendorInput(value)}
        options={fromOptions}
        getOptionLabel={(option) => option?.name || ""}
        size={{ md: 6, xs: 12 }}
        errorText={errors.vendor}
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
      <Grid size={{ xs: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isPaid}
              onChange={(e) =>
                setFormData({ ...formData, isPaid: e.target.checked })
              }
            />
          }
          label="Paid"
        />
      </Grid>

      {formData.isPaid && <FormAutoComplete
        name="paymentMode"
        label="Mode of Payment"
        value={formData.selectedPaymentMode}
        onChange={handleSelectPaymentMode}
        onInputChange={(e, value) => setPaymentInput(value)}
        options={paymentModeOptions}
        getOptionLabel={(option) => option?.name || ""}
        size={{ md: 5, xs: 12 }}
        errorText={errors.paymentMode}
      />}

      <FormTextField
        name="billAmount"
        label="Bill Amount"
        type="number"
        value={formData.billAmount}
        onChange={handleChange}
        size={{ md: 6, xs: 12 }}
        errorText={errors.billAmount}
      />

      <FormTextField
        name="vatAmount"
        label="VAT Amount"
        type="number"
        value={formData.vatAmount}
        onChange={handleChange}
        size={{ md: 6, xs: 12 }}
        errorText={errors.vatAmount}
      />

      <FormTextField
        name="totalAmount"
        label="Total Amount"
        type="number"
        value={formData.totalAmount}
        readOnly={true}
        size={{ md: 6, xs: 12 }}
        errorText={errors.totalAmount}
      />

      <FormTextField
        name="billNumber"
        label="Bill Number"
        value={formData.billNumber}
        onChange={handleChange}
        placeholder="Enter Bill Number"
        size={{ md: 6, xs: 12 }}
        errorText={errors.billNumber}
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
