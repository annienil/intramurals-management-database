import React from "react";
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import MaterialFormField from "../../components/materialFormField";
import MaterialDatePicker from "../../components/materialDatePicker";
import MaterialDropdownField from "../../components/materialDropdownField";

const CreateLicenseModel = ({ open, handleClose, activities=[] }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    fetch(`${BACKEND_URL}/license/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        activityId: activities.find((activity) => activity.name === values.activityId).id,
        licenseExpiration: values.licenseExpiration.format("YYYY-MM-DD"),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((errorData) => {
            alert(`Error: ${errorData.details}`);
          });
        } else {
          alert("Successfully added!");
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });

    setSubmitting(false);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New License </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            staffId: "",
            activityId: "",
            licenseNumber: "",
            licenseExpiration: null,
            tierLevel: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid
                container
                spacing={2}
                sx={{ display: "flex", gap: 2, flexDirection: "c" }}
              >
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <MaterialFormField
                    name={"staffId"}
                    label={"Staff ID"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <MaterialDropdownField
                    name={"activityId"}
                    label={"Activity"}
                    fullWidth
                    options={activities.map((activity) => ({
                      value: activity.name,
                      label: activity.name,
                    }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MaterialFormField
                    name={"licenseNumber"}
                    label={"License Number"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <MaterialDatePicker
                    name={"licenseExpiration"}
                    label={"License Expiration"}
                    helperText={"Enter License Expiration"}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MaterialDropdownField
                    name={"tierLevel"}
                    label={"Tier Level"}
                    helperText={"Select Tier Level"}
                    fullWidth
                    options={[
                      { value: "Beginner", label: "Beginner" },
                      { value: "Intermediate", label: "Intermediate" },
                      { value: "Advanced", label: "Advanced" },
                    ]}
                  />
                </Grid>
              </Grid>

              <Container
                sx={{
                  paddingTop: 3,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
              </Container>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLicenseModel;
