import React from 'react';
import * as Yup from "yup";
import {apiUrl} from "../../../../apiConfig";
import {GetUsersSuccess} from "../../../../store/actions";
import {Field, Form, Formik} from "formik";
import {InputSearch} from "./InputSearch";
import {useDispatch, useSelector} from "react-redux";

export function Search () {

    const userId = useSelector(state => state.userData.userData.userId);
    const dispatch = useDispatch();

    return (
        <Formik initialValues={{
            userName: "",
        }} validationSchema={
            Yup.object(
                {
                    userName: Yup.string().required("Username is required")
                }
            )} validate={async (values) => {
            const response = await fetch(`${apiUrl}/api/search`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    search: values.userName
                }),
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
    )
}