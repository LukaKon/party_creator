import React from "react";
import { useLocation } from "react-router-dom";
// import { useDispatch,  } from "react-redux";
import { Grid, TextField } from "@mui/material";
// import {
//   editAnnouncement,
//   fetchAnnouncementDetails,
// } from "../../../redux/slices/announcementDetailSlice";
import { useInput } from "./hooks/useInput";
import { loged } from "../../../utils/loged";
// import { } './formUtils'

export const EditAnnouncement = () => {
  const location = useLocation();

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "", location.state.entities.title);

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangedHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput(
    (value) => value.trim() !== "",
    location.state.entities.description
  );

  let formIsValid = false;
  if (enteredTitleIsValid && enteredDescriptionIsValid) {
    formIsValid = true;
  }

  if (formIsValid) {
    // TODO: save announcement
  }

  let content = <Grid>Loading...</Grid>;

  content = (
    <Grid container>
      <Grid item>
        <TextField
          id="title"
          label="Title"
          name="title"
          placeholder={enteredTitle}
          value={enteredTitle}
          onChange={titleChangedHandler}
          onBlur={titleBlurHandler}
        />
        {titleInputHasError && (
          <p style={{ color: "red" }}>Title must not be empty.</p>
        )}
      </Grid>

      <Grid item>
        <TextField
          id="description"
          label="Description"
          name="description"
          placeholder={enteredDescription}
          value={enteredDescription}
          onChange={descriptionChangedHandler}
          onBlur={descriptionBlurHandler}
        />
        {descriptionInputHasError && (
          <p style={{ color: "red" }}>Description must not be empty.</p>
        )}
      </Grid>
    </Grid>
  );

  return (
    <Grid container>
      <Grid>Edit annoucnement form</Grid>
      {content}
    </Grid>
  );
};
