import React from "react";
import {Button, Container, Dialog, DialogContent, DialogTitle, Grid} from "@mui/material";
import {Form, Formik} from "formik";
import MaterialFormField from "../../components/materialFormField";


export default function CreateActivityConfigModal({open, handleClose}) {

    async function handleSubmit(values, { setSubmitting }) {
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        try {
        fetch(`${BACKEND_URL}/activityConfig`, {
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
            <DialogTitle>Create New Activity Configuration</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={
                        { name: '', forfeitWinPoints: '', defaultWinPoints: '', cancelWinPoints: '', forfeitPenalty: '', defaultPenalty: '', cancelPenalty: ''}
                    }
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Grid container>
                                <Grid item xs={12}>
                                    <MaterialFormField name={'name'} label={'Name'} helperText={'Name'} fullWidth={true} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'forfeitWinPoints'} label={'Forfeit Win Points'} helperText={'Forfeit Win Points'}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'defaultWinPoints'} label={'Default Win Points'} helperText={'Default Win Points'}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'cancelWinPoints'} label={'Cancel Win Points'} helperText={'Cancel Win Points'}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'forfeitPenalty'} label={'Forfeit Penalty'} helperText={'Forfeit Penalty'}/>
                                </Grid>
                                 <Grid item xs={6}>
                                     <MaterialFormField name={'defaultPenalty'} label={'Default Penalty'} helperText={'Default Penalty'}/>
                                 </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'cancelPenalty'} label={'Cancel Penalty'} helperText={'Cancel Penalty'}/>
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
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
        </Dialog>
    );

}