import React from "react"
import {Box, Button, TextField, Grid} from "@mui/material";
import {updateProfile} from "../redux/slices/profileSlice";
import {useDispatch} from "react-redux";

export const ChangeEmail = () => {
    const dispatch = useDispatch()

    const handleForm = (event) => {
        event.preventDefault()
        let data = new FormData(event.target)
        dispatch(updateProfile(data))
        console.log(data)
        console.log(data.get("currentEmail"))
        console.log(data.get("newEmail"))
        console.log(data.get("newEmail2"))
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
                    <TextField
                        required
                        name="currentEmail"
                        label="Your current email"
                        defaultValue='bartek@gmail.com'
                    />
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
