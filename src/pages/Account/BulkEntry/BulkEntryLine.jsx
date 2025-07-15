import React, { useState } from "react";
import FormAutoComplete from "@components/FormAutoComplete";
import FormTextField from "@components/FormTextField";
import { Grid, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import useDebouncedSearch from "@root/utils/useDebouncedSearch";
import { getLedgerOptions } from "@root/redux/actions/accountActions";
import { useDispatch } from "react-redux";

const BulkEntryLine = ({
  idx,
  line,
  onChange,
  onRemove,
  disableRemove,
  errorLedger,
  errorAmount
}) => {
  const [ledgerOptions, setLedgerOptions] = useState([]);
  const dispatch = useDispatch();

  const debouncedLedgerSearch = useDebouncedSearch((value) => {
    dispatch(getLedgerOptions(idx, { search: value })).then((action) => {

      if (action) {
       
        setLedgerOptions(action);
      }
    });
  }, 400);

  const [searchText, setSearchText] = useState("");

  const handleLedgerInputChange = (e, value) => {

    
    setSearchText(value);
  };

  React.useEffect(() => {
    debouncedLedgerSearch(searchText);
  }, [searchText]);

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
maxWidth
      sx={{
   
    
     
        bgcolor: '#fafbfc',
        borderRadius: 2,
        p: 2,
        // boxShadow: 1,
        border: '1px solid #e0e0e0'
      }}
    >
      <Grid size={{ md: 1, xs: 12 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontWeight: 600, color: '#888' }}>{idx + 1}</span>
      </Grid>
      <Grid size={{ md: 5, xs: 12 }}>
        <FormAutoComplete
          name={`ledger-${idx}`}
          label="Ledger"
          value={line.ledger}
          options={ledgerOptions}
          getOptionLabel={(option) => option?.name || ""}
          onInputChange={handleLedgerInputChange}
          onChange={(e, value) => onChange(idx, "ledger", value)}
          fullWidth
          errorText={errorLedger}
        />
      </Grid>
      <Grid size={{ md: 2, xs: 6 }}>
        <FormTextField
          name={`credit-${idx}`}
          label="Credit Amount"
          type="number"
          value={line.credit}
          onChange={(e) => onChange(idx, "credit", e.target.value)}
          fullWidth
          errorText={errorAmount}
        />
      </Grid>
      <Grid size={{ md: 2, xs: 6 }}>
        <FormTextField
          name={`debit-${idx}`}
          label="Debit Amount"
          type="number"
          value={line.debit}
          onChange={(e) => onChange(idx, "debit", e.target.value)}
          fullWidth
          errorText={errorAmount}
        />
      </Grid>
      <Grid size={{ md: 1, xs: 12 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton
          color="error"
          onClick={() => onRemove(idx)}
          disabled={disableRemove}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default BulkEntryLine;

