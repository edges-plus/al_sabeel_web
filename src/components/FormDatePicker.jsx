import React from "react";
import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";



export default function FormDatePicker({
  name = "date",
  label = "Date",
  value,
  onChange,
  errorText = "",
  size = 6,
  required = false,
  disabled = false,
  ...props
}) {
  const handleChange = (newValue) => {
    onChange?.(name, newValue);
  };

const hoverStyles = {
  "& .MuiOutlinedInput-root": {
    '& fieldset': {
      borderColor: 'text.primary',
    },
    '&:hover fieldset': {
      borderColor: 'brand.neonBlue',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'brand.neonBlue',
    },
    '&.Mui-error fieldset': {
      borderColor: 'mUiColor.red',
    },
  },
};
  return (
    <Grid size={{ xs: 12, ...size }}>
      <DatePicker
        label={label}
        value={value ? dayjs(value) : null}
        onChange={handleChange}
        format="DD-MM-YYYY"
        disabled={disabled}
        slotProps={{
          textField: {
            name,
            fullWidth: true,
            required,
            error: !!errorText,
            helperText: errorText,
            sx: {
              width: "100%",
              ...hoverStyles,
            },
            inputRef: props.inputRef,     
            onKeyDown: props.onKeyDown, 
          },
        }}
        {...props}
      />
    </Grid>
  );
}

