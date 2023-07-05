import React, { useState } from "react";
import PropTypes from "prop-types";
import { modalConfig } from "./modalConfig";
import { Button, Typography, Box, FormControl } from "@mui/material";
import {
    StyledBox,
    StyledHeaderModalText,
    StyledInput,
    StyledBlackButton,
    StyledFormControl,
    StyledModalText
} from "./style";
import { useSelector } from "react-redux";
import InputFieldWithError from "../common/input";
import { useModal } from "../../context/ModalContext";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import Logo from "../common/icon/Logo";
import CloseIcon from "../common/icon/CloseIcon";
import { apiUrl } from "../../apiConfig";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Choose = ({ id }) => {
    const { setOpenChoose, setOpenAllSet, setOpenForgot } = useModal();
    const {
        title,
        text,
        buttonText,
        placeholder,
        inputType,
        name,
        typeButton,
        secondName,
        secondPlaceholder
    } = modalConfig[id];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const email = useSelector(state => state.forgot.forgotPasswordEmail);
    const onclose = () => {
        setOpenChoose(false),
            setOpenForgot(false);
    };

    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    const xxsStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
            width: "100%"
        },
        AdaptiveStyledBlackButton: { ...StyledBlackButton, marginTop: "20px", width: "70%" },
        AdaptiveFormControl: { ...StyledFormControl, width: "200px" }
        ,
        AdaptiveInput: {
            ...StyledInput, width: "200px"
        }
    };

    const xsStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
            width: "100%"
        },
        AdaptiveStyledBlackButton: { ...StyledBlackButton, marginTop: "20px", width: "70%" },
        AdaptiveFormControl: { ...StyledFormControl, width: "300px" }
        ,
        AdaptiveInput: {
            ...StyledInput, width: "300px"
        }

    };

    const smStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
            width: "100%"
        },
        AdaptiveStyledBlackButton: { ...StyledBlackButton, marginTop: "20px", width: "70%" },
        AdaptiveFormControl: { ...StyledFormControl, width: "400px" }
        ,
        AdaptiveInput: {
            ...StyledInput, width: "400px"
        }

    };

    const mdStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
        },
        AdaptiveStyledBlackButton: { ...StyledBlackButton, marginTop: "20px" },
        AdaptiveFormControl: { ...StyledFormControl }
        ,
        AdaptiveInput: {
            ...StyledInput
        }
    };

    const lgStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
        },
        AdaptiveStyledBlackButton: { ...StyledBlackButton, marginTop: "20px" },
        AdaptiveFormControl: { ...StyledFormControl }
        ,
        AdaptiveInput: {
            ...StyledInput
        }
    };

    const xlStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
        },
        AdaptiveStyledBlackButton: { ...StyledBlackButton, marginTop: "20px" },
        AdaptiveFormControl: { ...StyledFormControl },
        AdaptiveInput: {
            ...StyledInput
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
        <Box sx={styles.AdaptiveStyledBox}>
            <CloseIcon onClick={onclose}/>
            <Logo/>
            <Typography sx={StyledHeaderModalText} variant="h6" component="h2">
                {title}
            </Typography>
            <Typography id="modal-modal-description" sx={StyledModalText}>
                {text}
            </Typography>
            <Formik initialValues={{
                confirmPassword: "",
                password: "",
            }} validationSchema={
                Yup.object(
                    {
                        password: Yup.string()
                            .required("Password is required")
                            .min(8, "Must be at least 8 digits"),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref("password"), null], "Passwords don't match!")
                            .required("Password is required")
                            .min(8, "Must be at least 8 digits")
                    }
                )} onSubmit={async (values, { setErrors }) => {
                setIsSubmitting(true);
                try {
                    const res = await fetch(`${apiUrl}/api/newpassword`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: email,
                            password: values.password
                        })
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setOpenChoose(false);
                        setOpenAllSet(true);
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                    setErrors({ password: "An error occurred, please try again" });
                }
            }
            }>
                <Form>
                    <FormControl sx={styles.AdaptiveFormControl}>
                        <Field as={InputFieldWithError} sx={styles.AdaptiveInput} name={name}
                               id={name}
                               label={placeholder} disabled={isSubmitting} type={inputType}/>
                        <Field as={InputFieldWithError} sx={styles.AdaptiveInput} name={secondName}
                               id={secondName}
                               label={secondPlaceholder} disabled={isSubmitting} type={inputType}/>
                        <Button type={typeButton}
                                variant="contained" disabled={isSubmitting}
                                sx={styles.AdaptiveStyledBlackButton}
                                fullWidth={true}>{buttonText}</Button>
                    </FormControl>
                </Form>
            </Formik>
        </Box>
    );
};
Choose.propTypes = {
    id: PropTypes.string
};