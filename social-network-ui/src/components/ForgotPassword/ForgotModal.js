import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { modalConfig } from "./modalConfig";
import { Button, Typography, Box, FormControl } from "@mui/material";
import { StyledBox, StyledModalText } from "./style";
import InputFieldWithError from "../common/input";
import { useModal } from "../../context/ModalContext";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { checkEmail } from "../../store/actions";
import {
    StyledBlackButton,
    StyledFormControl,
    StyledHeaderModalText
} from "../LoginModal/loginModalStyles";

import Logo from "../common/icon/Logo";
import CloseIcon from "../common/icon/CloseIcon";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const ForgotModal = ({ id }) => {
    const dispatch = useDispatch();
    const { setOpenForgot, setOpenSendCode } = useModal();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        text,
        title,
        buttonText,
        name,
        inputType,
        typeButton
    } = modalConfig[id];

    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    const xxsStyles = {
        AdaptiveStyledBlackButton: { ...StyledBlackButton, marginTop: "20px", width: "70%" },
        AdaptiveStyledFormControl:{ ...StyledFormControl, width: "80vw" },
        AdaptiveField:{ width: "70%" }
    };

    const xsStyles = {
        AdaptiveStyledBlackButton: { ...StyledBlackButton, marginTop: "20px", width: "70%" },
        AdaptiveStyledFormControl:{ ...StyledFormControl, width: "80vw" },
        AdaptiveField:{ width: "70%" }
    };

    const smStyles = {
        AdaptiveStyledBlackButton: { ...StyledBlackButton, marginTop: "20px", width: "70%" },
        AdaptiveStyledFormControl:{ ...StyledFormControl, width: "80vw" },
        AdaptiveField:{ width: "70%" }
    };

    const mdStyles = {
        AdaptiveStyledBlackButton: { ...StyledBlackButton, marginTop: "20px" },
        AdaptiveStyledFormControl:{ ...StyledFormControl },
        AdaptiveField:{ width: "400px" }

    };

    const lgStyles = {
        AdaptiveStyledBlackButton: { ...StyledBlackButton, marginTop: "20px" },
        AdaptiveStyledFormControl:{ ...StyledFormControl },
        AdaptiveField:{ width: "400px" }
    };

    const xlStyles = {
        AdaptiveStyledFormControl:{ ...StyledFormControl },
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px" },
        AdaptiveField:{ width: "400px" }
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
        <Box sx={StyledBox}>
            <CloseIcon onClick={() => setOpenForgot(false)}/>
            <Logo/>
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
                dispatch(checkEmail(values.email));
                setOpenSendCode(true);
            }
            }>
                <Form>
                    <FormControl sx={styles.AdaptiveStyledFormControl}>
                        <Field as={InputFieldWithError} sx={styles.AdaptiveField} name={name}
                               id={name}
                               label="Email" disabled={isSubmitting} type={inputType}/>
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
ForgotModal.propTypes = {
    id: PropTypes.string
};