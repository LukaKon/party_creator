import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { VideoItem } from "./VideoItem";

export const VideoList = (props) => {
    const { listOfVideos } = props;

    let content = (
      <Typography variant="body2" color="red">
        No movies.
      </Typography>
    );

    if (listOfVideos.length > 0) {
      content = (
        <Grid container>
          {props.listOfVideos.map((video) => (
            <Grid item key={video.uuid}>
              <VideoItem key={video.uuid} video_url={video.movie_url} />
            </Grid>
          ))}
        </Grid>
      );
    }

    return (
      <Grid container>
        <Typography variant="body1">Movies:</Typography>
        <Grid item>{content}</Grid>
      </Grid>
    );
};

VideoList.propTypes = {
  listOfVideos: PropTypes.array,
};
