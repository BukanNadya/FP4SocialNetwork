import * as React from 'react';
import {useSelector } from "react-redux"
import PropTypes from 'prop-types';
import { modalConfig } from './modalConfig';
import { Button, Typography, Box, FormControl } from "@mui/material";
import { StyledBox, StyledHeaderModalText, StyledModalText, StyledBlackButton, StyledFormControl} from "./style"
import InputFieldWithError from "../common/input"
import { useModal } from '../../context/ModalContext';
import {useState} from "react"

import Logo from "../common/icon/Logo";
import CloseIcon from '../common/icon/CloseIcon';

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {apiUrl} from "../../apiConfig";

export const WeSent = ({ id }) => {
    const email = useSelector(state => state.forgot.forgotPasswordEmail)
    const { setOpenWeSend, setOpenChoose, setOpenForgot } = useModal()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { text,
        title,
        buttonText,
        placeholder,
        inputType,
        name,
    typeButton } = modalConfig[id]
    
    const onclose = () => {
        setOpenWeSend(false),
        setOpenForgot(false)
    }

    return (
        <Box sx={StyledBox}>
        <CloseIcon onClick={onclose} />
        <Logo />
        <Typography sx={StyledHeaderModalText} variant="h6" component="h2">
            {title}
        </Typography>
        <Typography id="modal-modal-description" sx={StyledModalText}>
            {text}
        </Typography>
                <Formik
            initialValues={{
                password: "",
            }} validationSchema={
                Yup.object(
                    {
                        password: Yup.string().required("Password is required")
                    }
                )} onSubmit= {async (values, { setErrors, setSubmitting }) => {
                    try {
                        const res = await fetch(`${apiUrl}/api/codecheck`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                    email: email,
                                    code: values.password
                            })
                        })
                        console.log(res)
                        if (res.ok) {
                            const data = await res.json()
                            setOpenWeSend(false);
                            setOpenChoose(true)
                    
                        }
                    }
                    catch (error) {
                        console.error("An error occurred:", error);
                        setErrors({ email: "An error occurred, please try again" });
                    }
            
            }}>
                <Form>
                    <FormControl sx={StyledFormControl}>
                        <Field as={InputFieldWithError} sx={{ width: "400px" }} name={name}
                            id={name}
                            label={placeholder} disabled={isSubmitting} type={inputType} />
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
WeSent.propTypes = {
    id: PropTypes.string
};