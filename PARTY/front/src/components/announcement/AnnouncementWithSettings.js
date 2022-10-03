import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import { BACKEND_LOCALHOST } from "../../../Settings";

export const AnnouncementWithSettings = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/announcement/" + props.slug);
    };

    const main_image = props.images.filter((item) => {
        return item.is_main === true;
    });

    let render_image;

    if (main_image.length && main_image[0].image.includes(BACKEND_LOCALHOST)) {
        const link = main_image[0].image;
        render_image = link;
    } else {
        render_image = BACKEND_LOCALHOST + "media/announcement/default.jpg";
    }

    return (
        <Card sx={{ display: 'flex', margin:1, border:"ridge" }}>
            <CardMedia
                component="img"
                height="200"
                image={render_image}
                alt="some image"
                sx={{ width: 200 }}
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
            <CardActions sx={{ display:"", alignItems: 'center', pl: 1, pb: 1 }}>
                <Button variant="outlined" size="small" startIcon={<DeleteIcon />}>
                  Usuń
                </Button>
                <Button variant="outlined" size="small" startIcon={<EditIcon />}>
                  Edytuj
                </Button>
                <Button variant="contained" size="small" onClick={handleClick}>
                    Szczegóły
                </Button>

            </CardActions>
        </Card>
    );
};
