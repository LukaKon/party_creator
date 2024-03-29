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
import {useDispatch} from "react-redux";
import {changePassword} from "../../redux/slices/profileSlice";


export const ChangePassword = () => {
    const [alert, setAlert] = useState(null)
    const dispatch = useDispatch()
    const handleSubmit = (event) =>{
        setAlert(null)
        event.preventDefault()
        let data = new FormData(event.currentTarget);

        if(data.get("new_password") === data.get("new_password2")){
            data = {
            old_password: data.get("old_password"),
            new_password: data.get("new_password"),
            };

            dispatch(changePassword(data)).unwrap()
                .then((response) => {
                    setAlert(
                        <Alert severity="success">Password is changed!</Alert>
                    )
                    console.log(response)
                })
                .catch((error) => {
                    if(error.response.data.password){
                        setAlert(
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
            setAlert(<Alert severity="warning">Passwords must be the same</Alert>)
        }
    }

    return(
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
                    Change password
                </Typography>
                {alert}
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
                        label="Enter your old password"
                        type="password"
                        id="old_password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="new_password"
                        label="Enter your new password"
                        type="password"
                        id="new_password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="new_password2"
                        label="Confirm your password"
                        type="password"
                        id="new_password2"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Set new password
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}
