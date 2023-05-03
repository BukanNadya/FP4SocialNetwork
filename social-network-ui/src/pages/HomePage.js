import React from "react";


import {Footer} from "../components/EnteringHomePage/Footer";
import {LeftNavigationBar} from "../components/EnteringHomePage/LeftNavigationBar";
import {Container, Grid,} from "@mui/material";

import {Newsfeed} from "../components/EnteringHomePage/Newsfeed";






export function HomePage() {
    return (
        <>
        <Container sx={{minWidth: "1300px"}} >
            <Grid container spacing={3} >
                    <LeftNavigationBar/>
                    <Newsfeed/>
            </Grid>
        </Container>
        <Footer/>
        </>
    )
}