import React from "react";
import {Button, Container, Dialog, DialogContent, DialogTitle, Grid} from "@mui/material";
import {Form, Formik} from "formik";
import MaterialFormField from "../../components/materialFormField";


export default function CreateLocationModal({open, handleClose}) {

    async function handleSubmit(values, { setSubmitting }) {
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        console.log(values);
        try {
            const response = await fetch(
            `${BACKEND_URL}/location/factory`,
            {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );
            console.log(response);
        } catch (e) {
            throw new Error(`There was an error: ${e}`);
        }

        setSubmitting(false);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Location </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={
                        { name: '', address: '', postalCode: '', country: '', province: '', city: ''}
                    }
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Grid container>
                                <Grid item xs={12}>
                                    <MaterialFormField name={'name'} label={'Name'} helperText={'Name of Location'} fullWidth={true} />
                                </Grid>
                                <Grid item xs={12}>
                                    <MaterialFormField name={'address'} label={'Address'} helperText={'Address of the location'} fullWidth={true} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'city'} label={'City'} helperText={''} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'postalCode'} label={'Postal Code'} helperText={''} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'province'} label={'Province'} helperText={''} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'country'} label={'Country'} helperText={''} />
                                </Grid>
                            </Grid>

                            <Container sx={{ pt: 3 }}>
                                <Button type="submit" disabled={isSubmitting}>
                                    Submit
                                </Button>
                            </Container>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
            <Button onClick={handleClose}>Cancel</Button>
        </Dialog>
    );

}