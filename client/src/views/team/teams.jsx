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
} from "@mui/material";

import useFetch from "react-fetch-hook";
import CreateTeamModal from "./createTeamModal";
import EditTeamModal from "./editTeamModal";
import SeeParticipantsModal from "./seeParticipantsModal";
import FilterTeamsByGameCountModal from "./filterTeamsByGameCountModal";

export default function Team() {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [gamesCountModalOpen, setGamesCountModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [participantModalOpen, setParticipantModalOpen] = useState(false);
    const [participantTeamId, setParticipantTeamId] = useState(null);
    const [editTeam, setEditTeam] = useState(null);
    const [refresh, setRefresh] = useState(1);


    const deleteTeam = async (teamId) => {
        try {
            const response = await fetch(`${BACKEND_URL}/team/${teamId}`, {method: "DELETE"});
            setRefresh(refresh + 1);
        } catch (e) {
            throw new Error(`There was an error: ${e}`);
        }
    }

    const { isLoading, data } = useFetch(
        `${BACKEND_URL}/team`,
        {
            depends: [refresh]
        }
    );

    const numberOfGamesRequest = useFetch(
        `${BACKEND_URL}/gamePlayedByTeam/count/teamId/all`,
        {
            depends: [refresh]
        }
    )

    const numberOfGamesLessThanMaxRequest = useFetch(
        `${BACKEND_URL}/gamePlayedByTeam/count/teamId/less_than_max`,
        {
            depends: [refresh]
        }
    )

    const numGames = {};
    if (numberOfGamesRequest.data !== undefined) {
        numberOfGamesRequest.data.forEach((obj) => {
            numGames[obj['teamId']] = obj['count'];
        })
    }

    const numGamesLessThanMax = {};
    if (numberOfGamesLessThanMaxRequest.data !== undefined) {
        console.log(numberOfGamesLessThanMaxRequest.data);
        numberOfGamesLessThanMaxRequest.data.forEach((obj) => {
            numGamesLessThanMax[obj['teamId']] = obj['count'];
        })
    }

    if (data === undefined) {
        return (
            <>
                <Grid container sx={{margin: 2}}>
                    <Grid item xs={2}>
                        <Button onClick={() => setCreateModalOpen(true)} variant="outlined" align="center">Add
                            Team</Button>
                    </Grid>
                </Grid>
                <CreateTeamModal open={createModalOpen} handleClose={() => {
                    setCreateModalOpen(false);
                    setRefresh(refresh + 1);
                }}/>
            </>
        );
    }

    return (
        <>
            <Grid container sx={{ margin: 2 }}>
                <Grid item xs={2}>
                    <Button onClick={() => setCreateModalOpen(true)} variant="outlined" align="center">Add Team</Button>
                    <Button onClick={() => setGamesCountModalOpen(true)} variant="outlined" align="center">With Less Than</Button>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                    {isLoading ? <h3>Loading...</h3> : <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Team ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Behaviour</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Activity ID</TableCell>
                                <TableCell>Pool</TableCell>
                                <TableCell># of Games</TableCell>
                                <TableCell># of Games to Equalize</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((team) => (
                                <TableRow hover key={team.teamId}>
                                    <TableCell>
                                    <Button onClick={() => {
                                    setParticipantTeamId(team.teamId)
                                    setParticipantModalOpen(true)}} variant="outlined" >See Participants</Button>
                                    </TableCell>
                                    <TableCell component={'th'} scope={'row'}>
                                    {team.teamId}
                                    </TableCell>
                                    <TableCell>
                                    {team.name}
                                    </TableCell>
                                    <TableCell>
                                    {team.behaviour}
                                    </TableCell>
                                    <TableCell>
                                    {team.isActive}
                                    </TableCell>
                                    <TableCell>
                                    {team.activityId}
                                    </TableCell>
                                    <TableCell>
                                    {team.poolGender} | {team.poolTier} | {team.poolTerm}
                                    </TableCell>
                                    <TableCell>
                                        <>{numGames[team.teamId] ?? "0"}</>
                                    </TableCell>
                                    <TableCell>
                                        <>{numGamesLessThanMax[team.teamId] ?? "0"}</>
                                    </TableCell>
                                    <TableCell>
                                    <Button onClick={() => {
                                    setEditTeam(team)
                                    setEditModalOpen(true)}} variant="outlined" >Edit Team</Button>
                                    </TableCell>
                                    <TableCell>
                                    <Button onClick={() => deleteTeam(team.teamId)} variant="outlined" color="error">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>}
                    </TableContainer>
                </Grid>
            </Grid>
            <CreateTeamModal open={createModalOpen} handleClose={() => {
                setCreateModalOpen(false);
                setRefresh(refresh + 1);
            }} />
            <EditTeamModal team={editTeam} open={editModalOpen} handleClose={() => {
                setEditModalOpen(false);
                setRefresh(refresh + 1);
            }} />
            <SeeParticipantsModal teamId={participantTeamId} open={participantModalOpen} handleClose={() => {
                setParticipantModalOpen(false);
            }} />
            <FilterTeamsByGameCountModal open={gamesCountModalOpen} handleClose={() => setGamesCountModalOpen(false)} />
        </>
    );

}