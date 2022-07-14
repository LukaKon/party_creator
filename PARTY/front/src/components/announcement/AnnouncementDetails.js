import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAnnouncementDetails } from "../../redux/slices/announcementDetailSlice";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";

// https://youtu.be/dCbfOZurCQk

export const AnnouncementDetails = () => {
  const { slug } = useParams();
  const { loading, entities, error } = useSelector(
    (state) => state.announcementDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnnouncementDetails(slug));
  }, []);

  // console.log("entities: ", entities);

  let content
  if (loading) {
    content = <Typography variant="h3">Fetching in progress...</Typography>
  } else {
    if (!entities) {
      content = (<Typography variant="h3">No details!</Typography>)
    } else {
      content = (
        <Box pa sx={{ flexGrow: 1 }}>
          <Grid container>
            <Typography variant='h3'>Title: {entities.title}</Typography>
            <Typography variant='caption'>Date: {entities.created.slice(0, 10)}</Typography>
            <Typography variant='caption'>Created by: {entities.user.email}</Typography>
            <Typography variant="body1">Description: {entities.description}</Typography>
          </Grid>
        </Box>
      )
    }
  }

  return (
    <Grid container>
      <div>slug: {slug}</div>
      {content}
    </Grid>
  );
};
