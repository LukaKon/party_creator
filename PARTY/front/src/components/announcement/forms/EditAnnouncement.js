import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { FormAnnouncement } from "./FormAnnouncement";

export const EditAnnouncement = () => {
  console.log("edit annoucnement");
  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item>
          <Typography component="h1" variant="h5">
            Edit announcement:
          </Typography>
        </Grid>
        <Grid item>
          <FormAnnouncement />
        </Grid>
      </Grid>
    </Container>
  );
};
