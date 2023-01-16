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
  } = useInput((value) => value.trim() !== "", passedData.description);

  const {
    value: selectedCategory,
    isValid: selectedCategoryIsValid,
    hasError: selectedCategoryHasError,
    valueChangeHandler: selectedCategoryChangedHandler,
    inputBlurHandler: selectedCategoryBlurHandler,
    reset: resetSelectedCategory,
  } = useInput(
    (value) => value.length > 0,
    // passedData.category.map((cat) => cat.uuid)
    passedData.category.map((cat) => cat),
  );

  const theme = useTheme();

  const { loading, entities, error } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  console.log("CAT: ", selectedCategory);
  console.log("fetched cat: ", entities);

  let formIsValid = false;
  if (enteredTitleIsValid && enteredDescriptionIsValid) {
    formIsValid = true;
  }

  if (formIsValid) {
    // TODO: save announcement
  }

  let content = <Grid>Loading...</Grid>;

  content = (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
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
          {titleInputHasError && <p style={{ color: "red" }}>Title must not be empty.</p>}
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

        <Grid item>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              required
              multiple
              value={selectedCategory}
              renderValue={(selected) => selected.map((cat) => cat.get_name).join(", ")}
              onChange={selectedCategoryChangedHandler}
              onBlur={selectedCategoryBlurHandler}
              error={selectedCategoryHasError}
              input={<OutlinedInput label="Cat" />}
              MenuProps={MenuProps}
            >
              {entities.map((category) => (
                <MenuItem
                  key={category.uuid}
                  value={category}
                  style={getStyle(category.get_name, selectedCategory, theme)}
                >
                  {category.get_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedCategoryHasError && <p style={{ color: "red" }}>Category must be selected.</p>}
        </Grid>
      </Grid>
    </Container>
  );

  return (
    <Grid container>
      <Grid>Edit annoucnement form</Grid>
      {content}
    </Grid>
  );
};
