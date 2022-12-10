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
// import { } './formUtils'

export const EditAnnouncement = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { loading, entities, error } = useSelector(
    (state) => state.announcementDetails
  );

  useEffect(() => {
    dispatch(fetchAnnouncementDetails(slug));
  }, []);

  const []=useState(entities)

  const {
    value: enteredTitle,
    setValue: setEnteredValue,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "", "");

  let formIsValid = false

  let content = <Grid>Loading...</Grid>;

  if (!loading) {
    console.log('title: ', enteredTitle)
    content = (
      <Grid item>
        <TextField
          id="title"
          label='Title'
          name="title"
          placeholder={enteredTitle}
          defaultValue={entities.title}
          onChange={(e) => setEnteredValue(e.target.value)}
        />
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid>Edit annoucnement form</Grid>
      {content}
    </Grid>
  );
};
