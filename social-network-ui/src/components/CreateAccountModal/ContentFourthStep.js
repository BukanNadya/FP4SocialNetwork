import React, { useState,  } from "react";
import {
     Typography, FormControl, InputLabel,  Button,
    OutlinedInput,
} from "@mui/material";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { step4,  SET_STEP_MODAL } from "../../store/types";
import {
    StyledFirstStepFormControl,
    StyledFirstStepInputLabel,
    StyledFirstStepTypographyPlaceholder,
    StyledFirstStepTypography,
    StyledFirstStepButton,
    StyledFirstStepTypographyDateofBirth,
    StyledFirstStepTypographyDateofBirthInfo,
    StyledFirstStepDateofBirthBox,
} from "./CreateAccountModalStyles";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {closeSignUpModal, openLoginModal} from "../../store/actions";
import {apiUrl} from "../../apiConfig";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function ContentFourthStep() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const valuesState = useSelector((state) => state.stepModal.stepModal.valuesState);

    const theme = useTheme();


    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {

        FirstFormStyle: {...StyledFirstStepFormControl, width: "100%"},
        Form: {width: "100%"},
        TypographyDateofBirth: {...StyledFirstStepTypographyDateofBirth , width: "100%"},
        TypographyDateofBirthInfo: {...StyledFirstStepTypographyDateofBirthInfo, width: "100%"},
        BoxFirstStepDateofBirth: {...StyledFirstStepDateofBirthBox, width: "100%"},
        StyledFirstStepButton: {...StyledFirstStepButton, width: "100%"}

    };

    const xsStyles = {

        FirstFormStyle: {...StyledFirstStepFormControl, width: "100%"},
        Form: {width: "100%"},
        TypographyDateofBirth: {...StyledFirstStepTypographyDateofBirth , width: "100%"},
        TypographyDateofBirthInfo: {...StyledFirstStepTypographyDateofBirthInfo, width: "100%"},
        BoxFirstStepDateofBirth: {...StyledFirstStepDateofBirthBox, width: "100%"},
        StyledFirstStepButton: {...StyledFirstStepButton, width: "100%"}

    };

    const smStyles = {

        FirstFormStyle: {...StyledFirstStepFormControl, width: "100%"},
        Form: {width: "100%"},
        TypographyDateofBirth: {...StyledFirstStepTypographyDateofBirth, width: "100%"},
        TypographyDateofBirthInfo: {...StyledFirstStepTypographyDateofBirthInfo, width: "100%"},
        BoxFirstStepDateofBirth: {...StyledFirstStepDateofBirthBox, width: "100%"},
        StyledFirstStepButton: {...StyledFirstStepButton, width: "100%"}

    };

    const mdStyles = {

        FirstFormStyle: {...StyledFirstStepFormControl},
        Form: {width: "100%"},
        TypographyDateofBirth: {...StyledFirstStepTypographyDateofBirth},
        TypographyDateofBirthInfo: {...StyledFirstStepTypographyDateofBirthInfo},
        BoxFirstStepDateofBirth: {...StyledFirstStepDateofBirthBox},
        StyledFirstStepButton: {...StyledFirstStepButton}

    };

    const lgStyles = {

        FirstFormStyle: {...StyledFirstStepFormControl},
        Form: {width: "100%"},
        TypographyDateofBirth: {...StyledFirstStepTypographyDateofBirth},
        TypographyDateofBirthInfo: {...StyledFirstStepTypographyDateofBirthInfo},
        BoxFirstStepDateofBirth: {...StyledFirstStepDateofBirthBox},
        StyledFirstStepButton: {...StyledFirstStepButton}

    };

    const xlStyles = {

        FirstFormStyle: {...StyledFirstStepFormControl},
        Form: {width: "100%"},
        TypographyDateofBirth: {...StyledFirstStepTypographyDateofBirth},
        TypographyDateofBirthInfo: {...StyledFirstStepTypographyDateofBirthInfo},
        BoxFirstStepDateofBirth: {...StyledFirstStepDateofBirthBox},
        StyledFirstStepButton: {...StyledFirstStepButton}

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

    const handleClickShowcode = () => setPassword((show) => !show);



    const handleSetPassword = (passwordValue) => {
        setPassword(passwordValue);
    };

    const handleSetUsername = (usernameValue) => {
        setUsername(usernameValue);
    };

    const ErrorText = ({ children }) => (
        <Typography color="error" variant="caption">
            {children}
        </Typography>
    );

    ErrorText.propTypes = {
        children: PropTypes.string.isRequired,
    };

    return (
        <>
            <Typography component="span" sx={StyledFirstStepTypography}>Email validation</Typography>
            <Formik
                initialValues={{
                    username: username,
                    password: password,
                }}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .required("Username is required"),
                    password: Yup.string()
                        .required("Password is required")
                        .min(8, "Must be at least 8 digits")
                })}
                onSubmit={async (values, { setErrors }) => {
                    valuesState.password = values.password;
                    valuesState.username = values.username;
                    dispatch({ type: step4, payload: { valuesState: valuesState } });
                    const url = `${apiUrl}/registration`;
                    const requestBody = {
                        username: valuesState.username,
                        password: valuesState.password,
                        email: valuesState.email,
                        name: valuesState.name,
                        day: valuesState.day,
                        month: valuesState.month,
                        year: valuesState.year,
                    };
                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(requestBody),
                        });

                        if (response.ok) {
                            dispatch({ type: SET_STEP_MODAL, step: 3 });
                            dispatch(closeSignUpModal())
                            dispatch(openLoginModal())
                            localStorage.setItem("stepInModal", JSON.stringify(1))
                        } else {
                            setErrors({ password: "wrong data" });
                        }
                    } catch (error) {
                        console.error("Error:", error);
                    }
                }}
            >
                {(formikProps) => (
                    <Form onSubmit={formikProps.handleSubmit} style={styles.Form}>
                        <FormControl sx={styles.FirstFormStyle}>
                            <InputLabel htmlFor="username" sx={StyledFirstStepInputLabel}>
                                <Typography component="span"
                                            sx={StyledFirstStepTypographyPlaceholder}>username</Typography>
                            </InputLabel>
                            <OutlinedInput
                                id="username"
                                type="text"
                                inputProps={{ maxLength: 50 }}
                                onChange={(e) => {
                                    formikProps.handleChange(e);
                                    handleSetUsername(e.target.value);
                                }}
                                sx={{ marginBottom: "5px", width: "100%", }}
                            />
                            {formikProps.touched.username && formikProps.errors.username && (
                                <ErrorText>{formikProps.errors.username}</ErrorText>
                            )}
                        </FormControl>
                        <FormControl sx={styles.FirstFormStyle}>
                            <InputLabel htmlFor="password" sx={StyledFirstStepInputLabel}>
                                <Typography component="span"
                                            sx={StyledFirstStepTypographyPlaceholder}>password</Typography>
                            </InputLabel>
                            <OutlinedInput
                                id="password"
                                inputProps={{ maxLength: 50 }}
                                type={password ? "text" : "password"}
                                onChange={(e) => {
                                    formikProps.handleChange(e);
                                    handleSetPassword(e.target.value);
                                }}
                                sx={{ marginBottom: "5px", width: "100%", }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle code visibility"
                                            onClick={handleClickShowcode}
                                            onMouseDown={setPassword}
                                            edge="end"
                                            sx={{ marginRight: "2px" }}
                                        >
                                            {password ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="password"
                                />
                                {formikProps.touched.password && formikProps.errors.password && (
                                    <ErrorText>{formikProps.errors.password}</ErrorText>
                                )}
                                </FormControl>
                                <Button variant="contained" sx={ styles.StyledFirstStepButton } type="submit" fullWidth={true}>Register</Button>
                        </Form>
                    )}
                </Formik>
        </>
    );
}