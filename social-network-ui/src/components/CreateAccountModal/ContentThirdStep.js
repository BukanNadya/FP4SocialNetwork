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
    const [code, setCode] = useState("");


    const handleSetCode = (codeValue) => {
        setCode(codeValue);
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
                            .required("Code is required")
                            .min(5, "Must be at least 5 digits")
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                    }}
                >
                    {(formikProps) => (
                        <Form onSubmit={formikProps.handleSubmit}>
                            <Box sx={ StyledFirstStepDateofBirthBox }>
                            <FormControl sx={ StyledFirstStepFormControl }>
                            <InputLabel htmlFor="code" sx={ StyledFirstStepInputLabel }>
                                <Typography component="span" sx={ StyledFirstStepTypographyPlaceholder }>code</Typography>
                                <Typography component="span" sx={ StyledFirstStepTypographyCounter }>{codeCounter}/50</Typography>
                            </InputLabel>
                            <OutlinedInput
                                id="code"
                                type="text"
                                inputProps={{ maxLength: 50 }}
                                onChange={(e) => {
                                    formikProps.handleChange(e);
                                    setCodeCounter(e.target.value.length);
                                    handleSetCode(e.target.value);
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
                                <Button variant="contained" sx={ StyledFirstStepButton } type="submit" fullWidth={true}
                                onClick={() => {
                                    dispatch({ type: SET_STEP_MODAL, step: 4 });
                                }}>Next</Button>
                        </Form>
                    )}
                </Formik>
        </>
    );
}