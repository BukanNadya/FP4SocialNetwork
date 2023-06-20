import React, { useState } from "react";
import {
    Modal, Typography, Box, FormControl, InputLabel, Input, Button,
    SvgIcon, OutlinedInput, MenuItem, Select
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Link from '@mui/material/Link';
import * as Yup from "yup";
import { SET_STEP_MODAL } from "../../store/types";
import { StyledContentBox, StyledFirstStepFormControl, StyledFirstStepInputLabel,
    StyledFirstStepTypographyPlaceholder, StyledFirstStepTypographyCounter,
    StyledFirstStepDateofBirthBox, StyledFirstStepButton, StyledFirstStepTypography,
    StyledFirstStepTypographyDateofBirth, StyledFirstStepTypographyDateofBirthInfo} from "./CreateAccountModalStyles";
import {apiUrl} from "../../apiConfig";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


export function ContentThirdStep() {
    const dispatch = useDispatch();
    const [codeCounter, setCodeCounter] = useState(0);
    const [code, setCode] = useState(true);

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
        BoxFirstStepDateofBirth: {...StyledFirstStepDateofBirthBox, width: "100%"},
        StyledFirstStepButton: {...StyledFirstStepButton, width: "100%"}

    };

    const xsStyles = {

        FirstFormStyle: {...StyledFirstStepFormControl, width: "100%"},
        Form: {width: "100%"},
        BoxFirstStepDateofBirth: {...StyledFirstStepDateofBirthBox, width: "100%"},
        StyledFirstStepButton: {...StyledFirstStepButton, width: "100%"}

    };

    const smStyles = {

        FirstFormStyle: {...StyledFirstStepFormControl, width: "100%"},
        Form: {width: "100%"},
        BoxFirstStepDateofBirth: {...StyledFirstStepDateofBirthBox, width: "100%"},
        StyledFirstStepButton: {...StyledFirstStepButton, width: "100%"}

    };

    const mdStyles = {

        FirstFormStyle: {...StyledFirstStepFormControl},
        Form: {width: "100%"},
        BoxFirstStepDateofBirth: {...StyledFirstStepDateofBirthBox},
        StyledFirstStepButton: {...StyledFirstStepButton}

    };

    const lgStyles = {

        FirstFormStyle: {...StyledFirstStepFormControl},
        Form: {width: "100%"},
        BoxFirstStepDateofBirth: {...StyledFirstStepDateofBirthBox},
        StyledFirstStepButton: {...StyledFirstStepButton}

    };

    const xlStyles = {

        FirstFormStyle: {...StyledFirstStepFormControl},
        Form: {width: "100%"},
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


    const handlesetCode = (codeValue) => {
        setCode(codeValue);
    };

    const handleMouseDowncode = (event) => {
      event.preventDefault();
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
                <Typography component="span" sx={{ position: "relative", fontWeight: 700, marginTop: "20px",
                            marginBottom: "10px", width: "400px", fontSize: "20px" }}>Email validation</Typography>
                <Formik
                    initialValues={{
                        code: code,
                    }}
                    validationSchema={Yup.object({
                        code: Yup.string()
                            .required("code is required")
                            .min(6, "Must be 6 digits")
                            .max(6, "Must be 6 digits")
                    })}
                    onSubmit={async (values, { setErrors }) => {
                        const url = `${apiUrl}/api/activate`;
                        const requestBody = {
                            code: code,
                        };

                        try {
                            const response = await fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(requestBody),
                            });

                            if (response.ok) {
                                const responseData = await response.json();
                                const isActivated = responseData.activate === 'true'; // Check the value of "activate" parameter

                                if (isActivated) {
                                    // Handle success and navigate to the desired step
                                    dispatch({ type: SET_STEP_MODAL, step: 4 });
                                } else {
                                    // Handle activation failure
                                    setErrors({ code: "Activation failed" });
                                }
                            } else {
                                // Handle response error
                                console.error('Error:', error);
                                setErrors({ code: "Response error" });
                            }
                        } catch (error) {
                            console.error('Error:', error);
                            setErrors({ code: "Something is wrong." });
                        }
                    }}

                >
                    {(formikProps) => (
                        <Form onSubmit={formikProps.handleSubmit} style={styles.Form}>
                            <Box sx={ styles.BoxFirstStepDateofBirt }>
                            
                            <FormControl sx={ styles.FirstFormStyle } variant="outlined">
                                <InputLabel htmlFor="code" sx={ StyledFirstStepInputLabel }>
                                    <Typography component="span" sx={ StyledFirstStepTypographyPlaceholder }>code</Typography>
                                    <Typography component="span" sx={ StyledFirstStepTypographyCounter }>{codeCounter}/6</Typography>
                                </InputLabel>
                                <OutlinedInput
                                    id="code"
                                    type="text"
                                    inputProps={{ maxLength: 6 }}
                                    onChange={(e) => {
                                        formikProps.handleChange(e);
                                            setCodeCounter(e.target.value.length);
                                            handlesetCode(e.target.value);
                                    }}
                                    sx={{ marginBottom: "5px", width: "100%", }}
                                />
                                {formikProps.touched.code && formikProps.errors.code && (
                                    <ErrorText>{formikProps.errors.code}</ErrorText>
                                )}
                            </FormControl>
                            </Box>
                            <Box sx={ styles.BoxFirstStepDateofBirt }>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                        dispatch({ type: SET_STEP_MODAL, step: 2 });
                                    }}
                                    >Did not receive a letter?
                                </Link>
                            </Box>
                                <Button variant="contained" sx={ styles.StyledFirstStepButton } type="submit" fullWidth={true} >Next</Button>
                        </Form>
                    )}
                </Formik>
        </>
    );
}