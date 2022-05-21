import React, {useEffect} from 'react'
import {Typography} from "@mui/material";
import {axiosInstance} from "../axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfile} from "../redux/slices/profileSlice";
import {AnnouncementItem} from "./announcement/AnnouncementItem";


export const Profile = () => {
    const dispatch = useDispatch();
    const {entities, loading} = useSelector(
        (state) => state.profile
    );


    useEffect(() => {
        dispatch(fetchProfile({email: 'bartek@gmail.com'}));
    }, []);


    let content;
    if (loading) {
        content = <Typography>Fetching in progress...</Typography>;
    } else {
        content = <Typography>
            Twój email : {entities.email}
        </Typography>
    }

    return (
        <Typography component={"div"}>
            Witaj na stronie Twojego profilu.
            {content}
        </Typography>
    )
}