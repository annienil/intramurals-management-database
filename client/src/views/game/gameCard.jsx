import React from "react";
import {Button, Divider, Grid} from "@mui/material";
import GameTeamScore from "./gameTeamScore";
import useFetch from "react-fetch-hook";
import SelectTeamForGame from "./selectTeamForGame";

export default function GameCard({timeslot}) {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const gameResponse = useFetch(
        `${BACKEND_URL}/game/timeslot/${timeslot.id}`
    )

    console.log(gameResponse);

    if (gameResponse.isLoading) return <h3>Loading...</h3>;

    const gameAvailable = gameResponse.data !== undefined;

    return (
        <Grid container>
            <Grid item xs={8}>
                <div>Date: {timeslot.startDateTime}</div>
                <div>Time: {timeslot.startDateTime}</div>
                <div>Location: {timeslot.locationName}</div>
            </Grid>
            <Grid item xs={4}>
                <Button>Delete</Button>
            </Grid>
            <Grid xs={12} sx={{my: 3}}>
                <Divider variant="middle"/>
            </Grid>
            <Grid container item>
                {
                    gameAvailable ? <GameTeamScore gameId={gameResponse.data.gameId} side={"HOME"} /> : <SelectTeamForGame side={'Home'} />
                }
            </Grid>
            <Grid container item>
                {
                    gameAvailable ? <GameTeamScore gameId={gameResponse.data.gameId} side={"AWAY"} /> : <SelectTeamForGame side={'Away'} />
                }
            </Grid>
        </Grid>
    );
}