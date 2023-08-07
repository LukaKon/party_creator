import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, CardActions, CardContent, CardMedia, Button, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteAnnouncement } from "../../redux/slices/announcementDetailSlice";

const LOCALHOST = import.meta.env.LOCALHOST

export const AnnouncementWithSettings = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`/announcement/${props.slug}`);
  };

  console.log("props in settings: ", props);
  const handleEdit = () => {
    navigate(`/editannouncement/${props.slug}`, { state: { entities: props } });
  };

  const main_image = props.images.filter((item) => {
    return item.is_main === true;
  });

  let render_image;

  if (main_image.length && main_image[0].image.includes(LOCALHOST)) {
    render_image = main_image[0].image;
  } else if (main_image.length) {
    console.log(main_image)
    render_image = LOCALHOST + main_image[0].image
  } else {
    render_image = LOCALHOST + "/media/announcement/defaultAnnouncement.jpg";
  }

  const removeAnnouncement = (event, announcementSlug) => {
    const data = { slug: announcementSlug };
    dispatch(deleteAnnouncement(data));
    event.target.parentElement.parentElement.parentElement.parentElement.remove();
  };

  console.log("image path: ", render_image);

  return (
    <Card sx={{ display: "flex", marginBottom: 1, border: "ridge" }}>
      <Grid container>
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia
            component="img"
            image={render_image}
            alt="some image"
            sx={{ width: 150, height: 150, objectFit: "contain" }}
          />

          <CardContent>
            <Grid container>
              <Grid item xs={5}>
                <Typography variant="caption" color="text.secondary">
                  {props.created.slice(0, 10)}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {props.title}
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <Typography variant="body2">{props.description}</Typography>
              </Grid>

              <Grid container item xs={2}>
                <Grid item xs={6}>
                  Likes: {props.announcement_favourites.length}
                </Grid>
                <Grid xs={12}></Grid>
                <Grid item xs={6}>
                  Views: {props.views.length}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>

        <Grid item xs={12}>
          <CardActions sx={{ display: "" }}>
            <Button variant="outlined" size="small" onClick={handleEdit} startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button variant="contained" size="small" onClick={handleClick}>
              Details
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => {
                removeAnnouncement(event, props.slug);
              }}
            >
              Delete
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
