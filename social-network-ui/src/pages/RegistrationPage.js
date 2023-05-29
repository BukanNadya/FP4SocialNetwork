import React, {useEffect} from "react";


import {Footer} from "../components/EnteringRegistrationPage/Footer";
import {LeftNavigationBar} from "../components/EnteringRegistrationPage/LeftNavigationBar";
import {Container, Grid,} from "@mui/material";
import {Newsfeed} from "../components/EnteringRegistrationPage/Newsfeed";
import {useSelector} from "react-redux";
import {LoginModal} from "../components/LoginModal/LoginModal";
import {Content} from "../components/CreateAccountModal/Content";
import { PostsDisplaying } from "../components/Posts/PostsDisplaying";
import {ForgotPasswordModal} from "../components/ForgotPassword/Modal"
import { useModal } from '../context/ModalContext';


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
    return (
        <>
        <Container sx={{minWidth: "1350px", height:"100vh"}} >
            <Grid container spacing={3} sx={{height:"100vh"}}>
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
            {isForgotPasswordModal &&
                 (<ForgotPasswordModal id={id}/>)
            }
        </>
    )
}