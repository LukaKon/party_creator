import React, {useState} from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {createTheme, ThemeProvider} from "@mui/material/styles";

import {axiosInstance} from "../axios";
import {useParams} from "react-router-dom";

const theme = createTheme();

export const ResetPasswordConfirm = () => {
    const { token } = useParams();
    const handleSubmit = (event) => {
        event.preventDefault()
        let data = new FormData(event.currentTarget);
        data = {
            token: token,
            password: data.get("password"),
        };

        axiosInstance
            .post("account/password_reset/confirm/", data)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Zresetuj hasło
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{mt: 1}}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Zresetuj hasło
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
