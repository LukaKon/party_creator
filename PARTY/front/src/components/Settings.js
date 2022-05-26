import React, {useState} from "react"
import {Grid, Input, Button, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {styled} from '@mui/material/styles';
import {handleButton} from "../utils";

export const Settings = () => {
    const imgUrl = "http://127.0.0.1:8000/api"
    const [selectFile, setSelectFile] = useState()

    const Input = styled('input')({
        display: 'none',
    });

    const upload = (file, onUploadProgress) => {
        let formData = new FormData();
        formData.append("file", file);
        return http.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    const handleInput = (event) => {
        let formData = new FormData()
        formData.append("image",)
        console.log(event.target.files[0])
        const file = event.target.files[0];
        // const reader = new FileReader();
        // const url = reader.readAsDataURL(file);
        const url = URL.createObjectURL(file)
        console.log('tutaj jestem', url)
    }

    const {entities, loading} = useSelector(
        (state) => state.profile
    );

    return (
        <Grid margin={2}>
            <Typography variant="h7" component="div">
                Twój aktualny avatar, naciśnij aby dodać nowy
            </Typography>

            <Grid margin={2}>

                <label htmlFor="avatar">
                    <img src={imgUrl + entities.image}/>
                    <Input onInput={(event) => handleInput(event)} accept="image/*" id="avatar" multiple type="file"/>
                </label>

            </Grid>
        </Grid>
    )
}
