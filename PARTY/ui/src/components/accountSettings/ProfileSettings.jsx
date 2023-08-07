import React, {
  useEffect,
  useState,
} from "react"
import {
  Grid,
  Button,
  Typography,
} from "@mui/material";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { styled } from '@mui/material/styles';
import { fetchProfile, updateProfile } from "../../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";

import { ChangeEmail } from "./ChangeEmail";

const LOCALHOST = import.meta.env.LOCALHOST

export const ProfileSettings = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { entities } = useSelector(
    (state) => state.profile
  )

  useEffect(() => {
    setImage({ ...image, imageToShow: LOCALHOST + entities.image })
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
    console.log("imageToUpload", image["imageToUpload"])
  }

  const handleInput = () => {
    if (image["imageToUpload"]) {
      const data = new FormData()
      data.append('image', image["imageToUpload"])
      data.append("change", "image")
      dispatch(updateProfile(data))
        .then(response => {
          dispatch(fetchProfile());
        })
    } else {
      console.log('No photo')
    }
  }

  return (
    <Grid container padding={1}>


      <Grid item xs={12}>
        <Typography variant="h7" component="div">
          Your current avatar, press to change it
        </Typography>
      </Grid>

      <Grid item xs={10}>
        <label htmlFor="avatar">

          <img width={100} height={100} src={image["imageToShow"]} />
          <Input onInput={(event) => upload(event)} accept="image/*" id="avatar" multiple type="file" />
        </label>
        <Button disableRipple variant="contained" onClick={() => handleInput()}>Change Avatar</Button>
      </Grid>

      <Grid item xs={2}>
        <Typography>
          <Button variant="contained" onClick={() => handleButton('/changepassword')}>Change password</Button>
        </Typography>
      </Grid>

      <ChangeEmail />

    </Grid>
  )
}
