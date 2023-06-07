import React from "react";

import { AppBar, Avatar, Paper , Typography, Button} from "@mui/material";

import { UserSearchAppBar, UserSearchContentWrapper, UserSearchWrapper } from "../NavigationStyles";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

import { InputSearch } from "./InputSearch";
import { GetUsersSuccess } from "../../../store/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { StyledBlackButton } from "../../LoginModal/loginModalStyles";
import { PopularPeopleSidebar } from "./PopularPeopleSidebar";
import {apiUrl} from "../../../apiConfig";

export function UsersSearch() {

    const dispatch = useDispatch();

    return (
        <div style={UserSearchWrapper}>
            <AppBar position="sticky" style={UserSearchAppBar}>
                <Formik initialValues={{
                    userName: "",
                }} validationSchema={
                    Yup.object(
                        {
                            userName: Yup.string().required("Username is required")
                        }
                    )} validate={async (values) => {
                    const response = await fetch(`${apiUrl}/search`, {
                        method: "POST",
                        body: JSON.stringify({ userSearch: values.userName }),
                        headers: { "Content-Type": "application/json" }
                    });
                    const userSearch = await response.json();
                    if (response.status === 302) {
                        dispatch(GetUsersSuccess(userSearch));
                    }
                }}>
                    <Form>

                        <Field as={InputSearch} sx={{ width: "400px" }}
                               name={"userName"} id="userName"
                               label="Username" type="text"/>

                    </Form>
                </Formik>
                <PopularPeopleSidebar/>
            </AppBar>
            <div style={UserSearchContentWrapper}></div>
        </div>
    );
}
