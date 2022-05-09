import React from "react";
import { Avatar, ButtonBase, Grid, Paper, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: 300,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
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

export const AnnouncementItem = ({ title, description, uuid, created }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            {/* <Grid container wrap="nowrap" spacing={1}> */}
            <Grid container wrap="nowrap" spacing={5}>
                <Grid item xs={5}>
                    <ButtonBase className={classes.image}>
                        <img
                            className={classes.img}
                            alt="complex"
                            src="/static/images/grid/complex.jpg"
                        />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                                {title}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {description}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* </Grid> */}
        </Paper>
    );
};
