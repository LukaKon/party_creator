import React from "react";
import {Container, Grid, Box, Link, Typography} from "@mui/material";


export const Footer = () => {
    return (
        <footer>
            <Box
                margin={1}
                px={{xs: 3}}
                py={{xs: 3}}
                bgcolor="text.secondary"
                color="white">
                <Container maxWidth="lg">
                    <Grid container spacing={5}>

                        <Grid item xs={12} sm={6}>
                            <Box borderBottom={1}>
                                <Typography variant="subtitle2">
                                    Klienci
                                </Typography>
                            </Box>
                            <Box>
                                <Link color="inherit" href="/">
                                    Jak to działa?
                                </Link>
                            </Box>
                            <Box>
                                <Link color="inherit" href="/">
                                    Kontakt
                                </Link>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box borderBottom={1}>
                                <Typography variant="subtitle2">
                                    Partnerzy
                                </Typography>
                            </Box>
                            <Box>
                                <Link color="inherit" href="/">
                                    Dodaj swoje ogłoszenie
                                </Link>
                            </Box>
                            <Box>
                                <Link color="inherit" href="/">
                                    Zostań naszym partnerem
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