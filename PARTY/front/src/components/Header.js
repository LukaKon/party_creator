import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
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
import {makeStyles} from "@mui/styles";
import {handleButton} from "../utils";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfile} from "../redux/slices/profileSlice";
import {BACKEND_LOCALHOST} from '../../Settings'
import {fetchCategories} from "../redux/slices/categorySlice";


const useStyles = makeStyles((theme) => ({
    test: {
        backgroundColor: "blue",
    },
}));


export const Header = () => {
    let image;
    let menuIcon;
    let profile_menu;

    const {entities} = useSelector(
        (state) => state.profile
    );

    const showAvatar = () => {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(fetchProfile())
        }, [entities.image]);

        image = BACKEND_LOCALHOST.slice(0,-1) + entities.image

    }

    const pages = {
        // for example:
        // "Button Name" : "URL"
        // "Test Button" : "/testSite"

        "strona główna": '/',
        'test api': "/testapi",
        'Ogłoszenia' : '/categories'
    }

    const settings = {
        // for example:
        // "Button Name" : "URL"
        // "Test Button" : "/testSite"
    };

    if (sessionStorage.getItem("access_token")) {
        // Set profile picture
        showAvatar()

        // Set settings/options
        pages["Add announcement"] = "/addannouncement"
        settings["Profil"] = "/profile"
        settings["Ustawienia konta"] = "/settings"
        settings['Wyloguj sie'] = "signout"

        // Set profile menu
        profile_menu = (
            <Tooltip title="Ustawienia">
                <IconButton
                    onClick={(e) => handleOpenUserMenu(e)}
                    sx={{p: 0}}
                >
                    <Avatar alt="avatar" src={image}/>
                </IconButton>
            </Tooltip>
        )
    } else {
        // Set settings/options
        pages["Zarejestruj"] = "/signup"
        pages["Zaloguj"] = "/signin"
    }

    let navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleMenu = (pageURL) => {
        if (pageURL === 'signout') {
            handleButton()
            window.location.replace('/');
        } else {
            navigate(pageURL);
        }
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
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
                    <MenuIcon/>
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
                        display: {xs: "block", md: "none"},
                    }}
                >
                    {Object.keys(pages).map((page) => (
                        <MenuItem
                            key={page}
                            onClick={() => handleMenu(pages[page])}
                        >
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
                sx={{my: 2, color: "white", display: "block"}}
            >
                {page}
            </Button>
        ));
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography noWrap component="div" sx={{mr: 1}}>
                        <img src={require('../media/logo.png')} alt="logo"/>
                    </Typography>

                    <Box sx={{flexGrow: 1, display: "flex"}}>{menuIcon}</Box>

                    <Box sx={{flexGrow: 0}}>
                        {profile_menu}
                        <Menu
                            sx={{mt: "45px"}}
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
