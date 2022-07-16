import React from "react";
import {Typography} from '@mui/material'
import {AnnouncementList} from "./announcement/AnnouncementList";
import {BACKEND_LOCALHOST} from '../../Settings'

export const HomePage = () => {
    return (
        <Typography>
             <img src={BACKEND_LOCALHOST + "media/main.png"}/>
            <AnnouncementList/>
            {sessionStorage.getItem("access_token")
                ? "Zalogowany"
                : "Niezalogowany"}
        </Typography>
    );
};
