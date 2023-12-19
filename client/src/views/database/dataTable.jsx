import React from "react";
import useFetch from "react-fetch-hook";
import {List, ListItem, ListItemText} from "@mui/material";


export default function DataTable({table, columns}) {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const dataRequest = useFetch(
        `${BACKEND_URL}/database/${table}/${columns.toString()}`,
        {
            method: "GET"
        }
    )



    return (
        <>
            {
                dataRequest.isLoading ? <h6>Loading....</h6> : dataRequest.data === undefined ? <h6>Error: {dataRequest.error.toString()}</h6> :
                    <List>
                        {
                            dataRequest.data.map((instance, index) => (
                                <ListItem key={index}>
                                    {Object.entries(instance).map((keyValue, index) => (
                                        <ListItemText><b>{keyValue[0]}</b>: {keyValue[1]}</ListItemText>
                                    ))}
                                </ListItem>
                            ))
                        }
                    </List>
            }
        </>
    );

}