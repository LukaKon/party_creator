import React from "react";
import {Typography} from '@mui/material'
import {AnnouncementList} from "./announcement/AnnouncementList";

export const HomePage = () => {
    return (
        <Typography>
            {/*<AnnouncementList/>*/}
            {sessionStorage.getItem("access_token")
                ? "Zalogowany"
                : "Niezalogowany"}
        </Typography>
    );
};
