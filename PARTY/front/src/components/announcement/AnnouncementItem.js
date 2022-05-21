import React from "react";
import {
    Avatar,
    ButtonBase,
    Paper,
    Grid,
    Typography,
    // makeStyles,
} from "@mui/material";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: 300,
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

export const AnnouncementItem = ({
    title,
    description,
    uuid,
    created,
    category,
}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            {/* <Grid container wrap="nowrap" spacing={1}> */}
            <Grid container wrap="nowrap" spacing={5}>
                <Grid item xs={5}>
                    <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="complex" src="" />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                                {title}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {description}
                            </Typography>
                            <Typography variant="body2">
                                cat: {category}
                            </Typography>
                            <Typography variant="body2">
                                date: {created}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
