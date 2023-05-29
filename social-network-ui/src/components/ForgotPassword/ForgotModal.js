import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux"
import { modalConfig } from './modalConfig';
import { Button, Typography, Box, FormControl } from "@mui/material";
import { StyledBox, StyledModalText } from "./style"
import InputFieldWithError from "../common/input"
import { useModal } from '../../context/ModalContext';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { checkEmail } from "../../store/actions"
import {
    StyledBlackButton,
    StyledFormControl,
    StyledHeaderModalText
} from "../LoginModal/loginModalStyles"

import Logo from "../common/icon/Logo";
import CloseIcon from '../common/icon/CloseIcon';

export const ForgotModal = ({ id }) => {
    const dispatch = useDispatch()
    const { setOpenForgot, setOpenSendCode } = useModal()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { text,
        title,
        buttonText,
        name,
        inputType,
        typeButton } = modalConfig[id]
    return (
        <Box sx={StyledBox}>
            <CloseIcon onClick={() => setOpenForgot(false)} />
            <Logo />
            <Typography sx={StyledHeaderModalText} variant="h6" component="h2">
                {title}
            </Typography>
            <Typography id="modal-modal-description" sx={StyledModalText}>
                {text}
            </Typography>
            <Formik initialValues={{
                email: "",
            }} validationSchema={
                Yup.object({
                    email: Yup.string().email("Please enter a correct email").required("email is required")
                })} onSubmit={async (values) => {
                    setIsSubmitting(true);
                    dispatch(checkEmail(values.email))
                    setOpenSendCode(true)
                }
                }>
                <Form>
                    <FormControl sx={StyledFormControl}>
                        <Field as={InputFieldWithError} sx={{ width: "400px" }} name={name}
                            id={name}
                            label="Email" disabled={isSubmitting} type={inputType} />
                        <Button type={typeButton}
                            variant="contained" disabled={isSubmitting}
                            sx={{ ...StyledBlackButton, marginTop: "20px" }}
                            fullWidth={true}>{buttonText}</Button>
                    </FormControl>
                </Form>
            </Formik>
        </Box>
    )
}
ForgotModal.propTypes = {
    id: PropTypes.string
};