import React from "react";
import { AnnouncementItem } from "./AnnouncementItem";
import { Box, Grid, Typography } from "@mui/material";
import { AnnouncementSkeleton } from "../skeletons/AnnouncementSkeletons";


export const AnnouncementList = (props) => {
    const { loading, entities, error } = props

  let content;
  if (loading) {
    content = <AnnouncementSkeleton />;
  } else {
    if (!entities) {
      content = (
        <Typography variant="h3">No announcement in data base.</Typography>
      );
    } else {
      content = (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {entities.map((ann) => {
              return (
                <Grid item xs={6} sm={6} md={4} key={ann.uuid}>
                  <AnnouncementItem key={ann.uuid} {...ann} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      );
    }
  }
  return <Grid>{content}</Grid>;
};
