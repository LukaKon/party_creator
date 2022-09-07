import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";

import { useInput } from "./hooks/useInput"
import { createAnnouncement } from "../../redux/slices/announcementSlice";

import { TitleInput } from './TitleInput'
import { SelectCategory } from './SelectCategory'
import { SelectImages } from './SelectImages'


export const AddAnnouncement = () => {

  const [dataToSend, setDataToSend] = useState({
    title: '',
    description: '',
    category: [],
    images: [],
  })

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

  const { loading, categories, error } = useSelector(
    (state) => state.categories
  );

  const dispatch = useDispatch();

  const [category, setCategory] = useState('')
  const [categoryValid, setCategoryValid] = useState(false)

  const [resetForm, setResetForm] = useState(false)

  // const [selectedImages, setSelectedImages] = useState()

  let formIsValid = false

  if (enteredTitleIsValid && enteredDescriptionValid && categoryValid) {
    console.log('title: ', enteredTitleIsValid, 'desc: ', enteredDescriptionValid, 'cat: ', categoryValid)
    formIsValid = true
  }

  // console.log('form is valid: ', formIsValid)

  const formSubmissionHandler = e => {
    e.preventDefault()

    if (!enteredTitleIsValid && !enteredDescriptionValid && !categoryValid) {
      return
    }
    const ann = {
      title: enteredTitle,
      description: enteredDescription,
      category: category,
    }
    console.log('data to sent: ', ann)
    dispatch(createAnnouncement(ann))

    resetTitleInput()
    resetDescriptionInput()
    setResetForm(true)
    // setResetForm(false)
  }

  const categorySelectHandle = (category) => {
    // console.log('selected cat in children:', category)
    setCategory(category)
  }

  const isCategoryValid = (validCategory) => {
    setCategoryValid(validCategory)
  }

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


  // console.log('selected category: ', category)

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
              margin="normal"
              required
              id="title"
              label="Title"
              name="title"
              // autoFocus
              defaultValue='Tytuł'
              onChange={titleChangedHandler}
              onBlur={titleBlurHandler}
              value={enteredTitle}
              error={titleInputHasError}
            />
            {titleInputHasError && (<p style={{ color: "red" }}>Title must not be empty.</p>)}
          </Grid>

          <Grid item>
            <TitleInput
              reset={resetForm}
            />
          </Grid>

          <Grid item>
            <TextField
              margin="normal"
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
            <SelectCategory
              categories={categories}
              selectedCategory={categorySelectHandle}
              categoryIsValid={isCategoryValid}
              reset={resetForm}
            />
            {error && (<p style={{ color: 'red' }}>Error: {error}</p>)}
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

          <Grid item>
            TODO:
            <ul>
              <li>"add images/multimedia"</li>
              <li>"event type: list with checkboxes"</li>
            </ul>
          </Grid>

        </Grid>
      </Container>
    );
  }
  return <>{content}</>;
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
