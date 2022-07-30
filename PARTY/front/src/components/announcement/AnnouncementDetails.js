import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAnnouncementDetails } from "../../redux/slices/announcementDetailSlice";
import { AnnouncementDetailsSkeleton } from "../../components/skeletons/AnnouncementSkeletons"
import {
  Box,
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  Link
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
    content = <AnnouncementDetailsSkeleton />
  } else {
    if (!entities) {
      content = (<Typography variant="h3">No details!</Typography>)
    } else {
      content = (
        <Box pa sx={{ flexGrow: 1 }}>
          <Grid
            container
            direction="column"
            spacing={5}
          >
            <Grid
              item xs={6}
              rowSpacing={9}
              columntSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item>
                <Typography variant='h6'>Title: {entities.title}</Typography>
              </Grid>
              <Grid item>
                <Typography variant='caption'>Date: {entities.created.slice(0, 10)}</Typography>
              </Grid>
              <Grid item>
                <Typography variant='caption'>Created by: {entities.user.email}, category: {entities.category.name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Description: {entities.description}</Typography>
              </Grid>
            </Grid>


            <Grid item xs={6}>
              Images:
              <ImageList
                sx={{ width: 200, height: 150 }}
                cols={3}
                rowHeight={120}
              >
                {entities.images.map(img => (
                  <ImageItem key={img.uuid} {...img} />
                ))}
              </ImageList>
            </Grid>

          </Grid>
        </Box>
      )
    }
  }

  return (
    <Grid container>
      {content}
    </Grid>
  );
};

const ImageItem = (props) => {
  // console.log('props: ',props)

  return (
    <Link href={props.image} underline="none">
      <ImageListItem key={props.uuid} >
        <img
          src={props.image}
          // srcSet={}
          alt="description - make it dynamic"
          loading="lazy"
        />
      </ImageListItem>
    </Link>
  )
}
