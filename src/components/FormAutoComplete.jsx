import React from "react";
import { Autocomplete, TextField, Grid, CircularProgress } from "@mui/material";
 import handleKeyDown from "./handleKeyDown";
export default function FormAutoComplete({
  name,
  options = [],
  getOptionLabel,
  onInputChange,
  onChange,
  loading = false,
  sx = {},
  label = "Select Option",
  size = 6,
  errorText,
  helperText,
  renderOption,
  width,
  ...props
}) {
  const handleChange = (event, newValue) => {
    onChange(event, newValue);
  };
  const hoverStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "text.primary",
        textDecorationColor: "text.primary",
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: "brand.main",
      },
      "&.Mui-focused fieldset": {
        borderColor: "brand.dark",
      },
      "&.Mui-error fieldset": {
        borderColor: "mUiColor.red", // red for error
      },
    },
  };

  return (
    <Grid size={{ xs: 12, ...size }}>
      <Autocomplete
        options={options}
        getOptionLabel={getOptionLabel}
        onInputChange={onInputChange}
        onChange={handleChange}
        loading={loading}
        renderOption={renderOption}
        filterOptions={(x) => x}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label || name}
            error={!!errorText}
            helperText={errorText ? `${errorText}` : helperText || ""}
            inputRef={props.inputRef}     

            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            variant="outlined"
            sx={{
              width,
              p: "0",
              m: "0",
              ...hoverStyles,
              ...sx,
            }}
          />
        )}
             onKeyDown={(e) => handleKeyDown(e,)}
        {...props}
      />
    </Grid>
  );
}

