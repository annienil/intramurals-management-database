import React from "react";
import {Button, Container, Dialog, DialogContent, DialogTitle, Grid} from "@mui/material";
import {Form, Formik} from "formik";
import MaterialFormField from "../../components/materialFormField";


export default function EditActivityModal({activity, open, handleClose}) {

    async function handleSubmit(values, { setSubmitting }) {
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        try {
        fetch(`${BACKEND_URL}/activity/${activity.id}`, {
                    method: "PUT",
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

        if (activity === null) {
            return (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Activity</DialogTitle>
                    <Button onClick={handleClose} variant="outlined">Cancel</Button>
                </Dialog>
            );
        }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Activity </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={
                        { id: activity.id, name: activity.name, activityConfigName: activity.activityConfigName}
                    }
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Grid container>
                                <Grid item xs={12}>
                                    <MaterialFormField name={'name'} label={'Name'} helperText={'Name'} fullWidth={true}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <MaterialFormField name={'activityConfigName'} label={'Activity Configuration Name'} helperText={'Activity Configuration Name'} fullWidth={true}/>
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
            <Button onClick={handleClose} variant="outlined" >Cancel</Button>
        </Dialog>
    );

}