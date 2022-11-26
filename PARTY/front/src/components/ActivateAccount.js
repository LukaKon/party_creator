import React from 'react'
import {Alert, Button, Grid, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handleEmail} from "../redux/slices/profileSlice";


export const ActivateAccount = () => {
    const {uid, token} = useParams()
    const dispatch = useDispatch()
    let alert

    const handleActivate = () => {
        const data = new FormData
        data.append("uid", uid)
        data.append("token", token)
        data.append('change_or_activation', 'activation')
        dispatch(handleEmail(data))
    }

    const {loading, active, error} = useSelector(state=> state.profile)
    if(!loading && active){
        alert = <Alert severity="success">Your account has been activated. You can to sign in</Alert>
    }else if(!loading && !active){
        alert = <Alert severity="warning">Something went wrong!</Alert>
    }

    return(
        <Grid>
            <Typography variant="h5">
                Click the button to activate your account.
            </Typography>
            {alert}
            <Button variant="contained" onClick={handleActivate}>
                Activate
            </Button>
        </Grid>
    )
}