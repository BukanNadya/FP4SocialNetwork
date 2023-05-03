import React from 'react';
import {Box, Fab, Grid, SvgIcon, Typography} from '@mui/material'
import { Link } from "react-router-dom"

export function LeftNavigationBar () {

    return (
        <Grid item xs={3}>
        <Box position="fixed" sx={{
            '& > :not(style)': { m: 1 },
            display: "flex",
            flexDirection: "column",
            height: "100%",
        }}>
            <Link to="/" variant="contained">
                <Fab variant="extended" sx={{
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    boxShadow: "none",
                    padding: "0",
                    width: "60px",
                    height: "60px",
                    "&:hover": {
                        transition: "0.7s",
                        backgroundColor: "rgba(15, 20, 25, 0.15)",
                    },
                }}>
                    <SvgIcon viewBox="0 0 24 24" sx={{ width: "40px", height: "40px"}}>
                        <path
                            d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                    </SvgIcon>
                </Fab>
            </Link>
            <Link to="/explore" variant="contained">
                <Fab variant="extended" sx={{
                    borderRadius: "40px",
                    backgroundColor: "#ffffff",
                    boxShadow: "none",
                    padding: "0",
                    width: "150px",
                    height: "60px",
                    "&:hover": {
                        transition: "0.7s",
                        backgroundColor: "rgba(15, 20, 25, 0.15)",
                    },
                }}>
                    <Box sx={{
                        display: "flex"
                    }}>
                        <SvgIcon viewBox="0 0 24 24" sx={{ width: "40px", height: "40px"}}>
                            <path
                                d="M10.64 3.157l-.36 3.593h4.99l.38-3.892 2.99.299-.36 3.593h2.97v2.5h-3.22l-.55 5.5h2.77v2.5h-3.02l-.39 3.892-2.98-.299.36-3.593H9.23l-.39 3.892-2.98-.299.36-3.593H2.75v-2.5h3.72l.55-5.5H3.75v-2.5h3.52l.38-3.892 2.99.299zm3.83 11.593l.55-5.5h-4.99l-.55 5.5h4.99z"></path>
                        </SvgIcon>
                        <Typography variant="h6" component="div" sx={{
                            flexGrow: 1,
                            fontWeight: "700",
                            fontSize: "20px",
                            lineHeight: "24px",
                            display: "flex",
                            alignItems: "center",

                        }}>
                            Explore
                        </Typography>
                    </Box>
                </Fab>
            </Link>
        </Box>
        </Grid>
    )
}

