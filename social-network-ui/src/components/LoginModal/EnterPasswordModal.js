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
    closeLoginModal,
    setRememberMeAction,
    setUserEmail,
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
import { setUserToken } from "../../store/actions";
import { apiUrl } from "../../apiConfig";

export function EnterPasswordModal() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const userDataState = useSelector(state => state.loginUserData.userLoginData);
    const navigate = useNavigate();

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
                <Form>
                    <FormControl sx={StyledFormControl}>
                        <FormControl sx={{ width: "400px" }} variant="outlined">
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
                        <FormControl sx={{
                            ...StyledFormControl,
                        }}>
                            <Field as={InputFieldWithError} sx={{ width: "400px", marginTop: "40px" }}
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
                                variant="contained" sx={StyledBlackButton} disabled={isSubmitting} fullWidth={true}>Log
                            in</Button>
                        <Button variant="contained" sx={StyledWhiteButton} fullWidth={true}>Forgot password?</Button>
                    </FormControl>
                </Form>
            </Formik>
        </>
    );
}