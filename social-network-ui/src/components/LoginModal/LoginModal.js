import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Typography, Box, Link, SvgIcon } from "@mui/material";
import { useModal } from "../../context/ModalContext";

import { EnterPasswordModal } from "./EnterPasswordModal";
import { EnterEmailModal } from "./EnterEmailModal";
import { StyledModal, StyledBox, StyledTwitSvgIcon, StyledCloseSvgIcon } from "./loginModalStyles";
import { openSignUpModal, closeLoginModal } from "../../store/actions";
import { SvgIconCapybara } from "./SvgIconCapybara";
import { CloseSvgIcon } from "./CloseSvgIcon";

export function LoginModal() {
    const userDataState = useSelector(state => state.loginUserData.userLoginData);
    const dispatch = useDispatch();

    function OpenSignUpModalAndCloseLoginModal() {
        dispatch(openSignUpModal());
        dispatch(closeLoginModal());
    }

    return (
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={() => {
                dispatch(closeLoginModal());
            }}
            sx={StyledModal}>
            <Box sx={StyledBox}>
                <CloseSvgIcon closeFunction={  ()=>{dispatch(closeLoginModal())}}/>
                <SvgIconCapybara/>
                {userDataState.email ? (<EnterPasswordModal userData={userDataState}/>) : (
                    <EnterEmailModal userData={userDataState}/>)}
                <Typography sx={{ marginTop: "30px" }}>Don`t have an account? <Link href="#"
                                                                                    onClick={OpenSignUpModalAndCloseLoginModal}>Sign
                    Up</Link></Typography>
            </Box>
        </Modal>
    );
}