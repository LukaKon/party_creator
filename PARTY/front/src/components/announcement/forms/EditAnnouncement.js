import React from "react";
import { useLocation } from "react-router-dom";
// import { useDispatch,  } from "react-redux";
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Select,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import {
//   editAnnouncement,
//   fetchAnnouncementDetails,
// } from "../../../redux/slices/announcementDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "./hooks/useInput";
// import { loged } from "../../../utils/loged";
// import { } './formUtils'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyle = (category, selectedCategory, theme) => {
  return {
    fontWeight:
      selectedCategory.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

export const EditAnnouncement = () => {
  const location = useLocation();
  const passedData = location.state.entities;
  console.log("DATA: ", passedData);

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "", passedData.title);

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
  } = useInput((value) => value.length > 0, passedData.category);

  const theme = useTheme();

  const { loading, entities, error } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  console.log("CAT: ", selectedCategory);
  console.log("fetched cat: ", entities);

  let formIsValid = false;
  if (
    enteredTitleIsValid &&
    enteredDescriptionIsValid &&
    selectedCategoryIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e) => {
    // TODO: try to make universal code for both components
    // FIX: copied from AddAnnouncenmt component
    e.preventDefault();

    if (
      // !formIsValid
      !enteredTitleIsValid &&
      !enteredDescriptionValid &&
      !selectedCategoryIsValid
    ) {
      return;
    }

    const formData = new FormData();

    // necessary data
    formData.append("title", enteredTitle);
    formData.append("description", enteredDescription);
    formData.append("category", selectedCategory);

    // additional data
    if (listOfImages) {
      listOfImages.map((img) => {
        formData.append("images", img.image);
        formData.append(img.image.name, img.is_main);
      });
    }

    if (enteredMovieUrl) {
      formData.append("movies", enteredMovieUrl);
    }

    dispatch(createAnnouncement(formData));

    resetTitleInput();
    resetDescriptionInput();
    resetSelectedCategory();
    resetMovieUrl();
    setListOfImages("");
  };

  console.log("CAT before sent: ", selectedCategory);
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

        <Grid item>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              required
              multiple
              value={selectedCategory.map((cat) => cat.uuid)}
              onChange={selectedCategoryChangedHandler}
              onBlur={selectedCategoryBlurHandler}
              error={selectedCategoryHasError}
              input={<OutlinedInput label="Cat" />}
              MenuProps={MenuProps}
            >
              {entities.map((category) => (
                <MenuItem
                  key={category.uuid}
                  value={category.uuid}
                  style={getStyle(category.get_name, selectedCategory, theme)}
                >
                  {category.get_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedCategoryHasError && (
            <p style={{ color: "red" }}>Category must be selected.</p>
          )}
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
