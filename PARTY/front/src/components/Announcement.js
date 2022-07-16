import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

//const imgUrl = process.env.IMAGE_URL; // TODO it is not working
const imgUrl = "http://127.0.0.1:8000/api"


export const Announcement = ({ title, description, images }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={imgUrl + images[0].image}
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
