import React, {useState} from 'react'
import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Typography,
    TextField
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {axiosInstance} from "../axios";

const theme = createTheme();

export const ChangePassword = () => {
    const [status, setStatus] = useState(null)
    const handleSubmit = (event) =>{
        setStatus(null)
        event.preventDefault()
        let data = new FormData(event.currentTarget);

        if(data.get("new_password") === data.get("new_password2")){
            data = {
            old_password: data.get("old_password"),
            new_password: data.get("new_password"),
            };

            axiosInstance
                .put("account/changepassword/", data)
                .then((response) => {
                    setStatus(
                        <Alert severity="success">Hasło zostało pomyślnie zmienione.</Alert>
                    )
                    console.log(response)
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
            // window.location.replace('/signin');
        }else{
            setStatus(<Alert severity="warning">Hasła muszą być takie same!</Alert>)
        }
    }

    return(
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
                        Zmień hasło
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
                            name="old_password"
                            label="Tutaj wpisz stare hasło"
                            type="password"
                            id="old_password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="new_password"
                            label="Tutaj wpisz nowe hasło"
                            type="password"
                            id="new_password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="new_password2"
                            label="Tutaj powtórz nowe hasło"
                            type="password"
                            id="new_password2"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Ustaw nowe hasło
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
