import React, { useState } from "react";
import {
    Button,
    FormControl,
    InputLabel,
    Typography,
    OutlinedInput,
    InputAdornment,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
    checkPasswordFetch,
    setRememberMeAction,
    setUserPassword
} from "../../store/actions";
import { InputFieldWithError } from "./InputFieldWithError";
import {
    StyledHeaderModalText,
    StyledFormControl,
    StyledBlackButton,
    StyledWhiteButton,
    StyledCheckbox, EnterPasswordLabel
} from "./loginModalStyles";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { StyledContentBox } from "../CreateAccountModal/CreateAccountModalStyles";

export function EnterPasswordModal() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const userDataState = useSelector(state => state.loginUserData.userLoginData);
    const navigate = useNavigate();

    const theme = useTheme();


    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
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
        AdaptiveFormControl:{
            ...StyledFormControl,
            width:"100%",
            maxWidth:"400px"
        },
        AdaptiveStyledBlackButton:{
            ...StyledBlackButton,
        },
        AdaptiveStyledWhiteButton:{
            ...StyledWhiteButton,
        }
    };

    const mdStyles = {
        AdaptiveFormControl:{
            ...StyledFormControl,
            width:"100%",
            maxWidth:"400px"
        },
        AdaptiveStyledBlackButton:{
            ...StyledBlackButton,
        },
        AdaptiveStyledWhiteButton:{
            ...StyledWhiteButton,
        }
    };

    const lgStyles = {
        AdaptiveFormControl:{
            ...StyledFormControl,
            width:"100%",
            maxWidth:"400px"
        },
        AdaptiveStyledBlackButton:{
            ...StyledBlackButton,
        },
        AdaptiveStyledWhiteButton:{
            ...StyledWhiteButton,
        }
    };

    const xlStyles = {
        AdaptiveFormControl:{
            ...StyledFormControl,
            width:"100%",
            maxWidth:"400px"
        },
        AdaptiveStyledBlackButton:{
            ...StyledBlackButton,
        },
        AdaptiveStyledWhiteButton:{
            ...StyledWhiteButton,
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
        <>
            <Typography sx={StyledHeaderModalText}>Enter your password</Typography>
            <Formik
                initialValues={{
                    email: userDataState.email || "",
                    password: "",
                }} validationSchema={
                Yup.object(
                    {
                        password: Yup.string().required("Password is required")
                    }
                )}
                onSubmit={async (values, { setErrors, setSubmitting }) => {
                    setIsSubmitting(true);
                    dispatch(setUserPassword(values));
                    await dispatch(checkPasswordFetch(values, userDataState, setErrors));
                    navigate("/home");
                    setIsSubmitting(false);
                    setSubmitting(false);
                }}
            >
                <Form style={{display:"flex",justifyContent:"center", alignItems:"center", width:"80%"}}>
                    <FormControl sx={styles.AdaptiveFormControl}>
                        <FormControl sx={{ width: "100%" }} variant="outlined">
                            <InputLabel htmlFor="email" sx={EnterPasswordLabel}>email</InputLabel>
                            <OutlinedInput sx={EnterPasswordLabel}
                                           id="userEmail"
                                           name="userEmail"
                                           type="text"
                                           value={userDataState.email}
                                           disabled
                                           label="Email"
                                           startAdornment={<InputAdornment position="start"/>}
                            />
                        </FormControl>
                        <FormControl sx={
                            styles.AdaptiveFormControl
                        }>
                            <Field as={InputFieldWithError} sx={{ width:"100%", marginTop: "40px" }}
                                   label="Password" disabled={isSubmitting} name={"password"} id="password"
                                   type="password"/>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        onChange={() => dispatch(setRememberMeAction())}
                                    />
                                }
                                label="Remember me"
                                sx={StyledCheckbox}
                            />
                        </FormControl>
                        <Button type="submit"
                                variant="contained" sx={styles.AdaptiveStyledBlackButton} disabled={isSubmitting} fullWidth={true}>Log
                            in</Button>
                        <Button variant="contained" sx={styles.AdaptiveStyledWhiteButton} fullWidth={true}>Forgot password?</Button>
                    </FormControl>
                </Form>
            </Formik>
        </>
    );
}