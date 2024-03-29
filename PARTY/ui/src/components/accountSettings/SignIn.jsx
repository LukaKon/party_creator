import React, {useState} from "react";

import {
    Avatar,
    Alert,
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

import {axiosInstance} from "../../axios";

export const SignIn = () => {
    const [loginError, setLoginError] = useState(null)
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
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);
                axiosInstance.defaults.headers["Authorization"] =
                    "JWT" + localStorage.getItem("access_token");
                window.location.replace('/');

            })
            .catch((error) => {
                console.log(error)
                if (error.response.status === 401 &&
                    error.response.statusText === "Unauthorized") {
                    setLoginError(<Alert severity="warning">Podany email lub hasło jest nieprawidłowe.</Alert>)
                } else {
                    setLoginError('Nieobsługiwany błąd')
                }
            })
    }

    return (
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
                    Zaloguj się
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
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Hasło"
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
                            <Link href="/resetpassword" variant="body2">
                                Zapomniałeś hasła
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                Nie masz konta? Zarejestruj się
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
