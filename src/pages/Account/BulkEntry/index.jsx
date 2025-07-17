import { createJournalEntry } from "@root/redux/actions/journalEntry.actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HeaderContainer from "@components/DashboardLayout/Container";
import FormContainer from "@components/FormContainer";
import FormDatePicker from "@components/FormDatePicker";
import FormTextField from "@components/FormTextField";
import FormAutoComplete from "@components/FormAutoComplete";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import useDebouncedSearch from "@root/utils/useDebouncedSearch";
import { getLedgerOptions } from "@root/redux/actions/accountActions";
import BulkEntryLine from "./BulkEntryLine";
import {  toast } from 'react-toastify';
const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(() => new Date());
  const [narration, setNarration] = useState("");
  const [lines, setLines] = useState([{ ledger: null, debit: "", credit: "" }]);
  const [ledgerOptions, setLedgerOptions] = useState([]);
  const [ledgerOptionsByIdx, setLedgerOptionsByIdx] = useState({});

  const debouncedLedgerSearch = useDebouncedSearch((idx, value) => {
    getLedgerOptions(idx, { search: value }).then((action) => {
      if (action && action.payload && action.payload.options) {
        setLedgerOptionsByIdx((prev) => ({
          ...prev,
          [idx]: action.payload.options,
        }));
      }
    });
  }, 400);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = {};

    if (!date) {
      newErrors.date = "Date is required";
      hasError = true;
    }
    if (!narration) {
      newErrors.narration = "Narration is required";
      hasError = true;
    }
    lines.forEach((line, idx) => {
      if (!line.ledger || !line.ledger.id) {
        newErrors[`ledger-${idx}`] = "Ledger is required";
        hasError = true;
      }
      if (!line.debit && !line.credit) {
        newErrors[`amount-${idx}`] = "Debit or Credit is required";
        hasError = true;
      }
    });

    const totalDebit = lines.reduce((sum, line) => sum + (parseFloat(line.debit) || 0), 0);
    const totalCredit = lines.reduce((sum, line) => sum + (parseFloat(line.credit) || 0), 0);

    if (totalDebit !== totalCredit) {
      toast.error("Total Debit and Credit must be equal");
     
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;


    if (!window.confirm("Are you sure you want to submit this bulk entry?")) {
      return;
    }


    const payload = {
      date: date.format ? date.format("YYYY-MM-DD") : date,
      description: narration,
      type: "Bulk Entry",
      lines: lines.map((line) => ({
        ledgerId: line.ledger.id,
        debit: parseFloat(line.debit) || 0,
        credit: parseFloat(line.credit) || 0,
        description: narration,
      })),
    };
    const res = await dispatch(createJournalEntry(payload));
    if (res) {
      navigate(-1);
    }
  };

  const handleLedgerInputChange = (idx, value) => {
    debouncedLedgerSearch(idx, value);
  };

  const handleLedgerSelect = (idx, value) => {
    // Implementation of handleLedgerSelect
  };

  const handleLineChange = (idx, field, value) => {
    setLines((prev) =>
      prev.map((line, i) => (i === idx ? { ...line, [field]: value } : line))
    );
  };

  const removeLine = (idx) => {
    setLines((prev) => prev.filter((_, i) => i !== idx));
  };

  const emptyLine = { ledger: null, credit: "", debit: "" };

  const addLine = () => {
    setLines((prev) => [...prev, { ...emptyLine }]);
  };

  // Pass errorText={errors[`ledger-${idx}`]} to FormAutoComplete
  // Pass errorText={errors[`amount-${idx}`]} to Credit/Debit FormTextField
  // Pass errorText={errors.narration} to narration FormTextField
  // Pass errorText={errors.date} to FormDatePicker

  return (
    <HeaderContainer header="Bulk Entry" divider={true}>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <Grid size={12} sx={{ mb: 2,  mx: 'auto' }}>
            <FormDatePicker
              name="date"
              label="Date"
              value={date}
              onChange={(name, newValue) => setDate(newValue)}
             size={{xs:12,md:4}}
              variant="outlined"
              errorText={errors.date}
            />
          </Grid>
          {lines.map((line, idx) => (
               <Grid size={12}>
            <BulkEntryLine
              key={idx}
              idx={idx}
              line={line}
              onChange={handleLineChange}
              onRemove={removeLine}
              disableRemove={lines.length === 1}
              errorLedger={errors[`ledger-${idx}`]}
              errorAmount={errors[`amount-${idx}`]}
            /></Grid>
          ))}
          <Grid size={{ xs: 12 }} sx={{ mb: 3, mx: 'auto', display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={addLine}
              startIcon={<AddCircleOutlineIcon />}
              sx={{ fontWeight: 600, px: 4, py: 1.5, borderRadius: 2, boxShadow: 2 }}
            >
              Add Line
            </Button>
          </Grid>
          <Grid size={12} sx={{ mb: 2, mx: 'auto' }}>
            <FormTextField
              name="narration"
              label="Narration"
              value={narration}
              onChange={e => setNarration(e.target.value)}
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              errorText={errors.narration}
            />
          </Grid>
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
      </form>
    </HeaderContainer>
  );
};

export default Index; 