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
import CreateActivityModal from "./createActivityModal";
import EditActivityModal from "./editActivityModal";

export default function Activities() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const requestTrigger = createTrigger();
  const requestTriggerValue = useTrigger(requestTrigger);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editActivity, setEditActivity] = useState(null);
  const [refresh, setRefresh] = useState(1);

  const deleteTeam = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/activity/${id}`, {
        method: "DELETE",
      });
      console.log(response);
      setRefresh(refresh + 1);
    } catch (e) {
      throw new Error(`There was an error: ${e}`);
    }
  };

  const { isLoading, data } = useFetch(`${BACKEND_URL}/activity`, {
    depends: [refresh],
  });

      if (data === undefined) {
          return (
              <>
                  <Grid container sx={{margin: 2}}>
                      <Grid item xs={2}>
                          <Button variant="outlined" onClick={() => setCreateModalOpen(true)}>Add Activity</Button>
                      </Grid>
                  </Grid>
                  <CreateActivityModal open={createModalOpen}
                  handleClose={() => {
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
          <Button onClick={() => setCreateModalOpen(true)} variant="outlined">
            Add Activity
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
                    <TableCell>Activity ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Activity Configuration Name</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((activity) => (
                    <TableRow hover key={activity.id}>
                      <TableCell component={"th"} scope={"row"}>
                        {activity.id}
                      </TableCell>
                      <TableCell>{activity.name}</TableCell>
                      <TableCell>{activity.activityConfigName}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            setEditActivity(activity);
                            setEditModalOpen(true);
                          }}
                          variant="outlined"
                        >
                          Edit Activity
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => deleteTeam(activity.id)}
                          color="error"
                          variant="outlined"
                        >
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
      <CreateActivityModal
        open={createModalOpen}
        handleClose={() => {
          setCreateModalOpen(false);
          setRefresh(refresh + 1);
        }}
      />
      <EditActivityModal
        activity={editActivity}
        open={editModalOpen}
        handleClose={() => {
          setEditModalOpen(false);
          setRefresh(refresh + 1);
        }}
      />
    </>
  );
}
