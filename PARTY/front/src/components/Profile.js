import React, {useEffect} from 'react'
import {Grid, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {AnnouncementSkeleton} from "./skeletons/AnnouncementSkeletons";
import {AnnouncementItem} from "./announcement/AnnouncementItem";


export const Profile = () => {
    const {entities, loading} = useSelector(
        (state) => state.profile
    );

    let content;
    if (loading) {
        content = <AnnouncementSkeleton/>
    } else {
        content = <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography component="div" variant="h4">
                    Twoje dane:
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography component="div" variant="p">
                    Twój email : {entities.email}
                </Typography>
                <Grid xs={12} textAlign={"center"} variant="p" color={"red"}>
                    <Typography variant={"h3"}>
                        Twoje ogłoszenia
                    </Typography>
                </Grid>

            </Grid>
            {entities.announcements.map((ann) => {
                return (
                    <Grid item xs={2} sm={4} md={4} key={ann.uuid}>
                        <AnnouncementItem key={ann.uuid} {...ann} />
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
