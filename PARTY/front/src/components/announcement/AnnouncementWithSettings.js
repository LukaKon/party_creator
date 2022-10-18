import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Grid,
    Typography,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { BACKEND_LOCALHOST } from "../../../Settings";
import { deleteAnnouncement } from "../../redux/slices/announcementSlice";

export const AnnouncementWithSettings = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = () => {
        navigate("/announcement/" + props.slug);
    };

    const main_image = props.images.filter((item) => {
        return item.is_main === true;
    });

    let render_image;

    const removeAnnouncement = (event, announcementSlug) => {
        const data = {'slug' : announcementSlug}
        dispatch(deleteAnnouncement(data))
        event.target.parentElement.parentElement.parentElement.parentElement.remove()
    }

    if (main_image.length && main_image[0].image.includes(BACKEND_LOCALHOST)) {
        render_image = main_image[0].image;
    }else if(main_image.length){
        console.log(main_image)
        render_image = BACKEND_LOCALHOST + main_image[0].image
    }else {
        render_image = BACKEND_LOCALHOST + "media/announcement/default.jpg";
    }

    return (
        <Card sx={{ display: 'flex', marginBottom: 1, border:"ridge" }}>
            <Grid container>
                <Grid item xs={12} sx={{display: 'flex', flexDirection: 'row'}}>

                    <CardMedia
                    component="img"
                    image={render_image}
                    alt="some image"
                    sx={{ width: 150, height: 150, objectFit: 'contain' }}
                    />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {props.created.slice(0, 10)}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.title}
                        </Typography>
                    </CardContent>

                </Grid>
                
                <Grid item xs={12}>
                    <CardActions sx={{ display: '' }}>
                        <Button variant="outlined" size="small" startIcon={<EditIcon />}>
                          Edytuj
                        </Button>
                        <Button variant="contained" size="small" onClick={handleClick}>
                            Szczegóły
                        </Button>
                        <Button variant="outlined" size="small" color="error"
                                startIcon={<DeleteIcon />} onClick={()=>{removeAnnouncement(event, props.slug)}}>
                          Usuń
                        </Button>
                    </CardActions>
                </Grid>

            </Grid>
        </Card>
    );
};