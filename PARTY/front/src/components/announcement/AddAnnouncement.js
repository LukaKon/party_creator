import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    TextareaAutosize,
    TextField,
    Typography,
} from "@mui/material";
import { useForm } from "./hooks/useForm";
import { useDispatch } from "react-redux";
import { saveAnnouncement } from "../../redux/slices/announcementSlice";

export const AddAnnouncement = () => {
    const [updateValue, submitHandler, errors] = useForm({});
    const theme = createTheme();

    const dispatch = useDispatch();
    // console.log(JSON.parse(localStorage.getItem("user")));
    console.log(localStorage);

    const handleSubmit = (e) => {
        e.preventDefault();
        // const data = new FormData(e.currentTarget);
        // console.log("data: ", data);
        console.log("token: ", sessionStorage.getItem("email"));
        dispatch(
            saveAnnouncement({
                title: "test",
                description: "opis",
                user: "lukasz.konieczny.lk@gmail.com",
            })
        );
    };

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
                        <div>
                            <ul>
                                <li>"add images/multimedia"</li>
                                <li>"event type: list with checkboxes"</li>
                                <li>"category: list with checkboxes"</li>
                            </ul>
                        </div>
                        <Button
                            type="submit"
                            disabled={saveButton}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            // onClick={submitHandler}
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
