import * as React from 'react';
import PropTypes from 'prop-types';
import { modalConfig } from './modalConfig';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledBox, StyledHeaderModalText, StyledBlackButton, StyledFormControl, StyledSpanElement, StyledWhiteButton  } from "./style"
import BasicButton from '../common/button';
import {Link} from "react-router-dom"
import { useModal } from '../../context/ModalContext';
import { changeEmail } from '../../util/util';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

import Logo from "../common/icon/Logo";
import CloseIcon from '../common/icon/CloseIcon';

export const SendCodeModal = ({ id }) => {
    const email = "demo@gmail.com"
    const updatedEmail = changeEmail(email)
    console.log(updatedEmail)
    const {setOpenSendCode, setOpenWeSend} = useModal()
    const { title,
        text,
        secondText,
        buttonText,
        secondaryButtonText,
        link,
        linkText,
        secondLinkText,
        boldText } = modalConfig[id]
        const handleClick = () => {
            setOpenSendCode(false);
            setOpenWeSend(true)
        }
        const handleClose = () => {
            setOpenSendCode(false)
        }
    return (
        <Box sx={StyledBox}>
            <CloseIcon onClick={() => setOpenForgot(false)}/>
            <Logo/>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {title}
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {text}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {secondText}
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {boldText} {updatedEmail}
                <CheckCircleIcon/>
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {linkText}
                <Link path="/support">{link}</Link>
                {secondLinkText}
            </Typography>

            <BasicButton color="black" text={buttonText} onClick={handleClick} />
            <BasicButton color="white" variant="secondarybtn" text={secondaryButtonText} onClick={handleClose} />
        </Box>
    )
}
SendCodeModal.propTypes = {
    id: PropTypes.string
};