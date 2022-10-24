import React from "react";
import {Grid, Typography} from '@mui/material'
import {AnnouncementList} from "./announcement/AnnouncementList";
import {BACKEND_LOCALHOST} from '../../Settings'

export const HomePage = () => {
    return (
        <Grid>
            <Grid>
                <img alt='logo' src={BACKEND_LOCALHOST + "media/main.png"}/>
            </Grid>
            <AnnouncementList/>
            {sessionStorage.getItem("access_token")
                ? "Zalogowany"
                : "Niezalogowany"}
        </Grid>
    );
};
