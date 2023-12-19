import React from "react";
import {Grid, Typography} from "@mui/material";


export default function SelectTeamForGame({side}) {

    return (
      <Grid container>
          <Grid item xs={4}>
              <Typography variant="h6">{side}</Typography>
          </Grid>
          <Grid item xs={8}>
              {/*Team dropdown*/}
          </Grid>
      </Grid>
    );

}