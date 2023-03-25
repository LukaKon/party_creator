import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Grid, ImageList, List, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { addViewFunction } from "../../../utils/functionalComponents/addViewFunction";
import { FavouriteButton } from "../../../utils/functionalComponents/addFavourite";
import { fetchProfile } from "../../../redux/slices/profileSlice";
import {
  deleteAnnouncement,
  fetchAnnouncementDetails,
} from "../../../redux/slices/announcementDetailSlice";
import { loged } from "../../../utils/loged";
import { AnnouncementDetailsSkeleton } from "../../skeletons/AnnouncementSkeletons";
import { CreateUpdateDate } from "../CreateUpdateDate";
import { CategoryItem } from "./CategoryItem";
import { VideoList } from "./VideoList";
import { ImageItem } from "./ImageItem";

// TODO : verify if logged user is owner of announcement

export const AnnouncementDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, entities, error } = useSelector((state) => state.announcementDetails);

  useEffect(() => {
    dispatch(fetchAnnouncementDetails(slug));
    dispatch(fetchProfile());
  }, []);


  useEffect(() => {
    if (entities) {
      addViewFunction({ announcementID: entities.id, dispatch });
    }
  }, [entities]);

  const userID = useSelector((state) => {
    if (loged) {
      return state.profile.entities["id"];
    }
    return null;
  });

  const openChat = () => {
    navigate("/chat/", {
      state: {
        sellerID: entities.user.id,
        announcementID: entities.id,
        customerID: userID,
      },
    });
  };

  const handleEditButton = (data) => {
    navigate(`/editannouncement/${data.slug}`, { state: { entities } });
  };

  const handleDeleteButton = (data) => {
    // TODO: finish delete functionality
    // TODO: change status to inactive - don't delete from DB
    // console.log("######in delete: ", data.slug);
    dispatch(deleteAnnouncement(data.slug));
    navigate(`/myannouncements`);
  };

  let buttons;
  // Adding buttons if user is logged
  if (loged) {
    buttons = (
      <Grid container>
        <Grid item>
          <Button variant="contained" onClick={() => openChat()}>
            Send Message
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleEditButton(entities)}
            variant="outlined"
            size="small"
            color="primary"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleDeleteButton(entities)}
            variant="outlined"
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    );
  }

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
            <Grid item xs={6} rowSpacing={9} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item>
                <Typography variant="h6">Title: {entities.title}</Typography>
              </Grid>

              <Grid item>{buttons}</Grid>

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
                <Typography variant="body1">
                  Description:
                  {entities.description}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              Images:
              <ImageList
                sx={{
                  width: 500,
                  height: 450,
                }}
                cols={3}
                rowHeight={164}
              >
                {entities.images.length > 0 ? (
                  entities.images.map((img) => <ImageItem key={img.uuid} {...img} />)
                ) : (
                  <Typography variant="body2" color="red">
                    No images.
                  </Typography>
                )}
              </ImageList>
            </Grid>

            <Grid item xs={8}>
              <VideoList listOfVideos={entities.movies} />
            </Grid>
            <Grid item>
              <FavouriteButton
                userID={userID}
                announcementID={entities.id}
                favourite={entities.announcement_favourites}
              />
            </Grid>
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
