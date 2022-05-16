import * as React from "react";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {createTheme, ThemeProvider} from "@mui/material/styles";

import {axiosInstance} from "../axios";
import {useState} from "react";

const LOCALHOST = process.env.REACT_LOCALHOST;
console.log("localhost: ", LOCALHOST);

const theme = createTheme();

export const SignIn = () => {
    const [loginError, setLoginError] = useState(null)
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        let data = new FormData(event.currentTarget);
        data = {
            email: data.get("email"),
            password: data.get("password"),
        };


        axiosInstance
            .post("account/login/", data)
            .then((response) => {
                sessionStorage.setItem("access_token", response.data.access);
                sessionStorage.setItem("refresh_token", response.data.refresh);
                axiosInstance.defaults.headers["Authorization"] =
                    "JWT" + localStorage.getItem("access_token");
                navigate('/')
                window.location.reload();
            })
            .catch((error) => {
                if (error.response.status === 401 &&
                    error.response.statusText === "Unauthorized") {
                    setLoginError('Podaj prawidłowe dane')
                } else {
                    setLoginError('Skontaktuj się z farmaceutą')
                }
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
                        Sign in
                    </Typography>
                    <Typography component={'p'} color={'red'}>
                        {loginError}
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
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
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
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary"/>
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
