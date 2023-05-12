import React from "react";
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

import { setRememberMeAction, setUserPassword } from "../../store/actions";
import { InputFieldWithError } from "./InputFieldWithError";
import {
    StyledHeaderModalText,
    StyledFormControl,
    StyledBlackButton,
    StyledWhiteButton,
    StyledCheckbox
} from "./loginModalStyles";
import { setUserToken } from "../../store/actions";

export function EnterPasswordModal() {
    const dispatch = useDispatch();
    const userDataState = useSelector(state => state.loginUserData.userData);
    const userToken = useSelector(state => state.saveUserToken);
    const navigate = useNavigate();

    console.log(userToken);

    return (
        <>
            <Typography sx={StyledHeaderModalText}>Enter your password</Typography>
            <Formik
                initialValues={{
                    userName: userDataState.userName || "",
                    password: "",
                }} validationSchema={
                Yup.object(
                    {
                        password: Yup.string().required("Password is required")
                    }
                )}
                onSubmit={async (values, { setErrors, setSubmitting }) => {
                    try {
                        dispatch(setUserPassword(values));
                        const userPassword = await fetch("http://localhost:8080/login", {
                            method: "POST",
                            body: JSON.stringify({
                                username: values.userName,
                                password: values.password,
                                rememberMe: userDataState.rememberMe
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });

                        if (userPassword.ok) {
                            const userToken = await userPassword.json();
                            if (userDataState.rememberMe) {
                                dispatch(setUserToken(userToken));
                                localStorage.setItem("userToken", JSON.stringify(userToken));
                                console.log(userToken);
                            } else {
                                dispatch(setUserToken(userToken));
                                sessionStorage.setItem("userToken", JSON.stringify(userToken));
                            }
                            navigate("/home");
                        } else {
                            setErrors({ password: "Wrong password" });
                        }
                    } catch (error) {
                        console.error("An error occurred:", error);
                        setErrors({ password: "An error occurred, please try again" });
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                <Form>
                    <FormControl sx={StyledFormControl}>
                        <FormControl sx={{ width: "400px" }} variant="outlined">
                            <InputLabel htmlFor="userName" sx={{
                                fontFamily: "'Lato', sans-serif",
                                fontSize: "19px",
                                lineHeight: "23px"
                            }}>Username</InputLabel>
                            <OutlinedInput sx={{
                                fontFamily: "'Lato', sans-serif",
                                fontSize: "19px",
                                lineHeight: "23px"
                            }}
                                           id="userName"
                                           name="userName"
                                           type="text"
                                           value={userDataState.userName}
                                           disabled
                                           label="Username"
                                           startAdornment={<InputAdornment position="start"/>}
                            />
                        </FormControl>
                        <FormControl sx={{
                            ...StyledFormControl,
                        }}>
                            <Field as={InputFieldWithError} sx={{ width: "400px", marginTop: "40px" }}
                                   label="Password" name={"password"} id="password"
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
                                variant="contained" sx={StyledBlackButton} fullWidth={true}>Log in</Button>
                        <Button variant="contained" sx={StyledWhiteButton} fullWidth={true}>Forgot password?</Button>
                    </FormControl>
                </Form>
            </Formik>
        </>
    );
}