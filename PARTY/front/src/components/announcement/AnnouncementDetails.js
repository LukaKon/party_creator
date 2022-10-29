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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from 'react-router-dom'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { fetchProfile } from "../../redux/slices/profileSlice";
import { loged } from "../../utils/loged";
import { getDateObj } from '../../utils/getDateObj'

// https://youtu.be/dCbfOZurCQk

const ImageItem = (props) => {

  return (
    <Link to={props.image} underline="none">
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
    <Link key={props.uuid} to={'/categories/' + props.get_name} state={{ categoryUuid: props.uuid }} >
      <ListItem>
        <ListItemText
          primary={props.get_name}
        />
      </ListItem>
    </Link>
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
      console.log(entities.created === entities.updated, entities.created, entities.updated)

      const created_date = getDateObj(entities.created)
      const day = created_date.toLocaleString('pl-PL', { day: '2-digit' })
      const month = created_date.toLocaleString('pl-PL', { month: 'long' })
      const year = created_date.getFullYear()

      let modified = false
      let update_day
      let update_month
      let update_year

      if (entities.created.slice(0, 20) !== entities.updated.slice(0, 20)) {

        const updated_date = getDateObj(entities.updated)
        update_day = updated_date.toLocaleString('pl-PL', { day: '2-digit' })
        update_month = updated_date.toLocaleString('pl-PL', { month: 'long' })
        update_year = updated_date.getFullYear()
        modified = true
      }

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
                  Created: {day} {month} {year} {modified
                    && `updated: ${update_day} ${update_month} ${update_year}`} by: {entities.user.email}
                </Typography>
              </Grid>

              <Grid item>
                category/ies:
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  {entities.category.map(cat => (
                    <CategoryItem key={cat.uuid} {...cat} />
                  ))}
                </List>
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
                      <a href={mov.movie_url} underline="hover" >
                        {mov.movie_url}
                      </a>
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
