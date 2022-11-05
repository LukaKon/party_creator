import React, {useEffect} from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  Link,
} from "@mui/material";

import { AnnouncementDetailsSkeleton } from "../skeletons/AnnouncementSkeletons"
import { addViewFunction } from "../../utils/functionalComponents/addViewFunction";
import { FavouriteButton } from "../../utils/functionalComponents/addFavourite";
import { fetchProfile } from "../../redux/slices/profileSlice";
import { fetchAnnouncementDetails } from "../../redux/slices/announcementDetailSlice";
import { loged } from "../../utils/loged";
// https://youtu.be/dCbfOZurCQk

const ImageItem = (props) => {

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


const CategoryItem = (props) => {
  return (
    // TODO: category as link to filtering by category
    <h6>{props.get_name}</h6>
  )
}

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
    return null
  })

  let content


  if (loading) {
    content = <AnnouncementDetailsSkeleton />
  } else {
    if (!entities) {
      content = (<Typography variant="h3">No details!</Typography>)
    } else {
      content = (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            direction="column"
            spacing={5}
          >
            <Grid
              item xs={6}
              rowSpacing={9}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item>
                <Typography variant='h6'>Title: {entities.title}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='caption'>Date: {entities.created.slice(0, 10)}</Typography>
              </Grid>

              <Grid item>
                <Typography variant='caption'>
                  Created by: {entities.user.email}
                </Typography>
              </Grid>

              <Grid item>
                  category/ies: {entities.category.map(cat => (
                    <CategoryItem key={cat.uuid} {...cat} />
                  ))}
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
                {entities.images.length > 0
                  ? entities.images.map(img => (
                    <ImageItem key={img.uuid} {...img} />
                  ))
                  : <Typography variant="body2" color="red">No images.</Typography>
                }
              </ImageList>
            </Grid>


            <FavouriteButton
                userID={userID}
                announcementID={entities.id}
                favourite={entities.announcement_favourites}
            />

            <Grid item xs={6}>
              Movies:
              {entities.movies.length > 0
                ? <ul>
                  {entities.movies.map(mov => (
                    <li key={mov.uuid}>
                      <Link underline="hover" to={mov.movie_url}>
                        {mov.movie_url}
                      </Link>
                    </li>
                  ))}
                </ul>
                : <Typography variant="body2" color="red">No movies.</Typography>
              }
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
}
