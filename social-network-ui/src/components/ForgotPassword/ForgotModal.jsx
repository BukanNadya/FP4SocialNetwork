import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { modalConfig } from './modalConfig';
import { Button, Typography, Box, FormControl } from "@mui/material";
import { StyledBox, StyledHeaderModalText, StyledModalText, StyledFormControl, StyledSpanElement, StyledWhiteButton } from "./style"
import BasicButton from '../common/button';
import InputFieldWithError from "../common/input"
import { useModal } from '../../context/ModalContext';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { checkEmail } from "../../store/actions"

import Logo from "../common/icon/Logo";
import CloseIcon from '../common/icon/CloseIcon';


export const ForgotModal = ({ id }) => {
    const { setOpenForgot, setOpenSendCode } = useModal()
    // const [credential, setCredential] = useState("")
    // const userDataState = useSelector(state => state.loginUserData.userData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userDataState = {};
    const { text,
        title,
        buttonText,
        placeholder,
        name,
        iconStatus,
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
                })} onSubmit={async (values, { setErrors, setSubmitting }) => {
                    setIsSubmitting(true);
                    console.log(1)
                    try {
                        const res = await fetch("http://localhost:8080/api/changepassword", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: values.email,
                            })
                        })
                        if (res.ok) {
                            const data = await res.json()
                            dispatch(checkEmail(data))
                        }
                    }
                    catch (error) {
                        console.error("An error occurred:", error);
                        setErrors({ email: "An error occurred, please try again" });
                    } finally {
                        setIsSubmitting(false);
                        setSubmitting(false);
                    }
                }
                }>
                <Form>
                    <FormControl sx={StyledFormControl}>
                        {/* <Field as={InputFieldWithError} sx={{ width: "400px" }} name={name}
                        id="userName"
                        label={placeholder} disabled={isSubmitting} type="text"
                        value={email}
                         /> */}
                        <Field as={InputFieldWithError} sx={{ width: "400px" }} name={"email"}
                            id="email"
                            label="Email" disabled={isSubmitting} type="text" />

                        {/* <BasicButton text={buttonText} color="black" type={typeButton} /> */}
                        <Button type="submit"
                            variant="contained" disabled={isSubmitting}
                            fullWidth={true}>{buttonText}</Button>
                    </FormControl>
                </Form>
                {/* <Box
                    component="form"
                    sx={StyledFormControl}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                > */}
                {/* </Box> */}
            </Formik>
        </Box>
    )
}
ForgotModal.propTypes = {
    id: PropTypes.string
};