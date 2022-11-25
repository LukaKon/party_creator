import React from "react"
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";


export const ActivateNewEmail = () => {
    const {uid, newEmail, token} = useParams()
    const dispatch = useDispatch()

    dispatch()
    return(
        <Grid></Grid>
    )
}