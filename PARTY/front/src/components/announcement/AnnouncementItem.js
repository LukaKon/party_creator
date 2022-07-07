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

const LOCALHOST = process.env.REACT_LOCALHOST;

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         maxWidth: 400,
//         margin: "1px auto",
//         padding: 2,
//         background: "#d0f4f9",
//     },
//     image: {
//         width: 128,
//         height: 128,
//     },
//     img: {
//         margin: "auto",
//         display: "block",
//         maxWidth: "100%",
//         maxHeight: "100%",
//     },
// }));

export const AnnouncementItem = (props) => {
    const main_image = props.images.filter((item) => {
        return item.is_main == true;
    });

    let render_image;
    if (main_image.length) {
        const link = main_image[0].image;
        render_image = link;
    } else {
        render_image = LOCALHOST + "/media/announcement/default.jpg";
    }

    return (
        <Card sx={{ maxWidth: 400 }}>
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
                <Typography variant="body1">{props.category.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.created.slice(0, 10)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    href={"/announcements/" + props.slug + "/"}
                >
                    Link to details
                </Button>
            </CardActions>
        </Card>
    );
};
