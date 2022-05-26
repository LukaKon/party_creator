import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { fetchAnnouncements } from "../../redux/slices/announcementSlice";
import { AnnouncementItem } from "./AnnouncementItem";
import {
    Grid,
    Paper,
    Typography,
    //    makeStyles
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import {AnnouncementSkeleton} from "../skeletons/AnnouncementSkeletons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: "hidden",
        padding: 3,
    },
    paper: {
        maxWidth: 200,
        margin: "1px auto",
        padding: 2,
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
        content = <AnnouncementSkeleton/>
    } else {
        if (!entities) {
            content = (
                <Typography variant="h3">
                    No announcement in data base.
                </Typography>
            );
        } else {
            content = (
                <Typography className={classes.root}>
                    {/* <Paper className={classes.paper}> */}
                    <Grid container spacing={4}>
                        {entities.map((ann) => {
                            return (
                                <>
                                    {/* TODO: Warning: Each child in a list should have a unique "key" prop. Why??? */}
                                    {/* {ann.uuid} */}
                                    <AnnouncementItem key={ann.uuid} {...ann} />
                                </>
                            );
                        })}
                    </Grid>
                    {/* </Paper> */}
                </Typography>
            );
        }
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
