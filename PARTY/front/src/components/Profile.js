import React, {useEffect} from 'react'
import {Grid, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {Announcement} from "./Announcement";
import {AnnouncementSkeleton} from "./skeletons/AnnouncementSkeletons";
import {AnnouncementItem} from "./announcement/AnnouncementItem";


export const Profile = () => {
    const {entities, loading} = useSelector(
        (state) => state.profile
    );

    const handleAnnouncement = () => {
        // navigate('/')
    }


    let content;
    if (loading === true || loading === 'before') {
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
                <Typography variant="p">
                    Twoje ogłoszenia :
                </Typography>

            </Grid>
            {entities.announcements.map((ann) => {
                            return (

                                <Grid item xs={2} sm={4} md={4} key={ann.uuid}>
                                    <AnnouncementItem key={ann.uuid} {...ann} />
                                </Grid>
                            );
            })}

            {/*<Grid item container xs={12}>*/}
            {/*    {entities.announcements.map(ann => {*/}
            {/*        return (*/}
            {/*            <Grid item key={ann.title + '1'} xs={12} md={6}>*/}
            {/*                <Announcement {...ann}/>*/}
            {/*            </Grid>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</Grid>*/}

        </Grid>
        // console.log(Object.keys(entities.announcements).map((key) => [Number(key), entities.announcements[key]]));
    }


    return (
        <Grid>
            {content}
        </Grid>
    )
}
