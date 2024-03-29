import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const LOCALHOST = import.meta.env.LOCALHOST

export const AnnouncementItem = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/announcement/${props.slug}`);
  };

  const main_image = props.images.filter((item) => {
    return item.is_main === true;
  });

  let render_image;

  if (main_image.length && main_image[0].image.includes(LOCALHOST)) {
    const link = main_image[0].image;
    render_image = link;
  } else {
    render_image = LOCALHOST + "/media/announcement/defaultAnnouncement.jpg";
  }

  return (
    <Card onClick={handleClick} sx={{ maxWidth: 400 }}>
      <CardMedia component="img" height="140" image={render_image} alt="some image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body1">{props.category.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {props.created.slice(0, 10)}
        </Typography>
      </CardContent>
    </Card>
  );
};
