import React, { useState } from "react";

import { Button, FormControl, Typography, SvgIcon } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { setUserEmail } from "../../store/actions";
import { InputFieldWithError } from "./InputFieldWithError";
import {
    StyledBlackButton,
    StyledFormControl,
    StyledHeaderModalText,
    StyledSpanElement,
    StyledWhiteButton
} from "./loginModalStyles";
import PropTypes from "prop-types";

export function EnterEmailModal() {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

   async function signWidthGoogle (){
       let dataAboutRegistration = await fetch("http://localhost:8080/oauth2/authorization/google");
       let informAboutRegistration = await dataAboutRegistration.json()
       console.log(informAboutRegistration)
    }

    return (
        <>
            <Typography sx={StyledHeaderModalText}>Sign in to Capitweet</Typography>
            <Button onClick={signWidthGoogle} variant="contained" sx={{ ...StyledBlackButton, marginTop: "0px" }} fullWidth={true}>
                <SvgIcon sx={{ marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                         width="48px" height="48px">
                    <path fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                    <path fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                    <path fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                    <path fill="#1976D2"
                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </SvgIcon>
                Sign in width Google</Button>
            <Typography component="span" sx={StyledSpanElement}
            >or</Typography>
            <Formik initialValues={{
                email: "",
            }} validationSchema={
                Yup.object(
                    {
                        email: Yup.string().email("Please enter a correct email").required("email is required")
                    }
                )} onSubmit={async (values, { setErrors, setSubmitting }) => {
                setIsSubmitting(true);
                try {
                    const response = await fetch("http://localhost:8080/checkEmail", {
                        method: "POST",
                        body: JSON.stringify(values),
                        headers: { "Content-Type": "application/json" }
                    });
                    console.log(response)
                    if (!response.ok) {
                        setErrors({ email: "User doesn't exist, please check your email" });
                    } else {
                        const userExistData = await response.json();
                        console.log("resp from server", userExistData);
                        dispatch(setUserEmail(values));
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                    setErrors({ email: "An error occurred, please try again" });
                } finally {
                    setIsSubmitting(false);
                    setSubmitting(false);
                }
            }}>
                <Form>
                    <FormControl sx={StyledFormControl}>
                        <Field as={InputFieldWithError} sx={{ width: "400px" }} name={"email"}
                               id="email"
                               label="Email" disabled={isSubmitting} type="text"/>
                        <Button type="submit"
                                variant="contained" sx={StyledBlackButton} disabled={isSubmitting}
                                fullWidth={true}>Next</Button>
                        <Button variant="contained" sx={StyledWhiteButton} fullWidth={true}>Forgot password?</Button>
                    </FormControl>
                </Form>
            </Formik>
        </>
    );
}

EnterEmailModal.propTypes = {
    userData: PropTypes.object,
};