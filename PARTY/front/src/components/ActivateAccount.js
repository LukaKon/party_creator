import React, {useEffect, useState} from 'react'
import {Alert, Button, Grid, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {handleEmail} from "../redux/slices/profileSlice";


export const ActivateAccount = () => {
    const {uid, token} = useParams()
    const dispatch = useDispatch()
    const [alert, setAlert] = useState()

    const handleActivate = () => {
        const data = new FormData
        data.append("uid", uid)
        data.append("token", token)
        data.append('change_or_activation', 'activation')
        dispatch(handleEmail(data))
    }

    const {loading, active} = useSelector(state=> state.profile)

    useEffect(()=>{
        if(!loading && active===true){
            setAlert(<Alert severity="success">Your account is activated</Alert>)}
        else if(!loading && active!==true){
            setAlert(<Alert severity="warning">Something went wrong!</Alert>)
    }},[active])

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