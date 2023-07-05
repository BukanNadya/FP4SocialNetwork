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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StyledWhiteButton } from "../LoginModal/loginModalStyles";

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

    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    const xxsStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
            width:"100%"
        },
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px" , width: "70%" },
        AdaptiveStyledWhiteButton:{ ...StyledWhiteButton, marginTop: "20px", width: "70%" },
        styledField: { width: "100%" }
    };

    const xsStyles = {
        AdaptiveStyledBox: {
            ...StyledBox
            ,
            width:"100%"
        },
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px", width: "70%"  },
        AdaptiveStyledWhiteButton:{ ...StyledWhiteButton, marginTop: "20px", width: "70%" },
        styledField: { width: "100%" }
    };

    const smStyles = {
        AdaptiveStyledBox: {
            ...StyledBox
            ,
            width:"100%"
        },
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px", width: "70%"  },
        AdaptiveStyledWhiteButton:{ ...StyledWhiteButton, marginTop: "20px", width: "70%" },
        styledField: { width: "400px" }
    };

    const mdStyles = {
        AdaptiveStyledBox: {
            ...StyledBox
            ,
        },
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px" },
        AdaptiveStyledWhiteButton:{ ...StyledWhiteButton, marginTop: "20px", width: "70%" },
        styledField: { width: "400px" }
    };

    const lgStyles = {
        AdaptiveStyledBox: {
            ...StyledBox
        },
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px" },
        AdaptiveStyledWhiteButton:{ ...StyledWhiteButton, marginTop: "20px" },
        styledField: { width: "400px" }
    };

    const xlStyles = {
        AdaptiveStyledBox: {
            ...StyledBox
        },
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px" },
        AdaptiveStyledWhiteButton:{ ...StyledWhiteButton, marginTop: "20px" },
        styledField: { width: "400px" }

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
        <Box sx={styles.AdaptiveStyledBox}>
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
                        if (res.ok) {
                            const data = await res.json()
                            setOpenWeSend(false);
                            setOpenChoose(true)
                    
                        }
                    }
                    catch (error) {
                        console.warn("An error occurred:", error);
                        setErrors({ email: "An error occurred, please try again" });
                    }
            
            }}>
                <Form>
                    <FormControl sx={StyledFormControl}>
                        <Field as={InputFieldWithError} sx={styles.styledField} name={name}
                            id={name}
                            label={placeholder} disabled={isSubmitting} type={inputType} />
                        <Button type={typeButton}
                            variant="contained" disabled={isSubmitting}
                            sx={styles.AdaptiveStyledBlackButton}
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