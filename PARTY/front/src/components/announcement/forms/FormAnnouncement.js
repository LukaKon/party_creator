import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { fetchCategories } from "../../../redux/slices/categorySlice";
import { useInput } from "./hooks/useInput";
import {
  createAnnouncement,
  editAnnouncement,
} from "../../../redux/slices/announcementDetailSlice";
import { SelectImages } from "./SelectImages";
import { UploadedImagesList } from "./UploadedImagesList";

const LOCALHOST = process.env.REACT_LOCALHOST;

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

export const FormAnnouncement = () => {
  const location = useLocation();
  let passedData = null;
  if (location.state) {
    passedData = location.state.entities;
  }
  console.log("DATA: ", passedData);
  console.log(typeof passedData)

  const navigate = useNavigate();

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "", passedData ? passedData.title : "");

  const {
    value: enteredDescription,
    isValid: enteredDescriptionValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangedHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput(
    (value) => value.trim() !== "",
    passedData ? passedData.description : "",
  );

  const {
    value: selectedCategory,
    isValid: selectedCategoryIsValid,
    hasError: selectedCategoryHasError,
    valueChangeHandler: selectedCategoryChangedHandler,
    inputBlurHandler: selectedCategoryBlurHandler,
    reset: resetSelectedCategory,
  } = useInput(
    (value) => value.length > 0,
    passedData ? passedData.category.length > 0 ? passedData.category.map((cat) => cat) : [] : [],
  );

  const {
    value: selectedImages,
    isValid: selectedImagesIsValid,
    hasError: selectedImagesHasError,
    valueChangeHandler: selectedImagesChangeHandler,
    inputBlurHandler: selectedImagesBlurHandler,
    reset: resetSelectedImages,
  } = useInput(
    (value) => value.length >= 0,
      passedData ?
      passedData.images.length > 0
      ? passedData.images.map((img) => ({
          uuid: img.uuid,
          link: img.image.includes(LOCALHOST) ? img.image : `${LOCALHOST}${img.image}`,
          is_main: img.is_main,
          to_delete: false,
        }))
      : [] : [],
  );

  const {
    value: enteredMovieUrl,
    isValid: enteredMovieUrlValid,
    hasError: movieUrlHasError,
    valueChangeHandler: movieUrlChangeHandler,
    inputBlurHandler: movieUrlBlurHandler,
    reset: resetMovieUrl,
  } = useInput(
    (value) => value.includes("https://www.youtube.com/"),
    // passedData ? passedData.movies.map((mov) => mov) : []
    passedData ? passedData.movies.length > 0 ? passedData.movies[0].movie_url : "" : "",
  );

  const [listOfImages, setListOfImages] = useState(selectedImages);

  const theme = useTheme();

  const { loading, entities, error } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  let formIsValid = false;

  if (enteredTitleIsValid && enteredDescriptionValid && selectedCategoryIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredTitleIsValid && !enteredDescriptionValid && !selectedCategoryIsValid) {
      return;
    }

    const formData = new FormData();

    // necessary data
    formData.append("title", enteredTitle);
    formData.append("description", enteredDescription);
    formData.append(
      "category",
      selectedCategory.map((cat) => cat.uuid),
    );

    // additional data
    if (listOfImages) {
      // handle uploaded images
      const uploadedImagesToSend = listOfImages.filter((img) => {
        return img.to_delete === false;
      });
      uploadedImagesToSend.map((img) => {
        formData.append("images", img.blob);
        formData.append(img.blob, img.is_main);
      });

      // handle images from backend
      if (passedData) {
        const imagesFromBackendToDelete = listOfImages.filter((img) => {
          return img.to_delete === true && img.hasOwnProperty("uuid");
        });
        imagesFromBackendToDelete.map((img) => {
          formData.append("images", img.uuid);
        });
      }
    }

    if (enteredMovieUrl) {
      formData.append("movies", enteredMovieUrl);
    }

    if (passedData) {
      dispatch(editAnnouncement({ slug: passedData.slug, data: formData }));
      navigate(`/announcement/${passedData.slug}`);
    } else {
      dispatch(createAnnouncement(formData));
      navigate("/myannouncements");
    }

    resetTitleInput();
    resetDescriptionInput();
    resetSelectedCategory();
    resetMovieUrl();
    resetSelectedImages();
    setListOfImages(""); // why ""
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  console.log("Title before sent: ", enteredTitle);
  console.log("Description before sent: ", enteredDescription);
  console.log("CAT before sent: ", selectedCategory);
  console.log("IMG before sent: ", listOfImages);
  console.log("MOV before sent: ", enteredMovieUrl);

  let listOfAllImages = <Grid>Add images to announcement :)</Grid>;

  if (listOfImages.length > 0) {
    listOfAllImages = (
      <Grid>
        <UploadedImagesList
          listOfSelectedImages={listOfImages}
          updateListOfImages={setListOfImages}
        />
      </Grid>
    );
  }

  // dynamic title depend on type of form: add or edit
  let titleOfForm = "Add announcement:";
  if (passedData) {
    titleOfForm = "Edit announcement:";
  }

  let content;
  if (loading) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <Container component="main" maxWidth="xs">
        <Grid container spacing={2}>
          <Grid item>
            <Typography component="h1" variant="h5">
              {titleOfForm}
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              required
              id="title"
              label="Title"
              name="title"
              placeholder={enteredTitle}
              value={enteredTitle}
              onChange={titleChangedHandler}
              onBlur={titleBlurHandler}
              error={titleInputHasError}
            />
            {titleInputHasError && <p style={{ color: "red" }}>Title must not be empty.</p>}
          </Grid>

          <Grid item>
            <TextField
              required
              id="description"
              label="Description"
              name="description"
              multiline
              minRows={5}
              maxRows={10}
              maxLength={1000}
              style={{ width: 500 }}
              placeholder={enteredDescription}
              value={enteredDescription}
              onChange={descriptionChangedHandler}
              onBlur={descriptionBlurHandler}
              error={descriptionInputHasError}
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

          <Grid item>
            <SelectImages listOfImages={listOfImages} addImagesToList={setListOfImages} />
          </Grid>

          <Grid item>{listOfAllImages}</Grid>

          <Grid item>
            <TextField
              margin="normal"
              id="movies"
              label="Movies"
              name="movies"
              placeholder={enteredMovieUrl}
              value={enteredMovieUrl}
              onChange={movieUrlChangeHandler}
              onBlur={movieUrlBlurHandler}
              error={movieUrlHasError}
            />
            {movieUrlHasError && <p style={{ color: "red" }}>Url is is not from YouTube.</p>}
          </Grid>

          <Grid item>
            <Button
              type="submit"
              disabled={!formIsValid}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={formSubmissionHandler}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return <Grid>{content}</Grid>;
};
