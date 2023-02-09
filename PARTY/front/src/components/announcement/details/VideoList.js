import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";

VideoItem.propTypes = {
  videoUrl: PropTypes.string,
};

const VideoItem = (props) => {
  const { videoUrl } = props;
  const embeddedVideoURL = `https://www.youtube.com/embed/${videoUrl.slice(-11)}`;

  return (
    <Grid container>
      <Grid item>
        <iframe
          width="560"
          height="315"
          src={embeddedVideoURL}
          title="YouTube Video Playre"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <Typography variant="body2">
          <a href={videoUrl} underline="hover">
            {videoUrl}
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
};

VideoList.propTypes = {
  listOfVideos: PropTypes.object,
};

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
