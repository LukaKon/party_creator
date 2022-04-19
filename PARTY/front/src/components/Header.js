import React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    useMediaQuery,
    useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router-dom";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    test: {
        backgroundColor: "blue"
    }
}))

const pages = {
    // for example:
    // "Button Name" : "URL"
    // "Test Button" : "/testSite"
    "Stworz impreze": "/createparty",
    "Dodaj swoje ogloszenie": "/addannouncement",
    "Wynajmij firme/lokal": "/example",
}

const settings = {
    'Ustawienia konta': '/settings',
    'Wyloguj sie': '/logout',
}

export const Header = () => {
    // let navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleMenu = (pageURL) => {
        // navigate(pageURL);
        console.log(pageURL)
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    let menuIcon;
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
                    {Object.keys(pages).map((page) =>
                        <MenuItem key={page} onClick={() => handleMenu(pages[page])}>
                            <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                    )}
                </Menu>
            </Box>
        )
    } else {
        menuIcon = (
            Object.keys(pages).map((page) => (
                <Button
                    key={page}
                    onClick={() => handleMenu(pages[page])}
                    sx={{my: 2, color: "white", display: "block"}}>
                    {page}
                </Button>
            ))
        )
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        noWrap
                        component="div"
                        sx={{mr:1}}>
                        <img src={"media/logo.png"} alt="logo"/>
                    </Typography>

                    <Box sx={{flexGrow: 1, display: "flex"}}>
                        {menuIcon}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Ustawienia">
                            <IconButton onClick={handleOpenUserMenu} sx={{p:0}}>
                                <Avatar alt="avatar" src="/media/default.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical:"top",
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
                            {Object.keys(settings).map((setting)=>
                            <MenuItem key={setting} onClick={() => handleMenu(settings[setting])}>
                                <Typography textAlign="center">
                                    {setting}
                                </Typography>
                            </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}