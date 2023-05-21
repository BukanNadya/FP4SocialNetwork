import React, {useEffect} from "react";


import {Footer} from "../components/EnteringRegistrationPage/Footer";
import {LeftNavigationBar} from "../components/EnteringRegistrationPage/LeftNavigationBar";
import {Container, Grid,} from "@mui/material";
import {Newsfeed} from "../components/EnteringRegistrationPage/Newsfeed";
import {useSelector} from "react-redux";
import {LoginModal} from "../components/LoginModal/LoginModal";
import {Content} from "../components/CreateAccountModal/Content";




export function RegistrationPage() {

    const isLoginModalOpen = useSelector(state => state.modal.isLoginModal)
    const isSignUpModalOpen = useSelector(state => state.modal.isSignUpModal)

    useEffect(() => {
        localStorage.setItem("stepInModal", JSON.stringify(1))
    }, [])

    return (
        <>
        <Container sx={{minWidth: "1350px"}} >
            <Grid container spacing={3} >
                    <LeftNavigationBar/>
                    <Newsfeed/>
            </Grid>
        </Container>
        <Footer/>
            {isLoginModalOpen &&
                (<LoginModal/>)
            }
            {isSignUpModalOpen &&
                (<Content/>)
            }
        </>
    )
}