import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAnnouncementDetails } from "../../redux/slices/announcementDetailSlice";
import { Grid, Typography } from "@mui/material";

// https://youtu.be/dCbfOZurCQk

export const AnnouncementDetails = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    // const [data, setData] = useState();
    useEffect(() => {
        // axiosInstance.get(slug).then(res=>)...
        dispatch(fetchAnnouncementDetails(slug));
    }, []);
    console.log("slug: ", slug);
    // console.log("title: ");
    return (
        <Grid container>
            <div>TODO: get data from server</div>
            <div>{slug}</div>
            <Grid>
                <Typography>Title: {}</Typography>
            </Grid>
            <Grid>
                <Typography>Description: {}</Typography>
            </Grid>
        </Grid>
    );
};
