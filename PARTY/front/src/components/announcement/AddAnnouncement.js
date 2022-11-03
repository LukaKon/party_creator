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
import { useTheme } from '@mui/material/styles'
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";

import { useInput } from "./hooks/useInput"
import { createAnnouncement } from "../../redux/slices/announcementSlice";

// import { SelectCategory } from './SelectCategory'
import { SelectImages } from './SelectImages'



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

  const theme = useTheme()


  const { loading, categories, error } = useSelector(
    (state) => state.categories
  );

  const dispatch = useDispatch();

  // const [category, setCategory] = useState('')
  // const [categoryValid, setCategoryValid] = useState(false)

  const [movies, setMovies] = useState([])
  const [selectedImages, setSelectedImages] = useState()


  // const [resetForm, setResetForm] = useState(false)

  const movieChangeHandler = () => {
    setMovies()
  }


  let formIsValid = false

  if (enteredTitleIsValid && enteredDescriptionValid && selectedCategoryIsValid) {
    console.log(
      'title: ', enteredTitleIsValid, enteredTitle,
      'desc: ', enteredDescriptionValid, enteredDescription,
      'cat: ', selectedCategoryIsValid, selectedCategory,
      'images: ', 'not yet',
      'movies: ', movies,
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
  }

  // const categorySelectHandle = (category) => {
  //   setCategory(category)
  // }

  // const isCategoryValid = (validCategory) => {
  //   setCategoryValid(validCategory)
// }

// const imageHandleChange = (e) => {
//   // console.log('images: ', e.target.files)
//   if (e.target.files) {
//     const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
//     // console.log('urls: ', fileArray)

//     // setSelectedImages(prevImages => prevImages.concat(fileArray))
//     setSelectedImages(fileArray)
//   }
// }

useEffect(() => {
  dispatch(fetchCategories());
}, []);


// let images
// if (selectedImages) {
//   // images = renderPhoto(selectedImages)
//   images = <UploadedImageList images={selectedImages} />
// } else {
//   images = <p>Add some images :)</p>
// }

let content;
if (loading) {
  content = (<p>Loading...</p>);
} else {
  content = (
    <Container component="main" maxWidth="xs">
      <Grid container>
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

    {/*
        <Grid item>
          <SelectCategory
            categories={categories}
            selectedCategory={categorySelectHandle}
            categoryIsValid={isCategoryValid}
          />
          {error && (<p style={{ color: 'red' }}>Error: {error}</p>)}
        </Grid>
    */}

    <Grid item>
      <FormControl sx={{ m: 1, width: 300 }}>
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

        {/*
          <Grid item>
            <input type="file" multiple id='file' onChange={imageHandleChange} />
            <div>
              <label htmlFor="file">
                <i className="material-icons">add photos</i>
              </label>
            </div>
            {images}
          </Grid>
    */}

        <Grid item>
          <span style={{ color: 'red' }}>TEST</span>
          <SelectImages />
        </Grid>


        <Grid item>
          <TextField
            margin="normal"
            // required
            id="movies"
            label="Movies"
            name="movies"
            // autoFocus
            onChange={movieChangeHandler}
          // onBlur={titleBlurHandler}
          // value={enteredTitle}
          // error={titleInputHasError}
          />
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


const UploadedImageList = ({ images }) => {
  // console.log('props', images)
  return (
    <ImageList sx={{ width: 400, height: 350 }} cols={3} rowHeight={164}>
      {images.map((image, index) => (
        <ImageListItem key={index}>
          <img
            src={image}
            // srcSet={}
            alt={image}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
