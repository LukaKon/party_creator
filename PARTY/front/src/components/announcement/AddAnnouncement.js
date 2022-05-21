import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    FormControl,
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
export const AddAnnouncement = (props) => {
    console.log("props: ", props);
    // const classes = useStyles();
    const [updateValue, submitHandler, errors] = useForm({});
    const theme = createTheme();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

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

    return (
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
                    <Typography component="h1" variant="h5">
                        Add announcement
                    </Typography>
                    {checkInputs}
                    <Box
                        component="form"
                        // onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            id="title"
                            label="Title"
                            name="title"
                            autoFocus
                            onChange={updateValue}
                        />
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
                        {/* <FormControl className={classes.formControl}> */}
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
                                {/* TODO: check after add thunk function to fetch categories */}
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {/* {categories.map((category) => { */}
                                {/* return ( */}
                                {/* <MenuItem value={category.id}> */}
                                {/* {category.name} */}
                                {/* </MenuItem> */}
                                {/* ); */}
                                {/* })} */}
                            </Select>
                        </FormControl>
                        <div>
                            <ul>
                                <li>"add images/multimedia"</li>
                                <li>"event type: list with checkboxes"</li>
                            </ul>
                        </div>
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
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
