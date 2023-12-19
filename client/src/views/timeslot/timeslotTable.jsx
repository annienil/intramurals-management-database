import React, {useState} from "react";
import {Box, Divider, Grid, List, ListItemButton, ListItemText,} from "@mui/material";
import GameCard from "../game/gameCard";
import useFetch from "react-fetch-hook";

export default function TimeslotTable({poolData}) {

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const timeslotsRequest = useFetch(
        `${BACKEND_URL}/timeslot/pool/${poolData.poolTier}.${poolData.poolTerm}.${poolData.poolGender}.${poolData.poolActivityId}`
    )

    const [timeslot, setTimeslot] = useState(null);

    console.log(timeslotsRequest);

    return (
        <Grid container columns={13}>
            <Grid xs={6}>
                <Box>
                    <List>
                        {
                            timeslotsRequest.isLoading ? <h3>Loading...</h3> :
                            timeslotsRequest.data.map((timeslot) => {
                                const start = new Date(timeslot.startDateTime);
                                const end = new Date(timeslot.endDateTime);

                                return (
                                    <ListItemButton onClick={() => setTimeslot(timeslot)}>
                                        <ListItemText primary={`${start.toDateString()} ${start.getHours()}:${start.getMinutes().toString().padStart(2, "0")} - ${end.getHours()}:${end.getMinutes().toString().padStart(2, "0")} | ${timeslot.locationName}`} />
                                    </ListItemButton>
                                );
                            })
                        }
                    </List>
                </Box>
            </Grid>
            <Grid xs={1} sx={{ px: 3 }}>
                <Divider orientation={"vertical"} />
            </Grid>
            <Grid xs={6}>
                {
                    timeslot != null ? <GameCard timeslot={timeslot} /> : <h3>Select a timeslot </h3>
                }
            </Grid>
        </Grid>
    );
}