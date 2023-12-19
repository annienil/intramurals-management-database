import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormControl } from "@mui/base";
import { ErrorMessage, useField } from "formik";

const MaterialDatePicker = ({ ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleDateChange = (date) => {
    helpers.setValue(date);
  };


  return (
    <FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            {...field}
            {...props}
            value={props.value ? props.value : field.value || null}
            onChange={props.onChange ? props.onChange : handleDateChange}
          />
          <ErrorMessage name={field.name} component="div" />
        </DemoContainer>
      </LocalizationProvider>
    </FormControl>
  );
};


export default MaterialDatePicker;