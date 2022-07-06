import React from "react";
import {
    // Avatar,
    // ButtonBase,
    // Paper,
    Grid,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    // makeStyles,
} from "@mui/material";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: 400,
        margin: "1px auto",
        padding: 2,
        background: "#d0f4f9",
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    },
}));

export const AnnouncementItem = (
  props
  // {
    // title,
    // uuid,
    // created,
    // category,
    // images,
// }
) => {
  
  const main_image = props.images.filter((item) => {
     return item.is_main==true
    })
  

  let render_image
  if(main_image.length){
      const link = main_image[0].image
      render_image=link
    }else{
        render_image="http://127.0.0.1:8000/media/default.jpg"
    }

  return (
    <Card sx={{ maxWidth: 550 }}>
      <CardMedia 
        component="img"
        height="140"
        image={render_image}
        alt="some image"
      />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {props.title}
          </Typography>
          <Typography variant="body1">
          {props.category.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {props.created.slice(0,10)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Link to details</Button>
        </CardActions>
    </Card>
  )
  //   const classes = useStyles();
  //
  // // let created_date= created.slice(0,8)
  //   return (
  //       <Paper className={classes.paper}>
  //           {/* <Grid container wrap="nowrap" spacing={1}> */}
  //           <Grid container wrap="nowrap" spacing={5}>
  //               <Grid item xs={5}>
  //                   <ButtonBase className={classes.image}>
  //                       <img className={classes.img} alt="complex" src="" />
  //                   </ButtonBase>
  //               </Grid>
  //               <Grid item xs={12} sm container>
  //                   <Grid item xs container direction="column" spacing={2}>
  //                       <Grid item xs>
  //                           <Typography gutterBottom variant="subtitle2">
  //                               {title}
  //                           </Typography>
  //                           {/* <Typography variant="body1" gutterBottom> */}
  //                               {/* {description} */}
  //                           {/* </Typography> */}
  //                           <Typography variant="h6">
  //                                 {/* cat: {category} */}
  //                           </Typography>
  //                           <Typography variant="caption">
  //                                created: {created}
  //                           </Typography>
  //                       </Grid>
  //                   </Grid>
  //               </Grid>
  //           </Grid>
  //       </Paper>
  //   );
};
