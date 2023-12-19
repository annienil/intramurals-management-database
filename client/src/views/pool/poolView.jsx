import React from "react";
import {Button, Grid, Typography} from "@mui/material";
import TimeslotTable from "../timeslot/timeslotTable";
import useFetch from "react-fetch-hook";


export default function PooLView({poolTier, poolTerm, poolGender, poolActivityId, poolName}) {

    return (
        <Grid container spacing={2}>
            <Grid item xs={10}>
                <Typography variant="h3" align="center">
                    {poolName}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Button>Create GameSlot</Button>
            </Grid>
            <Grid item xs={12}>
                <TimeslotTable poolData={{poolTier, poolTerm, poolGender, poolActivityId}} />
            </Grid>
        </Grid>
    );
}