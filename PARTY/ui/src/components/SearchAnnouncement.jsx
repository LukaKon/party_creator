import React from 'react'
import {Grid} from "@mui/material";
import {AnnouncementList} from "./announcement/AnnouncementList";
import {useSelector} from "react-redux";

export const SearchAnnouncement = () => {
    const {loading, announcementsFound, error} = useSelector(state => state.announcements);
    
    return(
        <Grid sx={{padding: 1}}>
            <AnnouncementList loading={loading} entities={announcementsFound} error={error}/>
        </Grid>
    )
}