import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAnnouncementDetails } from "../../redux/slices/announcementDetailSlice";
import { Grid, Typography } from "@mui/material";

// https://youtu.be/dCbfOZurCQk

export const AnnouncementDetails = () => {
    const { slug } = useParams();
    const { loading, entities, error } = useSelector(
        (state) => state.announcementDetails
    );

    const dispatch = useDispatch();
    // const [data, setData] = useState();

    useEffect(() => {
        // axiosInstance.get(slug).then(res=>)...
        dispatch(fetchAnnouncementDetails(slug));
    }, []);

    // TODO: entities is an object but I have no access to details of it
    console.log("entities: ", entities.id);
    // console.log("title: ");

    return (
        <Grid container>
            <div>TODO: get data from server</div>
            <div>{slug}</div>
            <Grid>
                {/* <Typography>Title: {entities.title}</Typography> */}
            </Grid>
            <Grid>
                <Typography>Description: {}</Typography>
            </Grid>
        </Grid>
    );
};
