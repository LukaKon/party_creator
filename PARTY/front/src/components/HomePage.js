import React from "react";
import {Typography} from '@mui/material'
import {AnnouncementList} from "./announcement/AnnouncementList";

export const HomePage = () => {
    return (
        <Typography>
             <img src="http://127.0.0.1:8000/api/media/main.png"/>
            <AnnouncementList/>
            {sessionStorage.getItem("access_token")
                ? "Zalogowany"
                : "Niezalogowany"}
        </Typography>
    );
};
