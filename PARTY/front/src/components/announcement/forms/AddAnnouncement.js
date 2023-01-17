import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { FormAnnouncement } from "./FormAnnouncement";

export const AddAnnouncement = () => (
  <Container component="main" maxWidth="xs">
    <Grid container spacing={2}>
      <Grid item>
        <Typography component="h1" variant="h5">
          Add announcement:
        </Typography>
      </Grid>

      <Grid item>
        <FormAnnouncement />
      </Grid>
    </Grid>
  </Container>
);
