import { Grid, Typography } from "@mui/material";

const VideoItem = (props) => {
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
          frameBorder="0"
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

const VideoList = (props) => {
  let content = (
    <Typography variant="body2" color="red">
      No movies.
    </Typography>
  );
  if (props.listOfVideos.length > 0) {
    content = (
      <Grid container>
        {props.listOfVideos.map((video) => (
          <Grid item>
            <VideoItem key={video.uuid} video_url={video.movie_url} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <>
      <Typography variant="body1">Movies:</Typography>
      <Grid>{content}</Grid>
    </>
  );
};
