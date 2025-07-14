import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Grid } from "@mui/material";
// import handleKeyDown from "./handleKeyDown";

export default function FormTextField({
  name,
  value,
  onChange,
  prefix,
  label,
  suffix,
  width = "100%",
  size = 6,
  readOnly = false,
  sx = {},
  errorText,
  shrink = undefined,

  ...props
}) {
  const handleChange = (e) => {
    onChange?.(e);
  };

  const isNumberType = props.type === "number";

  // Prevent typing e, E, +, -
  const preventInvalidKeys = (e) => {
    if (["e", "E", "+"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const hoverStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "text.primary",
        textDecorationColor: "text.primary",
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: "brand.neonBlue",
      },
      "&.Mui-focused fieldset": {
        borderColor: "brand.neonBlue",
      },
      "&.Mui-error fieldset": {
        borderColor: "mUiColor.red", 
      },
    },
  };

  const inputStyles = {
    "& input[type=number]": {
      MozAppearance: "textfield", // Firefox
    },
    "& input::-webkit-outer-spin-button": {
      WebkitAppearance: "none", // Chrome, Safari
      margin: 0,
    },
    "& input::-webkit-inner-spin-button": {
      WebkitAppearance: "none", // Chrome, Safari
      margin: 0,
    },
  };
  if (props.multiline) {
    shrink = true;
  }

  return (
    <Grid size={{ xs: 12, ...size }}>
      <TextField
        slotProps={{
          input: {
            readOnly: readOnly,

            startAdornment: prefix ? (
              <InputAdornment position="start">{prefix}</InputAdornment>
            ) : undefined,
            endAdornment: suffix ? (
              <InputAdornment position="end">{suffix}</InputAdornment>
            ) : undefined,
          },
          inputLabel: { shrink: shrink },
        }}
        InputProps
        error={!!errorText}
        helperText={errorText}
        label={label || name}
        value={value}
        name={name}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        inputRef={props.inputRef}
        sx={{
          width,
          p: "0",
          m: "0",
          "& .MuiInputBase-input": {
            textAlign: isNumberType ? "right" : "left",
          },
          ...hoverStyles,
          ...inputStyles,
          ...sx,
        }}
        onWheel={(e) => {
          if (isNumberType) {
            e.target.blur();
          }
        }}
        onKeyDown={(e) => handleKeyDown(e)}
        {...props}
      />
    </Grid>
  );
}

