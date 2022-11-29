import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { removeToken } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/slices/profileSlice";
import { BACKEND_LOCALHOST } from "../../Settings";
import { loged } from "../utils/loged";
import { v4 as uuidv4 } from "uuid";
import { SearchBar } from "./Search";

const useStyles = makeStyles((theme) => ({
  test: {
    backgroundColor: "blue",
  },
}));

export const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [image]);

  useEffect(() => {
    if (!sessionStorage.getItem("uuid")) {
      sessionStorage.setItem("uuid", uuidv4());
    }
  });

  let image;
  let menuIcon;
  let profile_menu;

  const { entities } = useSelector((state) => state.profile);

  const showAvatar = () => {
    image = BACKEND_LOCALHOST.slice(0, -1) + entities.image;
  };

  const pages = {
    // for example:
    // "Button Name" : "URL"
    // "Test Button" : "/testSite"

    "Main Page": "/",
    Categories: "/categories",
  };

  const settings = {
    // for example:
    // "Button Name" : "URL"
    // "Test Button" : "/testSite"
  };

  if (loged) {
    // Set profile picture
    showAvatar();

    // Set settings/options
    pages["Add announcement"] = "/addannouncement";
    settings["Profile"] = "/profile";
    settings["My announcements"] = "/myannouncements";
    settings["My favourites"] = "/myfavourites";
    settings["Settings"] = "/settings";
    settings["Log out"] = "signout";

    // Set profile menu
    profile_menu = (
      <Tooltip title="Settings">
        <IconButton onClick={(e) => handleOpenUserMenu(e)} sx={{ p: 0 }}>
          <Avatar alt="avatar" src={image} />
        </IconButton>
      </Tooltip>
    );
  } else {
    // Set settings/options
    pages["Sing up"] = "/signup";
    pages["Sing in"] = "/signin";
  }

  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleMenu = (pageURL) => {
    if (pageURL === "signout") {
      removeToken();
      window.location.replace("/");
    } else {
      navigate(pageURL);
      setAnchorElUser(null);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    // setAnchorElNav(null)
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    // setAnchorElUser(null)
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    menuIcon = (
      <Box>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {Object.keys(pages).map((page) => (
            <MenuItem key={page} onClick={() => handleMenu(pages[page])}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  } else {
    menuIcon = Object.keys(pages).map((page) => (
      <Button
        key={page}
        onClick={() => handleMenu(pages[page])}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        {page}
      </Button>
    ));
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button onClick={() => handleMenu('/')}>
            <Typography noWrap component="div" sx={{ mr: 1 }}>
              <img src={BACKEND_LOCALHOST + 'media/logo.png'} alt="logo" />
            </Typography>
          </Button>
          <Box sx={{ flexGrow: 1, display: "flex" }}>{menuIcon}</Box>

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <SearchBar />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {profile_menu}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Object.keys(settings).map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() =>
                    handleMenu(settings[setting])
                  }
                >
                  <Typography textAlign="center">
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
