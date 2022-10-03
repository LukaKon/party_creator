import React from 'react'
import {Grid, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {AnnouncementSkeleton} from "./skeletons/AnnouncementSkeletons";
import {AnnouncementWithSettings} from "./announcement/AnnouncementWithSettings";


export const MyAnnouncements = () => {
    const {entities, loading} = useSelector(
        (state) => state.profile
    );

    let content;
    if (loading) {
        content = <AnnouncementSkeleton/>
    } else {
        content = <Grid container marginTop={1} marginLeft={1}>

            <Grid item xs={12} marginBottom={2}>
                <Typography variant={"h4"}>
                    Moje ogłoszenia
                </Typography>
            </Grid>

            {entities.announcements.map((ann) => {
                return (
                    <Grid item xs={12}key={ann.uuid}>
                        <AnnouncementWithSettings key={ann.uuid} {...ann} />
                    </Grid>
                );
            })}
        </Grid>
    }

    return (
        <Grid>
            {content}
        </Grid>
    )
}
