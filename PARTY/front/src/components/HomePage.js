import React, {useEffect} from "react";
import {Grid} from '@mui/material'
import {AnnouncementList} from "./announcement/AnnouncementList";
import {BACKEND_LOCALHOST} from '../../Settings'
import {useDispatch, useSelector} from "react-redux";

import {fetchAnnouncements} from "../redux/slices/announcementSlice";

export const HomePage = () => {

    const { loading, entities, error } = useSelector(
        (state) => state.announcements
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAnnouncements({main_page: true}))
    }, []);

    return (
        <Grid>
            <Grid>
                <img alt='logo' src={BACKEND_LOCALHOST + "media/main.png"}/>
            </Grid>
            <AnnouncementList loading={loading} entities={entities} error={error}/>
            {sessionStorage.getItem("access_token")
                ? "Zalogowany"
                : "Niezalogowany"}
        </Grid>
    );
};
