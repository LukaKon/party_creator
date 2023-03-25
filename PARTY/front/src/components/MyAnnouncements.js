import React, { useEffect } from "react";
import { Grid, Typography, Alert, AlertTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AnnouncementSkeleton } from "./skeletons/AnnouncementSkeletons";
import { AnnouncementWithSettings } from "./announcement/AnnouncementWithSettings";
import { fetchProfile } from "../redux/slices/profileSlice";

export const MyAnnouncements = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const { entities, loading } = useSelector((state) => state.profile);
  // console.log("entities in MyAnnouncements: ", entities);

  let content;

  if (loading) {
    content = <AnnouncementSkeleton />;
  } else if (entities.announcements.length <= 0) {
    content = (
      <Alert severity="info">
        <AlertTitle>Information!</AlertTitle>
        No announcements -{" "}
        <strong>
          <Link to="/addannouncement">Add new announcement.</Link>
        </strong>
      </Alert>
    );
  } else {
    content = (
      <Grid container>
        {entities.announcements.map((ann) => {
          return (
            <Grid item xs={12} key={ann.uuid}>
              <AnnouncementWithSettings key={ann.uuid} {...ann} />
            </Grid>
          );
        })}
      </Grid>
    );
  }

  return (
    <Grid container padding={1}>
      <Grid item xs={12} marginBottom={2}>
        <Typography variant={"h4"}>My announcements:</Typography>
      </Grid>
      {content}
    </Grid>
  );
};
