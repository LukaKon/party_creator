import React, {
    useEffect,
    useState,
} from "react"
import {
    Grid,
    Input,
    Button,
    Typography,
} from "@mui/material";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import {styled} from '@mui/material/styles';
import {fetchProfile, updateProfile} from "../redux/slices/profileSlice";
import {BACKEND_LOCALHOST} from "../../Settings";
import {useNavigate} from "react-router-dom";

export const ProfileSettings = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {entities} = useSelector(
        (state) => state.profile
    )

    useEffect(() => {
            setImage({...image, imageToShow: BACKEND_LOCALHOST.slice(0, -1) + entities.image})
        },
        [entities]
    )

    const handleButton = (pageURL) => {
        navigate(pageURL)
    }

    const [image, setImage] = useState({
        imageToShow: undefined,
        imageToUpload: undefined
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
        if(image["imageToUpload"]) {
            const data = new FormData()
            data.append('image', image["imageToUpload"])
            console.log('img', image["imageToUpload"])
            dispatch(updateProfile(data))
                .then(response => {
                    dispatch(fetchProfile());
                })
        }else{
            console.log('Brak zdjęcia')
        }
    }

    return (
        <Grid container padding={1}>
            <Grid item xs={12}>
                <Typography variant="h7" component="div">
                    Twój aktualny avatar, naciśnij aby zmienić:
                </Typography>
            </Grid>

            <Grid item xs={10}>
                <label htmlFor="avatar">

                    <img width={100} height={100} src={image["imageToShow"]}/>
                    <Input onInput={(event) => upload(event)} accept="image/*" id="avatar" multiple type="file"/>
                </label>
                <Button variant="contained" onClick={() => handleInput()}>Zmień avatar</Button>
            </Grid>

            <Grid item xs={2}>
             <Typography>
                <Button variant="contained" onClick={()=>handleButton('/changepassword')}>Zmień hasło</Button>
            </Typography>
            </Grid>
        </Grid>
    )
}
