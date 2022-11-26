import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { fetchAnnouncementDetails } from "../../redux/slices/announcementDetailSlice";
import {
  addFavourite,
  deleteFavourite,
} from "../../redux/slices/favouriteSlice";
import { AnnouncementDetailsSkeleton } from "../../components/skeletons/AnnouncementSkeletons";
import { CreateUpdateDate } from "./CreateUpdateDate";

import {
  Box,
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  // Link,
} from "@mui/material";
import { Link } from "react-router-dom";
// import { AnnouncementDetailsSkeleton } from "../skeletons/AnnouncementSkeletons"
import { addViewFunction } from "../../utils/functionalComponents/addViewFunction";
import { FavouriteButton } from "../../utils/functionalComponents/addFavourite";
import { fetchProfile } from "../../redux/slices/profileSlice";
import { fetchAnnouncementDetails } from "../../redux/slices/announcementDetailSlice";
import { loged } from "../../utils/loged";
// https://youtu.be/dCbfOZurCQk

const ImageItem = (props) => {
  const style_is_main = { padding: 1, border: 3, borderColor: "lightgreen" };
  const style_default = { padding: 1, border: 3, borderColor: "lightgrey" };

  return (
    <Link to={props.image} underline="none">
      <ImageListItem
        key={props.uuid}
        sx={props.is_main === true ? style_is_main : style_default}
      >
        <img
          src={props.image}
          alt="description - make it dynamic"
          loading="lazy"
        />
      </ImageListItem>
    </Link>
  );
};

const CategoryItem = (props) => {
  return (
    <Link
      key={props.uuid}
      to={"/categories/" + props.get_name}
      state={{ categoryUuid: props.uuid }}
    >
      <ListItem>
        <ListItemText primary={props.get_name} />
      </ListItem>
    </Link>
  );
};

export const AnnouncementDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { loading, entities, error } = useSelector(
      (state) => state.announcementDetails
    );

  useEffect(() => {
    dispatch(fetchAnnouncementDetails(slug));
    dispatch(fetchProfile());
  }, []);

  useEffect(()=> {
    if(entities){
      addViewFunction({"announcementID": entities.id, "dispatch": dispatch})
    }
  },[entities])

  const userID = useSelector((state) =>
  {
    if (loged){
      return state.profile.entities['id']
    }
    return null;
  });

  let content;
   if (loading) {
    content = <AnnouncementDetailsSkeleton />;
  } else {
    if (!entities) {
      content = <Typography variant="h3">No details!</Typography>;
    } else {
      content = (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container direction="column" spacing={5}>
            <Grid
              item
              xs={6}
              rowSpacing={9}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item>
                <Typography variant="h6">Title: {entities.title}</Typography>
              </Grid>

              <Grid item>
                <CreateUpdateDate entities={entities} />
              </Grid>

              <Grid item>
                category/ies:
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {entities.category.map((cat) => (
                     <CategoryItem key={cat.uuid} {...cat} />
                  ))}
                  </List>                
              </Grid>

              <Grid item>
              <Typography variant='caption'>
                  Created by: {entities.user.email}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body1">
                  Description: {entities.description}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              Images:
              <ImageList
                sx={{ width: 200, height: 150 }}
                cols={3}
                rowHeight={120}
              >
                {entities.images.length > 0 ? (
                  entities.images.map((img) => (
                    <ImageItem key={img.uuid} {...img} />
                  ))
                ) : (
                  <Typography variant="body2" color="red">
                    No images.
                  </Typography>
                )}
              </ImageList>
            </Grid>

            <Grid item xs={6}>
              Movies:
              {entities.movies.length > 0 ? (
                <ul>
                  {entities.movies.map((mov) => (
                    <li key={mov.uuid}>
                      <a href={mov.movie_url} underline="hover">
                        {mov.movie_url}
                        </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body2" color="red">
                  No movies.
                </Typography>
              )}
            </Grid>

            <FavouriteButton
                userID={userID}
                announcementID={entities.id}
                favourite={entities.announcement_favourites}
            />

          </Grid>
        </Box>
      );
    }
  }

  return (
    <Grid item xs={12}>
      {content}
    </Grid>
  );
};
