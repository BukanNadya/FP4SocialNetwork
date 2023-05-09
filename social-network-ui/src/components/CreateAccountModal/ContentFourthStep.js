import React, { useState, useEffect } from "react";
import {
    Modal, Typography, Box, FormControl, InputLabel, Input, Button,
    SvgIcon, OutlinedInput, MenuItem, Select
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Link from '@mui/material/Link';
import * as Yup from "yup";
import { step4, SET_VALUE_MODAL } from "../../store/types";
import { StyledContentBox, StyledFirstStepFormControl, StyledFirstStepInputLabel,
    StyledFirstStepTypographyPlaceholder, StyledFirstStepTypography,
    StyledFirstStepDateofBirthBox, StyledFirstStepButton } from "./CreateAccountModalStyles";

export function ContentFourthStep() {
    const dispatch = useDispatch();
    const [passwordCounter, setPasswordCounter] = useState(0);
    const [password, setPassword] = useState("");
    const valuesState = useSelector((state) => state.stepModal.stepModal.valuesState);
    
    const handleSetPassword = (passwordValue) => {
        setPassword(passwordValue);
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

                <Typography component="span" sx={ StyledFirstStepTypography }>Email validation</Typography>
                
                <Formik
                    initialValues={{
                        password: password,
                    }}
                    validationSchema={Yup.object({
                        password: Yup.string()
                            .required("Password is required")
                            .min(8, "Must be at least 8 digits")
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        valuesState.password = values.password;
                        localStorage.setItem("valuesState", JSON.stringify(valuesState));
                        dispatch({ type: step4, payload: { valuesState: valuesState } });
                    }}
                >
                    {(formikProps) => (
                        <Form onSubmit={formikProps.handleSubmit}>
                            <Box sx={ StyledFirstStepDateofBirthBox }>
                            <FormControl sx={ StyledFirstStepFormControl }>
                            <InputLabel htmlFor="password" sx={ StyledFirstStepInputLabel }>
                                <Typography component="span" sx={ StyledFirstStepTypographyPlaceholder }>password</Typography>
                            </InputLabel>
                            <OutlinedInput
                                id="password"
                                type="text"
                                inputProps={{ maxLength: 50 }}
                                onChange={(e) => {
                                    formikProps.handleChange(e);
                                    setPasswordCounter(e.target.value.length);
                                    handleSetPassword(e.target.value);
                                }}
                                sx={{ marginBottom: "5px", width: "400px", }}
                            />
                                {formikProps.touched.password && formikProps.errors.password && (
                                    <ErrorText>{formikProps.errors.password}</ErrorText>
                                )}
                            </FormControl>
                            </Box>
                                <Button variant="contained" sx={ StyledFirstStepButton } type="submit" fullWidth={true}>Register</Button>
                        </Form>
                    )}
                </Formik>
        </>
    );
}