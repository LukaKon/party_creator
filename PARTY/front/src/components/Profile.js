import React, {useEffect} from 'react'
import {Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfile} from "../redux/slices/profileSlice";


export const Profile = () => {
    const dispatch = useDispatch();
    const {entities, loading} = useSelector(
        (state) => state.profile
    );

    useEffect(() => {
        dispatch(fetchProfile());
    }, []);


    let content;
    if (loading) {
        content = <Typography>Fetching in progress...</Typography>;
    } else {
        content = <Typography>
            Twój email : {entities.email}
            Twoje ogłoszenia :
            {entities.announcements.map(ann=>ann)}

        </Typography>
    }
    return (
        <Typography component={"div"}>
            Witaj na stronie Twojego profilu.
            {content}
        </Typography>
    )
}
