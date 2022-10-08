import React, {useState} from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Container, Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {createTheme, ThemeProvider} from "@mui/material/styles";

import {axiosInstance} from "../axios";
import {useParams} from "react-router-dom";

const theme = createTheme();

export const ResetPasswordConfirm = () => {
    const { token } = useParams();
    const [status, setStatus] = useState(null)
    const handleSubmit = (event) => {
        event.preventDefault()
        let data = new FormData(event.currentTarget);

        if(data.get("password") === data.get("password2")){
            data = {
            token: token,
            password: data.get("password"),
            };

            axiosInstance
                .post("account/password_reset/confirm/", data)
                .then((response) => {
                    setStatus(
                        <Alert severity="success">Hasło zostało pomyślnie zmienione.</Alert>
                        // window.location.replace('/signin');
                    )
                })
                .catch((error) => {
                     if(error.response.data.password){
                        setStatus(
                            <Typography variant="div">
                                {error.response.data.password.map(error=>{
                                    return(
                                        <Alert severity="warning">{error}</Alert>
                                    )
                                })}
                            </Typography>
                        )
                    }
                })
        }else{
            setStatus(<Alert severity="warning">Hasła muszą być takie same!</Alert>)
        }
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
                    <Typography variant="h5">
                        Zresetuj hasło
                    </Typography>
                    {status}
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
                            label="Podaj nowe hasło"
                            type="password"
                            id="password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Potwierdź hasło"
                            type="password"
                            id="password2"
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
