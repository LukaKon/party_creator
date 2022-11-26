import React, {useEffect} from "react"
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {handleEmail} from "../redux/slices/profileSlice";


export const ActivateNewEmail = () => {
    const {uid, newEmail, token} = useParams()
    const dispatch = useDispatch()
    const data = new FormData
    useEffect(()=> {
        data.append('uid', uid)
        data.append('new_email', newEmail)
        data.append('token', token)
        data.append('change_or_activation', 'change_email')
        dispatch(handleEmail(data))
    },[])

    return(
        <Grid></Grid>
    )
}