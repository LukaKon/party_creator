import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { fetchAnnouncements } from "../../redux/slices/announcementSlice";
import { AnnouncementItem } from "./AnnouncementItem";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { AnnouncementSkeleton } from "../skeletons/AnnouncementSkeletons";


export const AnnouncementList = () => {
  const { loading, entities, error } = useSelector(
    (state) => state.announcements
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, []);

  let content;
  if (loading) {
    content = <AnnouncementSkeleton />
  } else {
    if (!entities) {
      content = (
        <Typography variant="h3">
          No announcement in data base.
        </Typography>
      );
    } else {
      content = (
        <Box pa sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {entities.map((ann) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={ann.uuid}>
                  <AnnouncementItem key={ann.uuid} {...ann} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      );
    }
  }
  return <div>{content}</div>;
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
