import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import {
  editAnnouncement,
  fetchAnnouncementDetails,
} from "../../../redux/slices/announcementDetailSlice";
import { useInput } from "./hooks/useInput";
import { loged } from "../../../utils/loged";

export const EditAnnouncement = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { loading, entities, error } = useSelector(
    (state) => state.announcementDetails
  );

  useEffect(() => {
    dispatch(fetchAnnouncementDetails(slug));
  }, []);
  console.log('entities: ', entities);

  const {
    value: enteredTitle=entities.title,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "", "");

  let content = <Grid>Loading...</Grid>;
  
  if (!loading) {
  console.log(entities.title)
    content = (
      <Grid item>
        <TextField
          id="title"
          label={enteredTitle}
          name="title"
          placeholder={enteredTitle}
          value={enteredTitle}
        />
      </Grid>
    );
  }

  return (
    <Grid container>
      Edit annoucnement form
      {content}
    </Grid>
  );
};
