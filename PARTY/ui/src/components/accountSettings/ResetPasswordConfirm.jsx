import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
import { axiosInstance } from "../../axios";

export const ResetPasswordConfirm = () => {
  const { token } = useParams();
  const [status, setStatus] = useState(null)
  const handleSubmit = (event) => {
    event.preventDefault()
    let data = new FormData(event.currentTarget);

    if (data.get("password") === data.get("password2")) {
      data = {
        token: token,
        password: data.get("password"),
      };

      axiosInstance
        .post("account/password_reset/confirm/", data)
        .then((response) => {
          setStatus(
            <Alert severity="success">Password is changed</Alert>
          )
        })
        .catch((error) => {
          if (error.response.data.password) {
            setStatus(
              <Typography variant="div">
                {error.response.data.password.map(error => {
                  return (
                    <Alert severity="warning">{error}</Alert>
                  )
                })}
              </Typography>
            )
          }
        })
    } else {
      setStatus(<Alert severity="warning">Password must be the same!</Alert>)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          Reset your password
        </Typography>
        {status}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Enter new password"
            type="password"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm the password"
            type="password"
            id="password2"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset your password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
