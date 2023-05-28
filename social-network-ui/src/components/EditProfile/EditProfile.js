import React from 'react';
import {Box, Link, Modal, SvgIcon, Typography} from "@mui/material";

import {StyledBox, StyledCloseSvgIcon, StyledModal, StyledTwitSvgIcon} from "../LoginModal/loginModalStyles";
import {useDispatch} from "react-redux";
import {closeEditModal} from "../../store/actions";

export function EditProfile () {

    const dispatch = useDispatch()

    return (
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={() => {dispatch(closeEditModal())}}
            sx={StyledModal}>
            <Box sx={StyledBox}>
                <SvgIcon sx={StyledCloseSvgIcon} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                         onClick={() => {dispatch(closeEditModal())}}>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                          fill="#000000"/>
                </SvgIcon>
                <Typography sx={{ marginTop: "30px" }}>Edit profile</Typography>
            </Box>
        </Modal>
    )
}