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


export function ContentThirdStep() {
    const dispatch = useDispatch();
    const [codeCounter, setCodeCounter] = useState(0);
    const [code, setCode] = useState(true);


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
                        const url = "http://localhost:8080/activate";
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
                                    console.error('Error:', error);
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
                        <Form onSubmit={formikProps.handleSubmit}>
                            <Box sx={ StyledFirstStepDateofBirthBox }>
                            
                            <FormControl sx={ StyledFirstStepFormControl } variant="outlined">
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
                                    sx={{ marginBottom: "5px", width: "400px", }}
                                />
                                {formikProps.touched.code && formikProps.errors.code && (
                                    <ErrorText>{formikProps.errors.code}</ErrorText>
                                )}
                            </FormControl>
                            </Box>
                            <Box sx={ StyledFirstStepDateofBirthBox }>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                        dispatch({ type: SET_STEP_MODAL, step: 2 });
                                    }}
                                    >Did not receive a letter?
                                </Link>
                            </Box>
                                <Button variant="contained" sx={ StyledFirstStepButton } type="submit" fullWidth={true} >Next</Button>
                        </Form>
                    )}
                </Formik>
        </>
    );
}