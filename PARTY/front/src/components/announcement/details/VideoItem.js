import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";

export const VideoItem = (props) => {
  const { video_url } = props;
  const embeddedVideoURL = `https://www.youtube.com/embed/${video_url.slice(-11)}`;

  return (
    <Grid container>
      <Grid item>
        <iframe
          width="560"
          height="315"
          src={embeddedVideoURL}
          title="YouTube Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <Typography variant="body2">
          <a href={video_url} underline="hover">
            {video_url}
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
};

VideoItem.propTypes = {
  video_url: PropTypes.string,
};
