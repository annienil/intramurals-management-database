import React from "react";
import {Button, Container, Dialog, DialogContent, DialogTitle, Grid} from "@mui/material";
import {Form, Formik} from "formik";
import MaterialFormField from "../../components/materialFormField";


export default function CreateTeamModal({open, handleClose}) {

    async function handleSubmit(values, { setSubmitting }) {
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        console.log('post');
        console.log(JSON.stringify(values));
        try {
        fetch(`${BACKEND_URL}/team`, {
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
            <DialogTitle>Create New Team </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={
                        { name: '', isActive: '', activityId: '', poolTier: '', poolGender: '', poolTerm: '', poolActivityId: ''}

                    }
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Grid container>
                                <Grid item xs={12}>
                                    <MaterialFormField name={'name'} label={'Name'} helperText={'Team Name'} fullWidth={true} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'isActive'} label={'Activity Status'} helperText={'Activity Status'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'poolTier'} label={'Pool Tier'} helperText={'Pool Tier'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'poolGender'} label={'Pool Gender'} helperText={'Pool Gender'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'poolTerm'} label={'Pool Term'} helperText={'Pool Term'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'activityId'} label={'Activity ID'} helperText={'Activity ID'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'poolActivityId'} label={'Pool Activity ID'} helperText={'Pool Activity ID'}/>
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