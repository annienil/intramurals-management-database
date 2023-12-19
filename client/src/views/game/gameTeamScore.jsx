import React from "react";
import {Grid} from "@mui/material";
import useFetch from "react-fetch-hook";


export default function GameTeamScore({gameId, side}) {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const gameTeamResponse = useFetch(
        `${BACKEND_URL}/gamePlayedByTeam/${gameId}/${side}`,
    )

    console.log(gameTeamResponse);

    if (gameTeamResponse.isLoading) return <h3>Loading...</h3>;

    return (
        <>
            <Grid item xs={6}>
                {gameTeamResponse.data?.teamName ?? "Error"}
            </Grid>
            <Grid item xs={6}>
                Score: {gameTeamResponse.data?.score ?? "Error"}
            </Grid>
        </>
    );
}