import React from "react";
import {Button, Container, Dialog, DialogContent, DialogTitle, Grid} from "@mui/material";
import {Form, Formik} from "formik";
import MaterialFormField from "../../components/materialFormField";


export default function EditActivityConfigModal({activityConfig, open, handleClose}) {

    async function handleSubmit(values, { setSubmitting }) {
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        try {
        fetch(`${BACKEND_URL}/activityConfig/${activityConfig.name}`, {
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

    if (activityConfig === null) {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Activity Configuration</DialogTitle>
                <Button onClick={handleClose}>Cancel</Button>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Activity Configuration</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={
                        { name: activityConfig.name, forfeitWinPoints: activityConfig.forfeitWinPoints, defaultWinPoints: activityConfig.defaultWinPoints, cancelWinPoints: activityConfig.cancelWinPoints,
                        forfeitPenalty: activityConfig.forfeitPenalty, defaultPenalty: activityConfig.defaultPenalty, cancelPenalty: activityConfig.cancelPenalty}
                    }
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Grid container>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'forfeitWinPoints'} helperText={'Forfeit Win Points'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'forfeitPenalty'} helperText={'Forfeit Penalty'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'defaultWinPoints'} helperText={'Default Win Points'} />
                                </Grid>
                                 <Grid item xs={6}>
                                     <MaterialFormField name={'defaultPenalty'} helperText={'Default Penalty'} />
                                 </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'cancelWinPoints'} helperText={'Cancel Win Points'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'cancelPenalty'} helperText={'Cancel Penalty'} />
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