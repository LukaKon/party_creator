import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
    Input,
    Box,
    TextareaAutosize,
} from "@mui/material";

export const AddAnnouncement = () => {
    const initState = {
        title: "",
        description: "",
        category: "",
        event_type: "",
    };
    const [state, setState] = useState(initState);
    const theme = createTheme();

    const handleSubmit = (e) => {
        console.log("Submit");
    };

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
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoFocus
                        />
                        <TextareaAutosize
                            margin="normal"
                            required
                            fullWidth
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
                        />
                        {/* <TextField margin="normal" /> */}
                        {/* <Input */}
                        {/* type="files" */}
                        {/* margin="normal" */}
                        {/* // required */}
                        {/* fullWidth */}
                        {/* id="image" */}
                        {/* name="image" */}
                        {/* autoFocus */}
                        {/* /> */}
                        "add images/multimedia"
                        <br />
                        "event type: list with checkboxes"
                        <br /> "category: list with checkboxes"
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
