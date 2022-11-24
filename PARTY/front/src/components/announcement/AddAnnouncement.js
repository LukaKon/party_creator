import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Container,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";

import { useInput } from "./hooks/useInput";
import { createAnnouncement } from "../../redux/slices/announcementSlice";

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

export const AddAnnouncement = () => {
  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "", "");

  const {
    value: enteredDescription,
    isValid: enteredDescriptionValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangedHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput((value) => value.trim() !== "", "");

  const {
    value: selectedCategory,
    isValid: selectedCategoryIsValid,
    hasError: selectedCategoryHasError,
    valueChangeHandler: selectedCategoryChangedHandler,
    inputBlurHandler: selectedCategoryBlurHandler,
    reset: resetSelectedCategory,
  } = useInput((value) => value.length > 0, []);

  // const {
  //   value: selectedImages,
  //   isValid: selectedImagesIsValid,
  //   hasError: selectedImagesHasError,
  //   valueChangeHandler: selectedImagesChangeHandler,
  //   inputBlurHandler: selectedImagesBlurHandler,
  //   reset: resetSelectedImages,
  // } = useInput((value) => value.includes(value=>value, ""));

  const {
    value: enteredMovieUrl,
    isValid: enteredMovieUrlValid,
    hasError: movieUrlHasError,
    valueChangeHandler: movieUrlChangeHandler,
    inputBlurHandler: movieUrlBlurHandler,
    reset: resetMovieUrl,
  } = useInput((value) => value.includes("https://www"), "");

  const [listOfImages, setListOfImages] = useState([
    {
      image: "",
      is_main: false,
    },
  ]);

  const theme = useTheme();

  const { loading, categories, error } = useSelector(
    (state) => state.categories
  );

  const dispatch = useDispatch();

  let formIsValid = false;

  if (
    enteredTitleIsValid &&
    enteredDescriptionValid &&
    selectedCategoryIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (
      !enteredTitleIsValid &&
      !enteredDescriptionValid &&
      !selectedCategoryIsValid
    ) {
      return;
    }
    const announcement_data = {
      title: enteredTitle,
      description: enteredDescription,
      category: selectedCategory,
      images: listOfImages,
      movies: enteredMovieUrl,
    };
    console.log("collected data: ", announcement_data);

    const formData = new FormData();
    // necessary data
    formData.append("title", enteredTitle);
    formData.append("description", enteredDescription);
    formData.append("category", selectedCategory);

    // additional data

    if (listOfImages) {
      listOfImages.map((img, index) => {
        // formData.append(`images[${index}]['image']`, img.image);
        // formData.append(`images[${index}]['is_main']`, img.is_main);
        formData.append('images',img.image)
        formData.append(img.image.name,img.is_main)
      });
    }

    if (enteredMovieUrl) {
      formData.append("movies", enteredMovieUrl);
    }
    console.log("FORM DATA: ", formData);

    dispatch(createAnnouncement(formData));

    resetTitleInput();
    resetDescriptionInput();
    resetSelectedCategory();
    resetMovieUrl();
    setListOfImages("");
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  let listOfSelectedImages = <p>Dodaj zdjęcia do ogłoszenia.</p>;
  if (listOfImages.length > 0) {
    listOfSelectedImages = (
      <Grid>
        <UploadedImagesList
          listOfSelectedImages={listOfImages}
          updateListOfImages={setListOfImages}
        />
      </Grid>
    );
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
              Dodaj ogłoszenie:
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              required
              id="title"
              label="Title"
              name="title"
              // autoFocus
              onChange={titleChangedHandler}
              onBlur={titleBlurHandler}
              value={enteredTitle}
              error={titleInputHasError}
            />
            {titleInputHasError && (
              <p style={{ color: "red" }}>Title must not be empty.</p>
            )}
          </Grid>

          <Grid item>
            <TextField
              required
              id="description"
              label="Description"
              name="description"
              // autoFocus
              multiline
              minRows={5}
              maxRows={10}
              maxLength={1000}
              placeholder="Description..."
              style={{ width: 500 }}
              onChange={descriptionChangedHandler}
              onBlur={descriptionBlurHandler}
              value={enteredDescription}
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
                onChange={selectedCategoryChangedHandler}
                onBlur={selectedCategoryBlurHandler}
                error={selectedCategoryHasError}
                input={<OutlinedInput label="Cat" />}
                MenuProps={MenuProps}
              >
                {categories.map((category) => (
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

          <Grid item>
            <SelectImages
              value={listOfImages}
              addImagesToList={setListOfImages}
            />
          </Grid>

          <Grid item>{listOfSelectedImages}</Grid>

          <Grid item>
            <TextField
              margin="normal"
              id="movies"
              label="Movies"
              name="movies"
              onChange={movieUrlChangeHandler}
              onBlur={movieUrlBlurHandler}
              value={enteredMovieUrl}
              error={movieUrlHasError}
            />
            {movieUrlHasError && (
              <p style={{ color: "red" }}>Url is incorrect.</p>
            )}
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

const SelectImages = (props) => {
  const { addImagesToList } = props;
  const [selectedImages, setSelectedImages] = useState([]);

  const imageHandler = (e) => {
    if (typeof addImagesToList === "function") {
      if (e.target.files[0]) {
        const fileArray = Array.from(e.target.files).map((file) => ({
          toShow: URL.createObjectURL(file),
          image: file,
          is_main: false,
        }));
        setSelectedImages(fileArray);
      }
    }
  };

  useEffect(() => {
    addImagesToList(selectedImages);
  }, [selectedImages]);

  return (
    <Grid>
      <input
        type="file"
        multiple
        id="file"
        accept="image/jpeg,image/png"
        onChange={imageHandler}
      />
    </Grid>
  );
};

const UploadedImagesList = (props) => {
  const { listOfSelectedImages, updateListOfImages } = props;

  const deleteImage = (image) => {
    const filteredImages = listOfSelectedImages.filter((img) => {
      return image.toShow !== img.toShow;
    });
    updateListOfImages(filteredImages);
  };

  return (
    <Grid container spacing={3}>
      <ImageList sx={{ width: 500, height: 150 }} cols={3} rowHeight={100}>
        {listOfSelectedImages.map((image, index) => (
          <Grid container item direction="row" key={index}>
            <Grid item xs={8}>
              <ImageListItem
                sx={{ width: 100, height: 100, objectFit: "contain" }}
              >
                <img
                  src={image.toShow}
                  // srcSet={}
                  name={image.toShow}
                  alt={image.toShow}
                  is_main={image.is_main.toString()}
                  loading="lazy"
                />
              </ImageListItem>
            </Grid>
            <Grid item xs={4}>
              {image.is_main.toString() === "false" ? (
                <Button startIcon={<Checkbox />}></Button>
              ) : (
                <Button startIcon={<CheckBoxIcon defaultChecked />}></Button>
              )}
              <Button
                startIcon={<DeleteForeverIcon />}
                onClick={() => deleteImage(image)}
              ></Button>
            </Grid>
          </Grid>
        ))}
      </ImageList>
    </Grid>
  );
};
