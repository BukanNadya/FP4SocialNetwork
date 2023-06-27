import React, { useState } from "react";

import { Button, FormControl, Typography, SvgIcon } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { checkEmailFetch, closeLoginModal } from "../../store/actions";

import { setUserEmail } from "../../store/actions";
import { InputFieldWithError } from "./InputFieldWithError";
import {
    EnterEmailModalLink,
    StyledBlackButton,
    StyledFormControl,
    StyledHeaderModalText,
    StyledSpanElement,
    StyledWhiteButton
} from "./loginModalStyles";
import PropTypes from "prop-types";
import { useModal } from "../../context/ModalContext";
import { GoogleSvgIcon } from "./GoogleSvgIcon";
import {apiUrl} from "../../apiConfig";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StyledContentBox } from "../CreateAccountModal/CreateAccountModalStyles";

export function EnterEmailModal() {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { openForgot, setOpenForgot } = useModal();
    const theme = useTheme();


    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
        AdaptiveLink:{
            ...StyledBlackButton,
            ...EnterEmailModalLink,
            width:"70%"
        },
        AdaptiveFormControl:{
            ...StyledFormControl,
            width:"100%",
            maxWidth:"400px"
        },
        AdaptiveStyledBlackButton:{
            ...StyledBlackButton,
            width:"80%"
        },
        AdaptiveStyledWhiteButton:{
            ...StyledWhiteButton,
            width:"80%"
        }
    };

    const xsStyles = {
        AdaptiveLink:{
            ...StyledBlackButton,
            ...EnterEmailModalLink,
            width:"70%"
        },
        AdaptiveFormControl:{
            ...StyledFormControl,
            width:"100%",
            maxWidth:"400px"
        },
        AdaptiveStyledBlackButton:{
            ...StyledBlackButton,
            width:"80%"
        },
        AdaptiveStyledWhiteButton:{
            ...StyledWhiteButton,
            width:"80%"
        }
    };

    const smStyles = {
        AdaptiveLink:{
            ...StyledBlackButton,
            ...EnterEmailModalLink,
            width:"70%",
            maxWidth:"400px"
        },
        AdaptiveFormControl:{
            ...StyledFormControl,
            width:"100%",
            maxWidth:"400px"
        },
        AdaptiveStyledBlackButton:{
            ...StyledBlackButton
        },
        AdaptiveStyledWhiteButton:{
            ...StyledWhiteButton
        }
    };

    const mdStyles = {
        AdaptiveLink:{
            ...StyledBlackButton,
            ...EnterEmailModalLink,
            width:"70%",
            maxWidth:"400px"
        },
        AdaptiveFormControl:{
            ...StyledFormControl,
            width:"100%",
            maxWidth:"400px"
        },
        AdaptiveStyledBlackButton:{
            ...StyledBlackButton
        },
        AdaptiveStyledWhiteButton:{
            ...StyledWhiteButton
        }
    };

    const lgStyles = {
        AdaptiveLink:{
            ...StyledBlackButton,
            ...EnterEmailModalLink,
            width:"70%",
            maxWidth:"400px"
        },
        AdaptiveFormControl:{
            ...StyledFormControl
        },
        AdaptiveStyledBlackButton:{
            ...StyledBlackButton
        },
        AdaptiveStyledWhiteButton:{
            ...StyledWhiteButton
        }
    };

    const xlStyles = {
        AdaptiveLink:{
            ...StyledBlackButton,
            ...EnterEmailModalLink,
            width:"70%",
            maxWidth:"400px"
        },
        AdaptiveFormControl:{
           ...StyledFormControl
        },
        AdaptiveStyledBlackButton:{
            ...StyledBlackButton
        },
        AdaptiveStyledWhiteButton:{
            ...StyledWhiteButton
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

    const handleForgot = () => {
        setOpenForgot(!openForgot);
        dispatch(closeLoginModal());
    };

    return (
        <>
            <Typography sx={StyledHeaderModalText}>Sign in to Capitweet</Typography>
            <a href={`${apiUrl}/oauth2/authorization/google`} style={styles.AdaptiveLink}><GoogleSvgIcon/> Sign in with Google</a>
            <Typography component="span" sx={StyledSpanElement}
            >or</Typography>
            <Formik initialValues={{
                email: "",
            }} validationSchema={
                Yup.object(
                    {
                        email: Yup.string().email("Please enter a correct email").required("email is required")
                    }
                )} onSubmit={async (values, { setErrors, setSubmitting }) => {
                setIsSubmitting(true);
                await dispatch(checkEmailFetch(values, setErrors))
                setIsSubmitting(false);
                setSubmitting(false);
            }}>

                <Form style={{display:"flex",justifyContent:"center", alignItems:"center", width:"80%"}}>
                    <FormControl style={styles.AdaptiveFormControl}>
                        <Field as={InputFieldWithError}  name={"email"}
                               id="email"
                               data-testid="email_modal"
                               label="Email" style={{width:"100%"}} disabled={isSubmitting} type="text"/>
                        <Button type="submit"
                                variant="contained" sx={styles.AdaptiveStyledBlackButton} disabled={isSubmitting}
                                fullWidth={true}>Next</Button>
                        <Button variant="contained" sx={styles.AdaptiveStyledWhiteButton} fullWidth={true} onClick={handleForgot}>Forgot
                            password?</Button>
                    </FormControl>
                </Form>
            </Formik>
        </>
    );
}

EnterEmailModal.propTypes = {
    userData: PropTypes.object,
};