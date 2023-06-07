import * as React from 'react';
import { useDispatch, useSelector } from "react-redux"
import PropTypes from 'prop-types';
import { modalConfig } from './modalConfig';
import {
    Button,
    Typography,
    Box
} from "@mui/material";
import { checkEmail } from "../../store/actions"
import {
StyledBlackButton,
    StyledWhiteButton
} from "../LoginModal/loginModalStyles";

import { StyledBox } from "./style"
import { Link } from "react-router-dom"
import { useModal } from '../../context/ModalContext';
import { changeEmail } from '../../util/util';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Logo from "../common/icon/Logo";
import CloseIcon from '../common/icon/CloseIcon';
import {apiUrl} from "../../apiConfig";

export const SendCodeModal = ({ id }) => {
    const dispatch = useDispatch()
    const email = useSelector(state => state.forgot.forgotPasswordEmail)
    const updatedEmail = changeEmail(email)

    const { setOpenSendCode, setOpenWeSend, setOpenForgot } = useModal()
    const { title,
        text,
        secondText,
        buttonText,
        secondaryButtonText,
        link,
        linkText,
        secondLinkText,
        boldText } = modalConfig[id]
    const handleClick = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch(`${apiUrl}/api/changepassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                })
            })
            console.log(res)
            if (res.ok) {
                const data = await res.json()
                dispatch(checkEmail(data.email))
                setOpenSendCode(false);
                setOpenWeSend(true)
            }
        }
        catch (error) {
            console.error("An error occurred:", error);
            setErrors({ email: "An error occurred, please try again" });
        }
    }
    const onclose = () => {
        setOpenSendCode(false),
        setOpenForgot(false)
    }
    return (
        <Box sx={StyledBox}>
            <CloseIcon  onClick={onclose} />
            <Logo />
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
                <CheckCircleIcon />
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {linkText}
                <Link path="/support">{link}</Link>
                {secondLinkText}
            </Typography>
            <Button type="submit"
                variant="contained" sx={StyledBlackButton} onClick={handleClick} fullWidth={true}>{buttonText}
            </Button>
            <Button variant="contained" sx={StyledWhiteButton} fullWidth={true} onClick={onclose}>{secondaryButtonText}</Button>
        </Box>
    )
}
SendCodeModal.propTypes = {
    id: PropTypes.string
};