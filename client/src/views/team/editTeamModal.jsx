import React from "react";
import {Button, Container, Dialog, DialogContent, DialogTitle, Grid} from "@mui/material";
import {Form, Formik} from "formik";
import MaterialFormField from "../../components/materialFormField";


export default function EditTeamModal({team, open, handleClose}) {


    async function handleSubmit(values, { setSubmitting }) {
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
        console.log('post');
        console.log(JSON.stringify(values));
        try {
        fetch(`${BACKEND_URL}/team/${team.teamId}`, {
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

    if (team === null) {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Team</DialogTitle>
                <Button onClick={handleClose}>Cancel</Button>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Team </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={
                        { name: team.name, behaviour: team.behaviour, isActive: team.isActive}
                    }
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Grid container>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'name'} label={'Name'} helperText={'Team Name'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'behaviour'} label={'Behaviour'} helperText={'Behaviour'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <MaterialFormField name={'isActive'} label={'Activity Status'} helperText={'Activity Status'} />
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