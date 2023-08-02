import React, { useEffect, useState } from "react"
import { Alert, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleEmail } from "../../redux/slices/profileSlice";


export const ActivateNewEmail = () => {
  const [alert, setAlert] = useState()
  const { uid, newEmail, token } = useParams()
  const dispatch = useDispatch()
  const data = new FormData

  useEffect(() => {
    data.append('uid', uid)
    data.append('new_email', newEmail)
    data.append('token', token)
    data.append('change_or_activation', 'change_email')
    dispatch(handleEmail(data))
  }, [])

  const { loading, active } = useSelector(state => state.profile)

  useEffect(() => {
    if (!loading && active === true) {
      setAlert(<Alert severity="success">Your email is changed</Alert>)
    }

    else if (!loading && active !== true) {
      setAlert(<Alert severity="warning">Something went wrong!</Alert>)
    }
  }, [active])

  return (
    <Grid>
      {alert}
    </Grid>
  )
}