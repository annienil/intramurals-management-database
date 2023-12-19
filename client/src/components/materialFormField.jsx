import React from "react";
import {ErrorMessage, useField} from "formik";
import {FormControl, TextField} from "@mui/material";


export default function MaterialFormField({fullWidth = false, ...props}) {
    const [field, meta] = useField(props);
    return (
        <FormControl fullWidth={fullWidth}>
            <TextField {...field} {...props} variant={"outlined"} />
            <ErrorMessage name="name" component="div" />
        </FormControl>
    );
}