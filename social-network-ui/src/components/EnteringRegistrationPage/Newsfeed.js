import React from 'react';
import {AppBar, Box, Card, CardContent, Toolbar, Typography, Grid} from "@mui/material";
import {RightSideMenu} from "./RightSideMenu";
import { PostsDisplaying } from "../Posts/PostsDisplaying";

export function Newsfeed ()  {
    return (
        <Grid item xs={9}>
        <Box display="grid" gridTemplateColumns="600px 350px" gap={2} sx={{height: "100%", position: "relative", width: "970px"}}>

            <Card sx={{ minWidth: 275, height: '100vh', position: "relative", width: "600px"}}>
                <CardContent sx={{padding: "0"}}>
                    <AppBar position="fixed" color="primary" sx={{ top: '0', right: "auto", backgroundColor: "rgba(255, 255, 255, 0.85)", boxShadow: "none", maxWidth: "600px"}}>
                        <Toolbar sx={{
                            height: "72px",

                        }}>
                            <Typography variant="h5" component="div" sx={{color: "#000000", fontFamily: "'Lato', sans-serif"}}>
                                Review
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </CardContent>
                <PostsDisplaying/>
            </Card>
            <RightSideMenu/>
        </Box>
        </Grid>
    )
}

