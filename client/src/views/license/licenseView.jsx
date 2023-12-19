import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import React from "react";
import useFetch from "react-fetch-hook";
import createTrigger from "react-use-trigger";
import useTrigger from "react-use-trigger/useTrigger";
import CreateLicenseModel from "./createLicenseModel";

const LicenseView = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [activity, setActivity] = useState("");
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [stuffIdInput, setStuffIdInput] = useState("");
  const [selectedStuffId, setSelectedStuffId] = useState("");
  const [requestTriggerValue, setRequestTrigger] = useState(1);
  const [licenseCreationModalOpen, setLicenseCreationModalOpen] =
    useState(false);

  const buildLicenseQuery = () => {
    let query = `${BACKEND_URL}/license/list?`;
    if (selectedActivityId) {
      query += `activity=${selectedActivityId}`;
    }
    if (selectedStuffId) {
      query += `&staff=${selectedStuffId}`;
    }
    return query;
  };

  const { isLoading: isLoadingLicense, data: dataLicense } = useFetch(
    buildLicenseQuery(),
    {
      depends: [requestTriggerValue],
    }
  );

  const { isLoading: isLoadingActivity, data: dataActivity } = useFetch(
    `${BACKEND_URL}/activity`
  );

  const handleDelete = (license) => {
    const id = license.licenseNumber;
    fetch(`${BACKEND_URL}/license/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((errorData) => {
            alert(`Error: ${errorData.details}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        alert("Successfully deleted");
        setRequestTrigger(requestTriggerValue + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (isLoadingLicense) return <div>Loading...</div>;
  if (isLoadingActivity) return <div>Loading...</div>;

  const columnNames = dataLicense.length > 0 ? Object.keys(dataLicense[0]) : [];
  const columns = columnNames.map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    flex: 1,
  }));

  columns.push({
    field: "actions",
    headerName: "Actions",
    flex: 1,
    renderCell: (params) => (
      <div>
        <Button
          onClick={() => handleDelete(params.row)}
          variant="outlined"
          color="error"
        >
          Delete
        </Button>
      </div>
    ),
  });

  const handleActivitySelectionChange = (event) => {
    const selectedName = event.target.value;
    const selectedId =
      dataActivity?.find((activity) => activity.name === selectedName)?.id ||
      "";

    setActivity(selectedName);
    setSelectedActivityId(selectedId);
  };

  const handleStuffSearch = () => {
    setSelectedStuffId(stuffIdInput);
  };

  const handleStuffSearchClear = () => {
    setSelectedStuffId("");
    setStuffIdInput("");
  };

  return (
    <>
      <Box sx={{ margin: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                type="text"
                placeholder="Search Stuff Id"
                value={stuffIdInput}
                onChange={(e) => setStuffIdInput(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <Button onClick={handleStuffSearch} variant="outlined">
                Search
              </Button>
              <Button
                onClick={handleStuffSearchClear}
                variant="outlined"
                color="error"
              >
                Clear
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <FormControl >
                <InputLabel>Activity</InputLabel>
                <Select
                  sx={{ minWidth: 200, marginBottom: 2 }}
                  labelId="activity-select-label"
                  id="activity-select"
                  label="Activity"
                  value={activity}
                  onChange={handleActivitySelectionChange}
                  fullWidth
                >
                  <MenuItem value="">All</MenuItem>
                  {isLoadingActivity ? (
                    <MenuItem value="">Loading...</MenuItem>
                  ) : (
                    dataActivity?.map((activity) => (
                      <MenuItem key={activity.id} value={activity.name}>
                        {activity.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <Button
              onClick={() => setLicenseCreationModalOpen(true)}
              variant="outlined"
            >
              Create License
            </Button>
          </Grid>
        </Grid>
        {dataLicense && (
          <DataGrid
            sx={{
              height: 370,
            }}
            rows={dataLicense.map((item) => ({
              ...item,
              licenseExpiration: item.licenseExpiration.split("T")[0],
              id: item.licenseNumber,
            }))}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        )}
        <CreateLicenseModel
          open={licenseCreationModalOpen}
          handleClose={() => {
            setLicenseCreationModalOpen(false);
            setRequestTrigger(requestTriggerValue + 1);
          }}
          activities={dataActivity}
        />
      </Box>
    </>
  );
};

export default LicenseView;
