import React from "react";
import { ErrorMessage, useField } from "formik";
import { FormControl, FormControlLabel, Checkbox } from "@mui/material";

const MaterialCheckbox = ({
  label,
  fullWidth = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { value } = meta;
  const { setValue } = helpers;

  const handleChange = (event) => {
    setValue(event.target.checked);
  };

  return (
    <FormControl fullWidth={fullWidth}>
      <FormControlLabel
        control={
          <Checkbox {...field} checked={value} onChange={handleChange} />
        }
        label={label}
      />
      <ErrorMessage name={props.name} component="div" />
    </FormControl>
  );
}

export default MaterialCheckbox;