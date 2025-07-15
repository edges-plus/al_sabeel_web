import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Checkbox,
  useTheme,
  Paper,
} from "@mui/material";
import DataTable from "@components/DataTable";
import FormAutoComplete from "@components/FormAutoComplete";
import useDebouncedSearch from "@root/utils/useDebouncedSearch";
import {
  getBanks,
  getBankTransactions,
  handleReconcile,
} from "@root/redux/actions/reconciliateActions";
import { useDispatch } from "react-redux";

const Reconciliation = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [bankBalance, setBankBalance] = useState("");
  const [bankOptions, setBankOptions] = useState([]);
  const [bankLoading, setBankLoading] = useState(false);
  const [formData, setFormData] = useState({
    selectedBank: null,
    transactions: [],
    openingBalance: 0,
  });

  const handleToggleReconcile = (id) => {
    const updated = formData.transactions.map((txn) =>
      txn.id === id ? { ...txn, reconciled: !txn.reconciled } : txn
    );
    setFormData((prev) => ({ ...prev, transactions: updated }));
  };

  const debouncedBankSearch = useDebouncedSearch(async (value) => {
    setBankLoading(true);
    const res = await dispatch(getBanks({ search: value || "" }));
    setBankOptions(res || []);
    setBankLoading(false);
  });

  const onSelectBank = async (event, value) => {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        selectedBank: value,
      }));

      const res = await dispatch(getBankTransactions(value.id));
      const txns = res?.transactions || [];
      const reconciledSum = res?.reconciledSum || 0;

      const updatedTransactions = txns.map((txn, index) => ({
        ...txn,
        id: txn.id || index + 1,
        reconciled: false,
      }));

      setFormData((prev) => ({
        ...prev,
        transactions: updatedTransactions,
        openingBalance: reconciledSum,
        currency: res.ledger.currency,
      }));
    } else {
      setFormData({
        selectedBank: null,
        transactions: [],
        openingBalance: 0,
        currency: "",
      });
    }
  };

  const handleReconciliation = () => {
    if (!window.confirm("Are you sure you want to reconcile?")) {
      return;
    }
    const selectedJournalLineIds = formData.transactions
      .filter((txn) => txn.reconciled)
      .map((txn) => txn.id);

    if (selectedJournalLineIds.length === 0) {
      alert("Please select at least one transaction to reconcile.");
      return;
    }

    dispatch(handleReconcile(selectedJournalLineIds));
  };
  const selectedTxns = formData.transactions.filter((t) => t.reconciled);


const paymentTxns = selectedTxns.filter((t) => Number(t.credit) > 0);
const depositTxns = selectedTxns.filter((t) => Number(t.debit) > 0);

const totalCredits = paymentTxns.reduce((acc, t) => acc + Number(t.credit), 0);
const totalDebits = depositTxns.reduce((acc, t) => acc + Number(t.debit), 0);

const paymentCount = paymentTxns.length;
const depositCount = depositTxns.length;


  const clearedBalance = Number(formData.openingBalance || 0) + totalDebits - totalCredits;

  const difference = Number(bankBalance || 0) - clearedBalance;

  const columns = [
    { key: "description", label: "Description" },
    {
      key: "debit",
      label: "Debit",
      render: (row) => (row.debit ? `${formData.currency} ${Number(row.debit).toLocaleString()}` : "-"),
    },
    {
      key: "credit",
      label: "Credit",
      render: (row) => (row.credit ? `${formData.currency} ${Number(row.credit).toLocaleString()}` : "-"),
    },
    {
      key: "reconciled",
      label: "Action",
      render: (row) => (
        <Checkbox
          color="primary"
          checked={row.reconciled}
          onChange={() => handleToggleReconcile(row.id)}
        />
      ),
    },
  ];

  return (
    <Box px={{ xs: 2, sm: 4 }} pt={1} pb={4} >
      {/* Header */}
      <Grid container spacing={2} alignItems="center">
        <FormAutoComplete
          name="selectedBank"
          label="Bank"
          value={formData.selectedBank}
          getOptionLabel={(option) => `${option.name || ""}`}
          renderOption={(props, option) => (
            <li key={option.id} {...props}>
              {option.name}
            </li>
          )}
          onChange={onSelectBank}
          onInputChange={(event, value) => debouncedBankSearch(value)}
          loading={bankLoading}
          options={bankOptions}
          size={{ md: 4, xs: 12 }}
        />

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            label="Bank Balance"
            type="number"
            value={bankBalance}
            onChange={(e) => setBankBalance(e.target.value)}
            fullWidth
            variant="outlined"
            size="medium"
            sx={{
              '& input[type=number]': {
                MozAppearance: 'textfield',
              },
              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
              {
                WebkitAppearance: 'none',
                margin: 0,
              },
            }}
          />
        </Grid>
      </Grid>

      {!formData.selectedBank ? (
        <Box mt={4} textAlign="center">
          <Typography variant="h6" color="text.secondary">
            Please select a bank to view reconciliation details.
          </Typography>
        </Box>
      ) : (
        <>
          {/* Summary Cards */}
          <Grid container spacing={2} mt={2}>
            {/* Cleared Balance */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                  CLEARED BALANCE
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography color="primary" variant="h6" fontWeight={700}>
                      {formData.currency} {Number(formData.openingBalance || 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Opening Balance
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">−</Typography>
                  </Grid>
                  <Grid item>
                    <Typography color="error" variant="h6" fontWeight={700}>
                      {formData.currency} {totalCredits.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {paymentCount} Payments
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">+</Typography>
                  </Grid>
                  <Grid item>
                    <Typography color="success.main" variant="h6" fontWeight={700}>
                      {formData.currency} {totalDebits.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {depositCount} Deposits
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Reconcile */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                  RECONCILE
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography color="primary" variant="h6" fontWeight={700}>
                      {formData.currency} {Number(bankBalance || 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Current Bank Balance
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">−</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" fontWeight={700}>
                      {formData.currency} {clearedBalance.toLocaleString()}

                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cleared Balance
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">=</Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color={difference === 0 ? "success.main" : "error"}
                    >
                      {formData.currency} {difference.toLocaleString()} {difference === 0 ? "✅" : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Uncleared Balance
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          {/* Data Table */}
          <Box mt={4}>
            <DataTable
              columns={columns}
              data={formData.transactions}
              emptyMessage="No transactions found."
              titleField="description"
            />
          </Box>

          {/* Reconcile Button */}
          <Box mt={4} display="flex" justifyContent="flex-end">
            <button
              style={{
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              }}
              onClick={handleReconciliation}
            >
              Reconciliate
            </button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Reconciliation;
