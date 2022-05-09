import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { fetchAnnouncements } from "../../features/announcement/announcementSlice";
import { AnnouncementItem } from "./AnnouncementItem";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    // console.log("-----entities: ", entities);
    const dispatch = useDispatch();

    // const loading = useSelector((state) => state.announcements.loading);
    // console.log("loading state: ", loading);

    useEffect(() => {
        dispatch(fetchAnnouncements());
    }, []);

    let content;
    if (loading) {
        content = <div>Fetching in progress...</div>;
    } else {
        content = (
            <div className={classes.root}>
                {/* <Paper className={classes.paper}> */}
                <Grid container spacing={4}>
                    {entities.map((ann) => (
                        <AnnouncementItem key={ann.uuid} {...ann} />
                    ))}
                </Grid>
                {/* </Paper> */}
            </div>
        );
    }
    return (
        <div>
            List of announcements.
            <br />
            {content}
        </div>
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
