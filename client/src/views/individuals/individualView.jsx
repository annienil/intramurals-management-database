import React from "react";
import { useEffect, useState } from "react";
import IndividualTable from "./individualComponents/individualTable/individualTable";
import IndividualCreationModal from "./individualComponents/individualCreationModal/individualCreationModal";
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

const IndividualView = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [queryType, setQueryType] = useState("official"); // or participant
  const [searchQuery, setSearchQuery] = useState("");
  const [individuals, setIndividual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRefetch, setRefetch] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const fetchData = async () => {
    if(queryType === "") {
      return;
    }
    fetch(`${BACKEND_URL}/individual/list?type=${queryType}&search=${searchQuery}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIndividual(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [queryType]);

  useEffect(() => {
    fetchData();
  }, [isRefetch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleTabChange = (tab) => {
    setQueryType(tab);
  };

  const triggerRefetch = () => {
    fetchData();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchClear = () => {
    setSearchQuery("");
    setRefetch(!isRefetch);
  };

  const handleSearch = () => {
    if (queryType === "") {
      setQueryType("official");
    }
    fetchData();
  };

  const handleAllMighty =() => {
    fetch(`${BACKEND_URL}/individual/allMightyOfficials`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIndividual(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
      setQueryType("");
  }

  const handleNotPaidFees =() => {
    fetch(`${BACKEND_URL}/individual/notPaidFeesParticipant`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIndividual(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
      setQueryType("");
  }

  return (
    <Box sx={{ margin: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ flexGrow: 1 }}
            />
            <Button onClick={handleSearch} variant="outlined">
              Search
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleSearchClear}
            >
              Clear
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              onClick={() => handleTabChange("official")}
              variant="contained"
              color={queryType === "official" ? "primary" : "disableColor"}
            >
              Official
            </Button>
            <Button
              onClick={() => handleTabChange("participant")}
              variant="contained"
              color={queryType === "participant" ? "primary" : "disableColor"}
            >
              Participant
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button onClick={handleAllMighty} variant="outlined">
              AllMighty Officials
            </Button>
            <Button onClick={handleNotPaidFees} variant="outlined">
              Not Paid Fees Participants
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 2,
            }}
          >
            <Button onClick={openModal} variant="outlined">
              Add Individual
            </Button>
          </Box>
        </Grid>
      </Grid>

      <IndividualCreationModal
        triggerRefetch={triggerRefetch}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <IndividualTable data={individuals} triggerRefetch={triggerRefetch} />
    </Box>
  );
};

export default IndividualView;
