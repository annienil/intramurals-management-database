import React, { useState } from "react";
import IndividualCreationModal from "../individualCreationModal/individualCreationModal";
import { DataGrid } from "@mui/x-data-grid";
import { set } from "lodash";
import { Button } from "@mui/material";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const IndividualTable = ({ data, triggerRefetch }) => {
  const columnNames = data.length > 0 ? Object.keys(data[0]) : [];
  const formattedData = data.map((item) => ({
    ...item,
    hiredDate: new Date(item.hiredDate).toLocaleDateString(),
    hasPaidFees: item.hasPaidFees ? "Yes" : "No",
    isActive: item.isActive ? "Yes" : "No",
  }));

  const [isModalOpen, setModalOpen] = useState(false);
  const [individualSelected, setIndividualSelected] = useState(null);
  const [editIndividualType, setEditIndividualType] = useState("official");


  const closeModal = () => setModalOpen(false);

  const handleDelete = (individual) => {
    const id = individual.individualId;
    fetch(`${BACKEND_URL}/individual/delete/${id}`, {
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
        triggerRefetch();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editIndividual = (individual) => {
    setEditIndividualType(individual.staffId? "official" : "participant")
    setIndividualSelected(individual);
    setModalOpen(true);
  }

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
          onClick={() => editIndividual({ ...params.row, 
            hasPaidFees: params.row.hasPaidFees === "Yes", 
            isActive: params.row.isActive === "Yes"})}
          variant="outlined"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(params.row)}
          variant="outlined"
          color="error"
          sx={{ marginLeft: 1 }}
        >
          Delete
        </Button>
      </div>
    ),
  });


  return (
    <div>
      <div className="table-container">
        <DataGrid
          sx={{
            height: 370,
          }}
          rows={
            formattedData.length > 0
              ? formattedData.map((item) => ({
                  ...item,
                  id: item.individualId,
                }))
              : []
          }
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          autoHeight={false}
        />
      </div>

      <IndividualCreationModal
        data={individualSelected || {individualId: null}}
        triggerRefetch={triggerRefetch}
        isOpen={isModalOpen}
        onClose={closeModal}
        mode="edit"
        type={editIndividualType}
      />
    </div>
  );
};

export default IndividualTable;
