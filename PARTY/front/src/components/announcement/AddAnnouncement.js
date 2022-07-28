import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Container,
  CssBaseline,
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

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//         // margin: theme.spacing(1),
//         margin: 1,
//         minWidth: 120,
//     },
//     selectEmpty: {
//         // marginTop: theme.spacing(2),
//         marginTop: 2,
//     },
// }));

// export const AddAnnouncement = ({ categories }) => {
export const AddAnnouncement = () => {
  // const classes = useStyles();
  const { loading, categories, error } = useSelector(
    (state) => state.categories
  );
  const [updateValue, submitHandler, errors] = useForm({});
  const theme = createTheme();
  const dispatch = useDispatch();

  const [selectedImages, setSelectedImages] = useState()

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
    content = <Typography variant="body2"> Fetching data...</Typography>;
  } else {
    content = (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
                  onChange={updateValue}
                />
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
                <FormControl>
                  <InputLabel id="select_category_label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="select_category_label"
                    id="select_category"
                    onChange={updateValue}
                    // value={updateValue}
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
          </Box>
        </Container>
      </ThemeProvider>
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
