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
    Typography,
    Dialog,
    DialogContent,
    DialogTitle
} from "@mui/material";

import createTrigger from "react-use-trigger";
import useFetch from "react-fetch-hook";
import useTrigger from "react-use-trigger/useTrigger";
import AddParticipantsModal from "./addParticipantModal";


export default function SeeParticipantsModal({teamId, open, handleClose}) {

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const requestTrigger = createTrigger();
    const requestTriggerValue = useTrigger(requestTrigger);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(1);

    const { isLoading, data } = useFetch(
        `${BACKEND_URL}/participants/${teamId}`,
        {

            depends: [refresh]
        }
    );

    const deleteParticipant = async (studentId) => {
        try {
            fetch(`${BACKEND_URL}/participants/${studentId}`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                }
            });
            setRefresh(refresh + 1);
        } catch (e) {
            throw new Error(`There was an error: ${e}`);
        }
    }

    if (data === undefined) {
    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>No Participants </DialogTitle>
        <Button onClick={() => setAddModalOpen(true)} variant="outlined">Add Participant</Button>
        <Button onClick={handleClose} variant="outlined">Close</Button>
        <AddParticipantsModal teamId={teamId} open={addModalOpen} handleClose={() => {
            setAddModalOpen(false);
            setRefresh(refresh + 1);
        }} />
        </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Participants </DialogTitle>
            <DialogContent>
                <Button onClick={() => setAddModalOpen(true)} variant="outlined">Add Participant</Button>
                <Grid item xs={24}>
                <TableContainer>
                    {isLoading ? <h3>Loading...</h3> : <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Student ID</TableCell>
                            <TableCell>Waiver</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Date Joined</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((participant) =>(
                            <TableRow hover key={participant.studentId}>
                                <TableCell>{participant.studentId}</TableCell>
                                <TableCell>{participant.waiver}</TableCell>
                                <TableCell>{participant.role}</TableCell>
                                <TableCell>{participant.dateJoined}</TableCell>
                                <TableCell>
                                    <Button onClick={() => deleteParticipant(participant.studentId)} variant="outlined" color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>}
                </TableContainer>
                </Grid>
            </DialogContent>
            <Button onClick={handleClose}>Close</Button>
            <AddParticipantsModal teamId={teamId} open={addModalOpen} handleClose={() => {
            setAddModalOpen(false);
            setRefresh(refresh + 1);
            }} />
        </Dialog>
    );

}