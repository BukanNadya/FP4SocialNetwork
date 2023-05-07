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

export function EnterPasswordModal() {
    const dispatch = useDispatch();
    const userDataState = useSelector(state => state.loginUserData.userData);

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
                onSubmit={async (values, { setErrors }) => {
                    dispatch(setUserPassword(values));
                    const url = new URL("http://localhost:8080/login");
                    url.searchParams.append("username", values.userName);
                    url.searchParams.append("password", values.password);
                    url.searchParams.append("rememberMe", userDataState.rememberMe);
                    const userPassword = await fetch(url.toString());
                    const userToken = await userPassword.json();

                    if (!userToken) {
                        setErrors({ password: "wrong password" });
                    } else {
                        if (userDataState.rememberMe) {
                            localStorage.setItem("userToken", JSON.stringify(userToken));
                        } else {
                            sessionStorage.setItem("userToken", JSON.stringify(userToken));
                        }
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