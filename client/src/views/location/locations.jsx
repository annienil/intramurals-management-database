import React, {useState} from "react";
import {
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import createTrigger from "react-use-trigger";
import useFetch from "react-fetch-hook";
import useTrigger from "react-use-trigger/useTrigger";
import CreateLocationModal from "./createLocationModal";

export default function Locations() {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const requestTrigger = createTrigger();
    const requestTriggerValue = useTrigger(requestTrigger);

    const [modalOpen, setModalOpen] = useState(false);

    const deleteLocation = async (locationId) => {
        try {
            const response = await fetch(`${BACKEND_URL}/location/${locationId}`, {method: "DELETE"});
            console.log(response);
            requestTrigger();
        } catch (e) {
            throw new Error(`There was an error: ${e}`);
        }
    }

    const { isLoading, data } = useFetch(
        `${BACKEND_URL}/location`,
        {
            depends: [requestTriggerValue]
        }
    );

    return (
        <>
            <Grid container>
                <Grid item xs={10}>
                    <Typography variant="h3" align="center">
                        Locations
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => setModalOpen(true)}>Add Location</Button>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        {isLoading ? <h3>Loading...</h3> : <Table>
                            <TableHead>
                                <TableRow hover>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((location) => (
                                    <TableRow hover key={location.id}>
                                        <TableCell component={'th'} scope={'row'}>
                                            {location.name}
                                        </TableCell>
                                        <TableCell>
                                            {location.address} | {location.city}, {location.province}, {location.postalCode}
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => deleteLocation(location.id)}>Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>}
                    </TableContainer>
                </Grid>
            </Grid>
            <CreateLocationModal open={modalOpen} handleClose={() => {
                setModalOpen(false);
                requestTrigger();
            }} />

        </>
    );

}