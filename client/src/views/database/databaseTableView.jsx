import React, {useState} from "react";
import {FormHelperText, Grid, MenuItem, Select} from "@mui/material";
import useFetch from "react-fetch-hook";
import DataTable from "./dataTable";

export default function DatabaseTableView() {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const [table, setTable] = useState('');

    const [columns, setColumns] = useState([]);

    const tablesRequest = useFetch(
        `${BACKEND_URL}/database/tables`
    )

    const tableInformationRequest = useFetch(
        `${BACKEND_URL}/database/table/${table}`,
        {
            depends: [table]
        }
    )

    function onChangeTableDropdown(event) {
        setTable(event.target.value);
        setColumns([]);
    }

    function onChangedColumDropdown(event) {
        setColumns(event.target.value);
    }

    return (
        <Grid container>
            <Grid item xs={4}>
                {
                    tablesRequest.isLoading ? <h6>Loading....</h6> :
                        <>
                            <Select label="Table" value={table} onChange={onChangeTableDropdown}>
                                {
                                    tablesRequest.data.map((table) => (<MenuItem key={table.name} value={table.name}>{table.name}</MenuItem>))
                                }
                            </Select>
                            <FormHelperText>Table Selection</FormHelperText>
                        </>
                }
            </Grid>
            <Grid item xs={4}>
                {
                    table === '' ? <h6>Select a table first!</h6> : tableInformationRequest.isLoading ? <h6>Loading....</h6> :
                        tableInformationRequest.data === undefined ? <>Error</> :
                        <>
                            <Select multiple label="Table" value={columns} onChange={onChangedColumDropdown}>
                                {
                                    tableInformationRequest.data.map((column) => (<MenuItem key={column.name} value={column.name}>{column.name}</MenuItem>))
                                }
                            </Select>
                            <FormHelperText>Table Selection</FormHelperText>
                        </>
                }
            </Grid>
            <Grid item xs={12}>
                {
                    table !== undefined && columns.length > 0 ? <DataTable table={table} columns={columns} /> : <h6>Waiting for selections.</h6>
                }
            </Grid>
        </Grid>

    );

}