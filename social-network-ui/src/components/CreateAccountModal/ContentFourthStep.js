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
    StyledFirstStepDateofBirthBox, StyledFirstStepButton, StyledFirstStepTypographyCounter } from "./CreateAccountModalStyles";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function ContentFourthStep() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const valuesState = useSelector((state) => state.stepModal.stepModal.valuesState);

    const handleClickShowcode = () => setPassword((show) => !show);

    const handleMouseDowncode = (event) => {
      event.preventDefault();
    };
    
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

                <Typography component="span" sx={ StyledFirstStepTypography }>Email validation</Typography>
                
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
                        const url = "http://localhost:8080/registration";
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
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(requestBody),
                          });
                      
                          if (response.ok) {
                            const userToken = await response.json();
                            dispatch({ type: SET_STEP_MODAL, step: 3 });
                          } else {
                            setErrors({ password: "wrong data" });
                          }
                        } catch (error) {
                          console.error('Error:', error);
                        }
                      }}
                >
                    {(formikProps) => (
                        <Form onSubmit={formikProps.handleSubmit}>
                                <FormControl sx={ StyledFirstStepFormControl }>
                                <InputLabel htmlFor="username" sx={ StyledFirstStepInputLabel }>
                                    <Typography component="span" sx={ StyledFirstStepTypographyPlaceholder }>username</Typography>
                                </InputLabel>
                                <OutlinedInput
                                    id="username"
                                    type="text"
                                    inputProps={{ maxLength: 50 }}
                                    onChange={(e) => {
                                        formikProps.handleChange(e);
                                        handleSetUsername(e.target.value);
                                    }}
                                    sx={{ marginBottom: "5px", width: "400px", }}
                                />
                                    {formikProps.touched.username && formikProps.errors.username && (
                                        <ErrorText>{formikProps.errors.username}</ErrorText>
                                    )}
                                </FormControl>
                                <FormControl sx={ StyledFirstStepFormControl }>
                                <InputLabel htmlFor="password" sx={ StyledFirstStepInputLabel }>
                                    <Typography component="span" sx={ StyledFirstStepTypographyPlaceholder }>password</Typography>
                                </InputLabel>
                                <OutlinedInput
                                    id="password"
                                    inputProps={{ maxLength: 50 }}
                                    type={password ? 'text' : 'password'}
                                    onChange={(e) => {
                                            formikProps.handleChange(e);
                                            handleSetPassword(e.target.value);
                                        }}
                                    sx={{ marginBottom: "5px", width: "400px", }}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle code visibility"
                                            onClick={handleClickShowcode}
                                            onMouseDown={setPassword}
                                            edge="end"
                                            sx={{ marginRight: "2px"}}
                                        >
                                        {password ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="password"
                                />
                                {formikProps.touched.password && formikProps.errors.password && (
                                    <ErrorText>{formikProps.errors.password}</ErrorText>
                                )}
                                </FormControl>
                                <Button variant="contained" sx={ StyledFirstStepButton } type="submit" fullWidth={true}>Register</Button>
                        </Form>
                    )}
                </Formik>
        </>
    );
}