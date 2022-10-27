import React, { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAnnouncementDetails } from "../../redux/slices/announcementDetailSlice";
import { addFavourite, deleteFavourite } from "../../redux/slices/favouriteSlice";
import { AnnouncementDetailsSkeleton } from "../../components/skeletons/AnnouncementSkeletons"
import {
  Box,
  Checkbox,
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  Link,
} from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { fetchProfile } from "../../redux/slices/profileSlice";
import { loged } from "../../utils/loged";
import { getDateObj } from '../../utils/getDateObj'

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

  console.log('*#*#*#*', props)
  return (
    // TODO: category as link to filtering by category
    <h6>{props.get_name}</h6>
  )
}


const FavouriteButton = (props) => {
  const [checkInput, setCheckInput] = useState(() => {
    props.favourites.map(favouriteAnn => {
      if (favouriteAnn.user[0] === userID) {
        return true
      }
    })
    return false
  })

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const userID = useSelector((state) => {
    if (loged) {
      return state.profile.entities['id']
    }
    return null
  })

  const dispatch = useDispatch();

  const addOrRemoveFavourite = (checkInput) => {
    if (checkInput) {
      dispatch(deleteFavourite({ "announcement": props.announcementID }))

      setCheckInput(false)
    } else {
      dispatch(addFavourite({ "user": [userID], "announcement": [props.announcementID] }))
      setCheckInput(true)
    }
  }

  let content
  if (loged) {
    content = (
      <Checkbox icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        defaultChecked={checkInput}
        onClick={() => { addOrRemoveFavourite(checkInput) }} />
    )
  }


  return (
    <Grid item xs={12}>
      {content}
    </Grid>
  )
}


export const AnnouncementDetails = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAnnouncementDetails(slug));
  }, []);

  const { loading, entities, error } = useSelector(
    (state) => state.announcementDetails
  );

  let content


  if (loading) {
    content = <AnnouncementDetailsSkeleton />
  } else {
    if (!entities) {
      content = (<Typography variant="h3">No details!</Typography>)
    } else {

      const date = getDateObj(entities.created)
      const day = date.toLocaleString('pl-PL', { day: '2-digit' })
      const month = date.toLocaleString('pl-PL', { month: 'long' })
      const year = date.getFullYear()

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
                <Typography variant='caption'>
                  Created {day} {month} {year} by: {entities.user.email}
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

            <FavouriteButton
              announcementID={entities.id}
              favourites={entities.announcement_favourites}
            />

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
