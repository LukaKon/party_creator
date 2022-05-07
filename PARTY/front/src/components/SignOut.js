import React, {useEffect} from 'react'
import {axiosInstance} from "../axios";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


export const SignOut = () => {
    let navigate = useNavigate();

    const handleButton = (event) => {
        event.preventDefault()

        if (event.currentTarget.value === "yes") {
            sessionStorage.removeItem('access_token')
            sessionStorage.removeItem('refresh_token')
            axiosInstance.post('account/logout/')
            navigate('/')
            window.location.reload(true);
        } else {
            navigate('/')
        }
    }


    return (
        <Typography component={"h1"}>
            Are you sure you want to log out?
            <Button value='yes' onClick={handleButton}>Yes</Button>
            <Button value='no' onClick={handleButton}>No</Button>
        </Typography>
    )
}
