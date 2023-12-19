import React, { useState } from "react";
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
} from "@mui/material";

import createTrigger from "react-use-trigger";
import useFetch from "react-fetch-hook";
import useTrigger from "react-use-trigger/useTrigger";
import CreateActivityConfigModal from "./createActivityConfig";
import EditActivityConfigModal from "./editActivityConfig";

export default function ActivityConfig() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const requestTrigger = createTrigger();
  const requestTriggerValue = useTrigger(requestTrigger);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editActivityConfig, setEditActivityConfig] = useState(null);
  const [refresh, setRefresh] = useState(1);

  const deleteActivityConfig = async (name) => {
    try {
      const response = await fetch(`${BACKEND_URL}/activityConfig/${name}`, {
        method: "DELETE",
      });
      console.log(response);
      setRefresh(refresh + 1);
    } catch (e) {
      throw new Error(`There was an error: ${e}`);
    }
  };

  const { isLoading, data } = useFetch(`${BACKEND_URL}/activityConfig`, {
    depends: [refresh],
  });

    if (data === undefined) {
        return (
            <>
                <Grid container sx={{margin: 2}}>
                    <Grid item xs={2}>
                        <Button variant="outlined" onClick={() => setCreateModalOpen(true)} >Add Activity Configuration</Button>
                    </Grid>
                </Grid>
                <CreateActivityConfigModal open={createModalOpen} handleClose={()=> {
                setCreateModalOpen(false)
                setRefresh(refresh + 1)
                }}/>
            </>
        );
    }
  return (
    <>
      <Grid container sx={{ margin: 2 }}>
        <Grid item xs={2}>
          <Button onClick={() => setCreateModalOpen(true)} variant="outlined">
            Add Activity Configuration
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            {isLoading ? (
              <h3>Loading...</h3>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Forfeit Win Points</TableCell>
                    <TableCell>Default Win Points</TableCell>
                    <TableCell>Cancellation Win Points</TableCell>
                    <TableCell>Forfeit Penalty</TableCell>
                    <TableCell>Default Penalty</TableCell>
                    <TableCell>Cancellation Penalty</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((activityConfig) => (
                    <TableRow hover key={activityConfig.name}>
                      <TableCell component={"th"} scope={"row"}>
                        {activityConfig.name}
                      </TableCell>
                      <TableCell>{activityConfig.forfeitWinPoints}</TableCell>
                      <TableCell>{activityConfig.defaultWinPoints}</TableCell>
                      <TableCell>{activityConfig.cancelWinPoints}</TableCell>
                      <TableCell>{activityConfig.forfeitPenalty}</TableCell>
                      <TableCell>{activityConfig.defaultPenalty}</TableCell>
                      <TableCell>{activityConfig.cancelPenalty}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            setEditActivityConfig(activityConfig);
                            setEditModalOpen(true);
                          }}
                          variant="outlined"
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" color="error" onClick={() => deleteActivityConfig(activityConfig.name)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Grid>
      </Grid>
      <CreateActivityConfigModal
        open={createModalOpen}
        handleClose={() => {
          setCreateModalOpen(false);
          setRefresh(refresh + 1);
        }}
      />
      <EditActivityConfigModal
        activityConfig={editActivityConfig}
        open={editModalOpen}
        handleClose={() => {
          setEditModalOpen(false);
          setRefresh(refresh + 1);
        }}
      />
    </>
  );
}
