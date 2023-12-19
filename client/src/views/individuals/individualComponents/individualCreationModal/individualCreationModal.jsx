import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { isEqual } from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import MaterialFormField from "../../../../components/materialFormField";
import { Form, Formik } from "formik";
import MaterialDatePicker from "../../../../components/materialDatePicker";
import MaterialCheckbox from "../../../../components/materialCheckbox";
import dayjs from "dayjs";
import { Box } from "@mui/system";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const dataFormatter = (data) => {
  const formData = {
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    hiredDate: data.hiredDate
      ? dayjs(data.hiredDate).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),
    staffId: data.staffId || "",
    studentId: data.studentId || "",
    hasPaidFees: data.hasPaidFees || false,
  };
  return formData;
};

const OfficialSection = ({ formData, handleDateChange, handleChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Staff ID"
          type="text"
          name="staffId"
          value={formData.staffId}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12}>
        <MaterialDatePicker
          name={"hiredDate"}
          label={"Hired Date"}
          helperText={"Date hired"}
          value={dayjs(formData.hiredDate)}
          onChange={handleDateChange}
          sx={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
};

const ParticipantSection = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Student ID"
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12}>
        <MaterialCheckbox
          label="Has Paid Fees"
          name="hasPaidFees"
          value={formData.hasPaidFees}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

const AdditionalInfo = ({
  formData,
  mode,
  handleChange,
  handleDateChange,
  activeTab,
  handleTabChange,
  type
}) => {
  if (mode === "edit" && type === "official") {
    return (
      <div>
        <h4>Addtional Information</h4>
        <OfficialSection
          formData={formData}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
        />
      </div>
    );
  } else if (mode === "edit" && type === "participant") {
    return (
      <div>
        <h4>Addtional Information</h4>
        <ParticipantSection formData={formData} handleChange={handleChange} />
      </div>
    );
  }

  return (
    <Box>
      <h4>Addtional Information</h4>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginBottom: 2,
        }}
      >
        <Button
          onClick={() => handleTabChange("official")}
          variant="contained"
          color={activeTab === "official" ? "primary" : "disableColor"}
        >
          Official
        </Button>
        <Button
          onClick={() => handleTabChange("participant")}
          variant="contained"
          color={activeTab === "participant" ? "primary" : "disableColor"}
        >
          Participant
        </Button>
      </Container>
      {activeTab === "official" ? (
        <OfficialSection
          formData={formData}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
        />
      ) : (
        <ParticipantSection formData={formData} handleChange={handleChange} />
      )}
    </Box>
  );
};

const IndividualCreationModal = ({
  data = { individualId: null },
  mode = "create",
  type = "official",
  triggerRefetch,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState(dataFormatter(data));
  const [individualId, setIndividualId] = useState(null);
  const [activeTab, setActiveTab] = useState("official");
  const formRef = useRef(null);

  useEffect(() => {
    setFormData(dataFormatter(data));
    setIndividualId(data?.individualId);
  }, [isOpen]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, hiredDate: date.format("YYYY-MM-DD") });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (formRef.current && !formRef.current.checkValidity()) {
      alert("Please fill in all required fields");
      return;
    }
    if (mode === "edit") {
      const type = formData.studentId ? "participant" : "official";
      if (type === "official") {
        const { name, email, phone, hiredDate, staffId } = formData;
        const data = {
          name,
          email,
          phone,
          hiredDate,
          staffId,
        };
        fetch(`${BACKEND_URL}/individual/official/edit/${individualId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              response.json().then((errorData) => {
                alert(`Error: ${errorData.details}`);
              });
            } else {
              alert("Successfully edited!");
              onClose();
              triggerRefetch();
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error.message);
          });
      } else {
        const { name, email, phone, studentId, hasPaidFees } = formData;
        const data = {
          name,
          email,
          phone,
          studentId,
          hasPaidFees,
        };
        fetch(`${BACKEND_URL}/individual/participant/edit/${individualId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              response.json().then((errorData) => {
                alert(`Error: ${errorData.details}`);
              });
            } else {
              alert("Successfully edited!");
              onClose();
              triggerRefetch();
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error.message);
          });
      }
    } else {
      if (activeTab === "official") {
        const { name, email, phone, hiredDate, staffId } = formData;
        const data = {
          name,
          email,
          phone,
          hiredDate,
          staffId,
        };

        fetch(`${BACKEND_URL}/individual/official/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              response.json().then((errorData) => {
                alert(`Error: ${errorData.details}`);
              });
            } else {
              alert("Successfully added!");
              onClose();
              triggerRefetch();
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error.message);
          });
      } else {
        const { name, email, phone, studentId, hasPaidFees } = formData;
        const data = {
          name,
          email,
          phone,
          studentId,
          hasPaidFees,
        };
        fetch(`${BACKEND_URL}/individual/participant/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              response.json().then((errorData) => {
                alert(`Error: ${errorData.details}`);
              });
            } else {
              alert("Successfully added!");
              onClose();
              triggerRefetch();
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          {mode === "create" ? "Add Individual" : "Edit Individual"}{" "}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              hiredDate: null,
              staffId: "",
              studentId: "",
              hasPaidFees: false,
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid
                  container
                  sx={{
                    gap: 2,
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <MaterialFormField
                      label="Name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={true}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MaterialFormField
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required={true}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MaterialFormField
                      label="Phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required={true}
                      fullWidth
                    />
                  </Grid>

                  <AdditionalInfo
                    formData={formData}
                    mode={mode}
                    handleChange={handleChange}
                    handleDateChange={handleDateChange}
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                    type={type}
                  />

                  <Container
                    sx={{
                      paddingTop: 3,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      sx={{ mr: 2 }}
                    >
                      Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </Container>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IndividualCreationModal;
