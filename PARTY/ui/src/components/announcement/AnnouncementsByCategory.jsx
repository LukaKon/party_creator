import React, { useEffect } from 'react';
import { Box, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnnouncements } from "../../redux/slices/announcementSlice";
import { AnnouncementItem } from "./AnnouncementItem";
import { AnnouncementSkeleton } from "../skeletons/AnnouncementSkeletons";

export const AnnouncementsByCategory = () => {
  const location = useLocation()
  const { categoryUuid } = location.state
  const dispatch = useDispatch();
  let content
  const announcements = useSelector(state => state.announcements);

  useEffect(() => {
    dispatch(fetchAnnouncements({ category: categoryUuid }))
  }, [categoryUuid])


  if (announcements.loading) {
    content = (<AnnouncementSkeleton />)
  } else if (announcements.entities.length > 0 && announcements.loading === false) {
    content = (
      <Grid marginTop={1}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {announcements.entities.map((ann) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={ann.uuid}>
                <AnnouncementItem key={ann.uuid} {...ann} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  } else {
    content = (<Typography variant="h3">No announcement in this category.</Typography>)
  }

  return (
    <Box spacing={{ xs: 2, md: 3 }}>
      {content}
    </Box>
  )
}
