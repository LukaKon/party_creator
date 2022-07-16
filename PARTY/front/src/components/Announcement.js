import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { BACKEND_LOCALHOST } from "../../Settings"

export const Announcement = ({ title, description, images }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={BACKEND_LOCALHOST + images[0].image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" maxHeight={20}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
