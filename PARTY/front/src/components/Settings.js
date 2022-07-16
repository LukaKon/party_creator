import React, {useEffect, useState} from "react"
import {Grid, Input, Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {styled} from '@mui/material/styles';
import {handleButton} from "../utils";
import {axiosInstance} from "../axios";
import {fetchProfile} from "../redux/slices/profileSlice";
import {BACKEND_LOCALHOST} from "../../Settings";

export const Settings = () => {
    const dispatch = useDispatch();

    const {entities} = useSelector(
        (state) => state.profile
    )

    useEffect(() => {
            setImage({...image, imageToShow: BACKEND_LOCALHOST.slice(0, -1) + entities.image})
        },
        [entities]
    )

    const [image, setImage] = useState({
        imageToShow: 'test',
        imageToUpload: 'test'
    })

    const Input = styled('input')({
        display: 'none',
    });


    const upload = (event) => {
        setImage({
            imageToUpload: event.target.files[0],
            imageToShow: URL.createObjectURL(event.target.files[0])
        })
    }

    const handleInput = () => {
        const data = new FormData()
        data.append('image', image["imageToUpload"])
        axiosInstance.patch('account/updateprofile/', data)
            .then(response => {
                dispatch(fetchProfile());
            })
    }

    return (
        <Grid margin={2}>
            <Typography variant="h7" component="div">
                Twój aktualny avatar, naciśnij aby zmienić
            </Typography>

            <Grid margin={2}>

                <label htmlFor="avatar">

                    <img width={100} height={100} src={image["imageToShow"]}/>
                    <Input onInput={(event) => upload(event)} accept="image/*" id="avatar" multiple type="file"/>
                </label>
                <Button variant="contained" onClick={() => handleInput()}>Upload</Button>

            </Grid>
        </Grid>
    )
}
