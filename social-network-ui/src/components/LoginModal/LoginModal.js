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
import useMediaQuery from "@mui/material/useMediaQuery";
import { SidebarLogOutButton } from "../NavigationComponents/NavigationStyles";
import { useTheme } from "@mui/material/styles";

export function LoginModal() {
    const userDataState = useSelector(state => state.loginUserData.userLoginData);
    const dispatch = useDispatch();
    const theme = useTheme();

    function OpenSignUpModalAndCloseLoginModal() {
        dispatch(openSignUpModal());
        dispatch(closeLoginModal());
    }

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    const xxsStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: "0"
        }
    };

    const xsStyles = {
        AdaptiveStyledBox: {
            ...StyledBox
            ,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: "0"
        }
    };

    const smStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: "0"
        }
    };

    const mdStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
        }
    };

    const lgStyles = {
        AdaptiveStyledBox: {
            ...StyledBox
        }
    };

    const xlStyles = {
        AdaptiveStyledBox: {
            ...StyledBox
        }
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
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={() => {
                dispatch(closeLoginModal());
            }}
            sx={StyledModal}>
            <Box sx={styles.AdaptiveStyledBox}>
                <CloseSvgIcon closeFunction={() => {
                    dispatch(closeLoginModal());
                }}/>
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