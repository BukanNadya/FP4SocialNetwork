import React from 'react';
import {AppBar, Box, Card, CardContent, Toolbar, Typography, Grid} from "@mui/material";
import {RightSideMenu} from "./RightSideMenu";

export function Newsfeed ()  {
    return (
        <Grid item xs={9}>
        <Box display="grid" gridTemplateColumns="600px 350px" gap={2} sx={{height: "100vh", position: "relative", width: "970px"}}>
            <Card sx={{ minWidth: 275, position: "relative", width: "600px"}}>
                <CardContent sx={{padding: "0", height: "100vh"}}>
                    <AppBar position="fixed" color="primary" sx={{height:"100vh", top: '0', right: "auto", backgroundColor: "rgba(255, 255, 255, 0.85)", boxShadow: "none", maxWidth: "600px"}}>
                        <Toolbar sx={{
                            height: "72px",

                        }}>
                            <Typography variant="h5" component="div" sx={{color: "#000000"}}>
                                Обзор
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </CardContent>
            </Card>
            <RightSideMenu/>
        </Box>
        </Grid>
    )
}

