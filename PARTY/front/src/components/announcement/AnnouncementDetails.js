import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAnnouncementDetails } from "../../redux/slices/announcementDetailSlice";
import {
  Box,
  Grid,
  Typography,
  CardMedia,
  ImageList,
  ImageListItem,
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

  let content
  if (loading) {
    content = <Typography variant="h3">Fetching in progress...</Typography>
  } else {
    if (!entities) {
      content = (<Typography variant="h3">No details!</Typography>)
    } else {
      content = (
        <Box pa sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
            <Grid item xs={8}>
              <Typography variant='h6'>Title: {entities.title}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='caption'>Date: {entities.created.slice(0, 10)}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='caption'>Created by: {entities.user.email}, category: {entities.category.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Description: {entities.description}</Typography>
            </Grid>
            <Grid item xs={8}> 
              Images:
              <ImageList
                sx={{ width: 500, height: 450 }}
                cols={3}
                rowHeight={120}
              />
              {entities.images.map(img => (
                (
                  <ImageListItem key={img.uuid} >
                    <img
                      src={img.image}
                      // srcSet={}
                      alt="description - make it dynamic"
                      loading="lazy"
                    />
                  </ImageListItem>
                )
              ))}
            </Grid>
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
