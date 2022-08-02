import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "./hooks/useForm";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";

import { useInput } from "./hooks/useInput"
import { createAnnouncement } from "../../redux/slices/announcementSlice";


export const AddAnnouncement = () => {

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput(value => value.trim() !== '')

  const { loading, categories, error } = useSelector(
    (state) => state.categories
  );


  const [updateValue, submitHandler, errors] = useForm({});
  const dispatch = useDispatch();

  const [category, setCategory] = useState('')
  const [selectedImages, setSelectedImages] = useState()


  let formIsValid = false
  if (enteredTitleIsValid) {
    formIsValid = true
  }

  const formSubmissionHandler = e => {
    e.prevenDefault()

    if (!enteredTitleIsValid) {
      return
    }
    console.log('entered title: ', enteredTitle)
    const ann={
      title: enteredTitle,
    }
    dispatch(createAnnouncement(ann))

    resetTitleInput()
  }

  const categorySelectHandle = (e) => {
    setCategory(e.target.value)
  }

  const imageHandleChange = (e) => {
    // console.log('images: ', e.target.files)
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
      // console.log('urls: ', fileArray)

      // setSelectedImages(prevImages => prevImages.concat(fileArray))
      setSelectedImages(fileArray)
    }
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);


  console.log('selected category: ', category)

  let images
  if (selectedImages) {
    // images = renderPhoto(selectedImages)
    images = <UploadedImageList images={selectedImages} />
  } else {
    images = <p>Add some images :)</p>
  }

  let checkInputs;
  let saveButton;
  if (errors.length !== 0) {
    checkInputs = (
      <Typography color={"red"}>{errors.map((err) => err)}</Typography>
    );
    saveButton = true;
  } else {
    saveButton = false;
  }
  let content;
  if (loading) {
    content = (<p>Loading</p>);
  } else {
    content = (
      <Container component="main" maxWidth="xs">
        <Grid container>
          <Grid item>
            <Typography component="h1" variant="h5">
              Add announcement
            </Typography>
          </Grid>

          <Grid item>{checkInputs}</Grid>

          <Grid item>
            <TextField
              margin="normal"
              required
              id="title"
              label="Title"
              name="title"
              autoFocus
              defaultValue='Tytuł'
              // onChange={updateValue}
              onChange={titleChangedHandler}
              onBlur={titleBlurHandler}
              value={enteredTitle}
            />
            {titleInputHasError && (<p style={{color: "red"}}>Title must not be empty.</p>)}
          </Grid>

          <Grid item>
            <TextareaAutosize
              margin="normal"
              required
              id="description"
              label="Description"
              name="description"
              autoFocus
              aria-label="minimum height"
              minRows={3}
              maxRows={10}
              maxLength={1000}
              placeholder="Description..."
              style={{ width: 200 }}
              onChange={updateValue}
            />
          </Grid>

          <Grid item>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullwidth>
                <InputLabel id="select_category_label">
                  Category
                </InputLabel>
                <Select
                  labelId="select_category_label"
                  id="select_category"
                  value={category}
                  onChange={categorySelectHandle}
                >
                  {categories.map((cat) => {
                    return (
                      <MenuItem
                        key={cat.uuid}
                        value={cat.name}
                      >
                        {cat.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item>
            <input type="file" multiple id='file' onChange={imageHandleChange} />
            <div>
              <label htmlFor="file">
                <i className="material-icons">add photos</i>
              </label>
            </div>
            {images}
          </Grid>
          {/* TODO */}
          <div>
            <ul>
              <li>"add images/multimedia"</li>
              <li>"event type: list with checkboxes"</li>
            </ul>
          </div>
          <Grid item>
            <Button
              type="submit"
              disabled={saveButton}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={submitHandler}
            // onClick={handleSubmit}
            >
              Save
            </Button>
          </Grid>

        </Grid>
      </Container>
    );
  }
  return <>{content}</>;
};


const UploadedImageList = ({ images }) => {
  console.log('props', images)
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
