import React from "react";
import { ErrorMessage, useField } from "formik";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function MaterialDropdownField({
  label,
  options,
  fullWidth = false,
  ...props
}) {
  const [field, meta] = useField(props);

  return (
    <FormControl fullWidth={fullWidth} variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select {...field} {...props} label={label}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field.name} component="div" />
    </FormControl>
  );
}
