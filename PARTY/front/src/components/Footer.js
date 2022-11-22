import React from "react";
import {Container, Grid, Box, Link, Typography} from "@mui/material";


export const Footer = () => {
    return (
        <footer>
            <Box
                px={{xs: 3}}
                py={{xs: 3}}
                bgcolor="text.secondary"
                color="white">
                <Container maxWidth="lg">
                    <Grid container spacing={5}>

                        <Grid item xs={12} sm={6}>
                            <Box borderBottom={1}>
                                <Typography variant="subtitle2">
                                    Customer
                                </Typography>
                            </Box>
                            <Box>
                                <Link color="inherit" href="/">
                                    How it works?
                                </Link>
                            </Box>
                            <Box>
                                <Link color="inherit" href="/">
                                    Contact
                                </Link>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box borderBottom={1}>
                                <Typography variant="subtitle2">
                                    Partners
                                </Typography>
                            </Box>
                            <Box>
                                <Link color="inherit" href="/addannouncement">
                                    Add your announcement
                                </Link>
                            </Box>
                            <Box>
                                <Link color="inherit" href="/">
                                    Become our partner
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box textAlign="center" pt={{xs: 3}} pb={{xs: 1}}>
                        PartyWizard &reg; {new Date().getFullYear()}
                    </Box>

                </Container>
            </Box>
        </footer>
    )
}