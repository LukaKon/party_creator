import React, {useState} from "react"
import {Box, Button, TextField, Grid, Alert} from "@mui/material";
import {updateProfile} from "../redux/slices/profileSlice";
import {useDispatch, useSelector} from "react-redux";

export const ChangeEmail = () => {
    const dispatch = useDispatch()
    const [alert, setAlert] = useState()

    const email = useSelector(state=>state.profile.entities.email)
    let textfieldCurrentEmail

    if(email){
        textfieldCurrentEmail =(<TextField
                        required
                        disabled
                        name="currentEmail"
                        label="Your current email"
                        defaultValue={email}
                    />)
    }

    const checkEmail = (newEmail, newEmail2) => {
        return newEmail === newEmail2;
    }

    const handleForm = (event) => {
        event.preventDefault()
        let data = new FormData(event.target)
        data.append("change", "email")

        const newEmail = data.get("newEmail")
        const newEmail2 = data.get("newEmail2")
        console.log(checkEmail(newEmail, newEmail2))
        if(checkEmail(newEmail, newEmail2)){
            dispatch(updateProfile(data)).unwrap()
                .then(response => {
                    setAlert(<Alert severity="success">Check your new email, you have to confirm the email</Alert>)
                    console.log('success', response)
            })
                .catch(error => {
                    setAlert(<Alert severity="warning">Something went wrong, check fields.</Alert>)
            })
        }else{
            setAlert(<Alert severity="warning">Something went wrong, check fields.</Alert>)
        }

    }

    return (
        <Box
            component="form"
            noValidate
            marginTop={3}
            onSubmit={handleForm}
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    {alert}
                </Grid>
                <Grid item xs={12}>
                    {textfieldCurrentEmail}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="password"
                        required
                        name="password"
                        label="Enter your password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="newEmail"
                        label="Set your new email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="newEmail2"
                        label="Confirm your new email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Set new email
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
