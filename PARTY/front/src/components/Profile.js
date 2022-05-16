import React, {useState} from 'react'
import {Typography} from "@mui/material";
import {axiosInstance} from "../axios";


export const Profile = () => {
    const downloadProfile = () => {
        let test = null
        axiosInstance.get('profile/')
            .then(response => test = response)
        return test
    }
    const [profile, setProfile] = useState(downloadProfile())



    return(
        <Typography component={'p'}>
            Profile
            {profile}
        </Typography>
    )
}