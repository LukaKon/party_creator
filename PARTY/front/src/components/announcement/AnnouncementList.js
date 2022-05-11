import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { fetchAnnouncements } from "../../features/announcement/announcementSlice";
import { AnnouncementItem } from "./AnnouncementItem";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {Typography} from "@mui/material";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: "hidden",
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 200,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
}));

export const AnnouncementList = () => {
    const classes = useStyles();
    const { loading, entities, error } = useSelector(
        (state) => state.announcements
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAnnouncements());
    }, []);

    let content;
    if (loading) {
        content = <Typography>Fetching in progress...</Typography>;
    } else {
        content = (
            <Typography className={classes.root}>
                {/* <Paper className={classes.paper}> */}
                <Grid container spacing={4}>
                    {entities.map((ann) => (<AnnouncementItem key={ann.uuid} {...ann} />))}
                </Grid>
                {/* </Paper> */}
            </Typography>
        );
    }
    return (
        <Typography>
            List of announcements.
            <br />
            {content}
        </Typography>
    );
};

const mapState = ({ loading, announcements }) => ({
    loading,
    // announcement: announcementReducer.announcements.entities,
    announcements: ["ogłoszenie1", "ogłoszenie2"],
});

export const AnnouncementListContainer = connect(
    mapState
    // mapDispatch
)(AnnouncementList);
