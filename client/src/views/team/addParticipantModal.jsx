import React from "react";
import {Button, Container, Dialog, DialogContent, DialogTitle, Grid} from "@mui/material";
import {Form, Formik} from "formik";
import MaterialFormField from "../../components/materialFormField";


export default function AddParticipantModal({teamId, open, handleClose}) {

    async function handleSubmit(values, { setSubmitting }) {
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        console.log('post value to participant??');
        console.log(JSON.stringify(values));
        try {
        fetch(`${BACKEND_URL}/participants`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
         });
        } catch (e) {
            throw new Error(`There was an error: ${e}`);
        }
        setSubmitting(false);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Participant</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={
                        { studentId: '', teamId: teamId, role: '', waiver: '', dateJoined: ''}
                    }
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Grid container>
                                <Grid item xs={12}>
                                    <MaterialFormField name={'studentId'} label={'Student ID'} helperText={'Student ID'} fullWidth={true} />
                                </Grid>
                                <Grid item xs={12}>
                                    <MaterialFormField name={'role'} label={'Role'} helperText={'Role'} />
                                </Grid>
                                <Grid item xs={12}>
                                    <MaterialFormField name={'waiver'} label={'Waiver'} helperText={'Waiver'} />
                                </Grid>
                                <Grid item xs={12}>
                                    <MaterialFormField name={'dateJoined'} label={'Date Joined'} helperText={'Date Joined'} />
                                </Grid>
                            </Grid>

                            <Container sx={{ pt: 3 }}>
                                <Button type="submit" disabled={isSubmitting} variant="outlined">
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