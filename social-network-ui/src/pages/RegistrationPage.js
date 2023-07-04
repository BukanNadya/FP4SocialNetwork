import React, {useEffect} from "react";


import {Footer} from "../components/EnteringRegistrationPage/Footer";
import {LeftNavigationBar} from "../components/EnteringRegistrationPage/LeftNavigationBar";
import {Container, Grid,} from "@mui/material";
import {Newsfeed} from "../components/EnteringRegistrationPage/Newsfeed";
import {useSelector} from "react-redux";
import {LoginModal} from "../components/LoginModal/LoginModal";
import {Content} from "../components/CreateAccountModal/Content";
import {ForgotPasswordModal} from "../components/ForgotPassword/Modal"
import { useModal } from '../context/ModalContext';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


export function RegistrationPage() {

    const isLoginModalOpen = useSelector(state => state.modal.isLoginModal)
    const isSignUpModalOpen = useSelector(state => state.modal.isSignUpModal)
    const {openForgot: isForgotPasswordModal,
        openSendCode: isSendCodeModal,
        openWeSend: isWeSendModal,
        openChoose: isChooseModal,
        openAllSet: isAllSetModal} = useModal()

    useEffect(() => {
        localStorage.setItem("stepInModal", JSON.stringify(1))
    }, [])
let id = null
if(isForgotPasswordModal) id="forgot"
if(isSendCodeModal) id="sendCode"
if(isWeSendModal) id="weSent"
if(isChooseModal) id="choose"
if(isAllSetModal) id="allSet"


    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
        ContainerStyle: {
            minWidth: "100px",
            padding:"0",
            height:"100vh"
        },
        AdaptiveSpacing: 0
    };

    const xsStyles = {
        ContainerStyle: {
            minWidth: "300px",
            padding:"0",
            height:"100vh"
        },
        AdaptiveSpacing: 0
    };

    const smStyles = {
        ContainerStyle: {
            minWidth: "600px",
            height:"100vh"
        },
        AdaptiveSpacing: 0

    };

    const mdStyles = {
        ContainerStyle: {
            minWidth: "900px",
            height:"100vh"
        },
        AdaptiveSpacing: 0
    };

    const lgStyles = {
        ContainerStyle: {
            minWidth: "1200px",
            height:"100vh"
        },
        AdaptiveSpacing: 12
    };

    const xlStyles = {
        ContainerStyle: {
            minWidth: "1300px",
            height:"100vh"
        },
        AdaptiveSpacing: 12

    };

    let styles;
    if (isXl) {
        styles = xlStyles;
    } else if (isLg) {
        styles = lgStyles;
    } else if (isMd) {
        styles = mdStyles;
    } else if (isSm) {
        styles = smStyles;
    } else if (isXs) {
        styles = xsStyles;
    } else {
        styles = xxsStyles;
    }

    return (
        <>
        <Container sx={styles.ContainerStyle} data-testid={"registration_page_container"}>
            <Grid container spacing={styles.AdaptiveSpacing} sx={{height:"100vh"}}>
                {isXxs || isXs ? null  :   <LeftNavigationBar/>}
                    <Newsfeed/>
            </Grid>
        </Container>
        <Footer/>
            {isLoginModalOpen && (<LoginModal/>)}
            {isSignUpModalOpen && (<Content/>)}
            {isForgotPasswordModal && (<ForgotPasswordModal id={id}/>)}
        </>
    )
}