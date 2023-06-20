import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import { searchContainerStyle, searchInputStyle,
    searchInputContainerStyle, searchIconStyle,
} from "./SearchStyles";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {apiUrl} from "../../../apiConfig";
import {GetMessageSuccess} from "../../../store/actions";
import {InputMessageSearch} from "./InputMessageSearch";

  
export function MessageSearch() {

    const userId = useSelector(state => state.userData.userData.userId);
    const dispatch = useDispatch();

    return (
      // <div style={searchContainerStyle}>
      //   <div style={searchInputContainerStyle}>
      //     <input type="text" placeholder="Search" style={searchInputStyle} />
      //     <SearchIcon style={searchIconStyle} />
      //   </div>
      // </div>
        <div style={searchContainerStyle}>
        <Formik initialValues={{
            userName: "",
        }} validationSchema={
            Yup.object(
                {
                    userName: Yup.string().required("Username is required")
                }
            )} validate={async (values) => {
            const response = await fetch(`${apiUrl}/api/messageSearch`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    search: values.userName
                }),
                headers: { "Content-Type": "application/json" }
            });
            const userSearch = await response.json();
            if (response.status === 302) {
                dispatch(GetMessageSuccess(userSearch));
            }
        }}>
            <Form>

                <Field as={InputMessageSearch} sx={{ width: "400px" }}
                       name={"userName"} id="userName"
                       label="Username" type="search"/>

            </Form>
        </Formik>
        </div>
    );
  }