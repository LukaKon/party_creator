import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  // maybe location (I hope it gets data passed by ling in EditButton) will solve problem with setting initial data
  const location = useLocation()
  console.log('LOCATION in edit: ', location)
  const { loading, entities, error } = useSelector(
    (state) => state.announcementDetails
  );

  useEffect(() => {
    dispatch(fetchAnnouncementDetails(slug));
  }, []);

  const [] = useState(entities);

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "", "");

  useEffect(() => {
    console.log("entities: ", entities);
    if (entities.length !== 0) {
      console.log("tutaj :", entities);
      titleChangedHandler(entities.title);
    }
  }, [entities]);

  let formIsValid = false;

  let content = <Grid>Loading...</Grid>;

  if (!loading) {
    console.log("title: ", enteredTitle);
    content = (
      <Grid item>
        <TextField
          id="title"
          label="Title"
          name="title"
          placeholder={enteredTitle}
          value={enteredTitle}
          defaultValue={entities.title}
          onChange={titleChangedHandler}
          onBlur={titleBlurHandler}
        />
        {titleInputHasError && (
          <p style={{ color: "red" }}>Title must not be empty.</p>
        )}
      </Grid>
    );
    console.log("title: ", enteredTitle);
  }

  return (
    <Grid container>
      <Grid>Edit annoucnement form</Grid>
      {content}
    </Grid>
  );
};
