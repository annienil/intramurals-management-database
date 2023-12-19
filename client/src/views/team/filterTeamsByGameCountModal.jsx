import React, {useState} from "react";
import {Dialog, DialogContent, DialogTitle, Grid, List, ListItem, TextField} from "@mui/material";
import useFetch from "react-fetch-hook";


export default function FilterTeamsByGameCountModal({open, handleClose}) {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const teamRequest = useFetch(
        `${BACKEND_URL}/team`,
    );

    const [max, setMax] = useState(0);

    const numberOfGamesRequest = useFetch(
        `${BACKEND_URL}/gamePlayedByTeam/count/teamId/max/${max}`,
        {
            depends: [max]
        }
    );

    const numGames = {};
    const teams = [];
    if (numberOfGamesRequest.data !== undefined && teamRequest.data !== undefined) {
        console.log(teamRequest.data);
        let teamDict = {};
        teamRequest.data.forEach((obj) => {
            teamDict[obj['teamId']] = obj['name'];
        });

        numberOfGamesRequest.data.forEach((obj) => {
            numGames[obj['teamId']] = obj['count'];
            teams.push(teamDict[obj['teamId']]);
        });
        console.log(teams);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Teams With Less Games Than</DialogTitle>
            <DialogContent>
                <Grid container sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <TextField id="maxGameNum" label={"Max # of Games"} value={max} onChange={(event) => setMax(event.target.value ?? 0)} />
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            {
                                teams.map((team) => (<ListItem>{team}</ListItem>))
                            }
                        </List>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );

}