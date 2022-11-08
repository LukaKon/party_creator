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
import { AddAPhotoOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles'
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";

import { useInput } from "./hooks/useInput"
import { createAnnouncement } from "../../redux/slices/announcementSlice";

// import { SelectCategory } from './SelectCategory'
// import { SelectImages } from './SelectImages'



const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const getStyle = (category, selectedCategory, theme) => {
  return {
    fontWeight:
      selectedCategory.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

export const AddAnnouncement = () => {

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput(value => value.trim() !== '', '')

  const {
    value: enteredDescription,
    isValid: enteredDescriptionValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangedHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput(value => value.trim() !== '', '')

  const {
    value: selectedCategory,
    isValid: selectedCategoryIsValid,
    hasError: selectedCategoryHasError,
    valueChangeHandler: selectedCategoryChangedHandler,
    inputBlurHandler: selectedCategoryBlurHandler,
    reset: resetSelectedCategory,
  } = useInput(value => value.length > 0, [])

  const {
    value: enteredMovieUrl,
    isValid: enteredMovieUrlValid,
    hasError: movieUrlHasError,
    valueChangeHandler: movieUrlChangeHandler,
    inputBlurHandler: movieUrlBlurHandler,
    reset: resetMovieUrl,
  } = useInput(value => value.includes('https://www'), '')

  const theme = useTheme()


  const { loading, categories, error } = useSelector(
    (state) => state.categories
  );

  const dispatch = useDispatch();

  // const [category, setCategory] = useState('')
  // const [categoryValid, setCategoryValid] = useState(false)

  const [selectedImages, setSelectedImages] = useState()

  let formIsValid = false

  if (enteredTitleIsValid && enteredDescriptionValid && selectedCategoryIsValid) {
    console.log(
      'title: ', enteredTitleIsValid, enteredTitle,
      'desc: ', enteredDescriptionValid, enteredDescription,
      'cat: ', selectedCategoryIsValid, selectedCategory,
      'images: ', 'not yet',
      'movies: ', enteredMovieUrlValid, enteredMovieUrl
    )
    formIsValid = true
  }

  const formSubmissionHandler = e => {
    e.preventDefault()

    if (!enteredTitleIsValid && !enteredDescriptionValid && !selectedCategoryIsValid) {
      return
    }
    const announcement_data = {
      title: enteredTitle,
      description: enteredDescription,
      category: selectedCategory,
      images: selectedImages,
      movies: movies,
    }
    console.log('data to sent: ', announcement_data)
    dispatch(createAnnouncement(announcement_data))

    resetTitleInput()
    resetDescriptionInput()
    resetSelectedCategory()
    resetMovieUrl()
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  let content;
  if (loading) {
    content = (<p>Loading...</p>);
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
            {titleInputHasError && (<p style={{ color: "red" }}>Title must not be empty.</p>)}
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
            {descriptionInputHasError && (<p style={{ color: 'red' }}>Description must not be empty.</p>)}
          </Grid>

          <Grid item>
            <FormControl sx={{ width: 300 }}>
              <InputLabel id='category-label'>Category</InputLabel>
              <Select
                labelId="category-label"
                id='category'
                required
                multiple
                value={selectedCategory}
                onChange={selectedCategoryChangedHandler}
                onBlur={selectedCategoryBlurHandler}
                error={selectedCategoryHasError}
                input={<OutlinedInput label='Cat' />}
                MenuProps={MenuProps}
              >
                {categories.map(category => (
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
            {selectedCategoryHasError && (<p style={{ color: "red" }}>Category must be selected.</p>)}
          </Grid>

          <Grid item>
            <SelectImages />
          </Grid>

          <Grid item>
            <TextField
              margin="normal"
              id="movies"
              label="Movies"
              name="movies"
              // autoFocus
              onChange={movieUrlChangeHandler}
              onBlur={movieUrlBlurHandler}
              value={enteredMovieUrl}
              error={movieUrlHasError}
            />
            {movieUrlHasError && (<p style={{ color: 'red' }}>Url is incorrect.</p>)}
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

const SelectImages = () => {

  const [selectedImages, setSelectedImages] = useState()

  const imageHandleChange = e => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
      setSelectedImages(fileArray)
    }
  }

  let images
  if (selectedImages) {
    images = (
      <Grid>
        <UploadedImageList images={selectedImages} />
      </Grid>)
  } else {
    images = <Grid>Dodaj zdjęcia :)</Grid>
  }

  return (
    <Grid>
      <input
        type='file'
        multiple
        id='file'
        accept="image/jpeg,image/png"
        onChange={imageHandleChange}
      />
      {images}
    </Grid>
  )
}

const UploadedImageList = ({ images }) => {
  const [imagesList, setImagesList] = useState(images)

  const handleRemoveImage = e => {
    // FIXIT: remove images but can't add new

    console.log(`Image ${e.target.name} deleted.`)
    // e.preventDefault()
    const filteredImages = imagesList.filter(img => {
      return img !== e.target.name
    })
    setImagesList(filteredImages)
  }

  return (
    <ImageList sx={{ width: 400, height: 150 }} cols={3} rowHeight={100}>
      {imagesList.map((image, index) => (
        <Grid key={index}>
          <ImageListItem onClick={handleRemoveImage}>
            <img
              src={image}
              // srcSet={}
              name={image}
              alt={image}
              loading="lazy"
            />
          </ImageListItem>
        </Grid>
      ))}
    </ImageList>
  )
}
