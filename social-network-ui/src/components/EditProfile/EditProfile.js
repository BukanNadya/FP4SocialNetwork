import React from 'react';
import {AppBar, Avatar, Box, Button, FormControl, Modal, SvgIcon, Toolbar, Typography} from "@mui/material";

import {
    imgStyle,
    StyledBox,
    StyledCloseSvgIcon,
    StyledModal,
    StyleHead,
    StyleTitle,
    BgImgStyle,
    svgStyle,
    svgAvatarStyle, StyleButton, StyledForm
} from "./EditProfileStyles";
import {useDispatch} from "react-redux";
import {closeEditModal, setUserEmail} from "../../store/actions";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {InputSearch} from "../NavigationComponents/UsersSearch/InputSearch";
import {InputName} from "./Input/InputName";
import PropTypes from "prop-types";

export function EditProfile (props) {

    const dispatch = useDispatch()

    return (
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={() => {dispatch(closeEditModal())}}
            sx={StyledModal}>
            <Box sx={StyledBox}>
                <Formik initialValues={{
                    name: props.name,
                    address: "",
                    himself: "",
                }} validationSchema={
                    Yup.object(
                        {
                            name: Yup.string().required("Username is required"),
                            address: Yup.string().required("Address is required"),
                            himself: Yup.string().required("Himself is required")
                        }
                    )} onSubmit={async (values, { setErrors, setSubmitting }) => {

                         console.log(values)

                    // try {
                    //     const response = await fetch("http://localhost:8080/edition", {
                    //         method: "PUT",
                    //         body: JSON.stringify(values),
                    //         headers: { "Content-Type": "application/json" }
                    //     });
                    //
                    //     if (response.status !== 302) {
                    //         setErrors({ email: "User doesn't exist, please check your email" });
                    //     } else {
                    //         const userExistData = await response.json();
                    //         console.log("resp from server", userExistData);
                    //         // dispatch(setUserEmail(values));
                    //     }
                    // } catch (error) {
                    //     console.error("An error occurred:", error);
                    //     setErrors({ email: "An error occurred, please try again" });
                    // } finally {
                    //
                    //     setSubmitting(false);
                    // }
                }}>

                    <Form>
                        <FormControl sx={StyledForm} >
                            <div style={StyleHead}>
                                <div style={{ display: "flex", gap: "50px",}}>
                                    <SvgIcon sx={StyledCloseSvgIcon} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                             onClick={() => {dispatch(closeEditModal())}}>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                                              fill="#000000"/>
                                    </SvgIcon>
                                    <Typography sx={StyleTitle}>Edit profile</Typography>
                                </div>
                                <Button type="submit"
                                        variant="contained" sx={StyleButton} fullWidth={true} onClick={() => console.log("gogi")}>Saved</Button>
                            </div>
                            <div style={BgImgStyle}>
                                <div style={svgStyle} onClick={() => console.log("svg")}>
                                    <SvgIcon sx={{margin: "11px"}} width="30px" height="30px" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
                                            fill="#ffffff"/>
                                    </SvgIcon>
                                </div>
                                <div style={svgStyle} onClick={() => console.log("svg")}>
                                    <SvgIcon sx={{margin: "11px"}} width="30px" height="30px" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                                              fill="#ffffff"/>
                                    </SvgIcon>
                                </div>
                            </div>
                            <div style={imgStyle}>
                                <Avatar alt="" src="" sx={{ bgcolor: "rgb(29, 155, 240)", width: "120px", height: "120px", marginTop: "-10%" }}/>
                                <div style={svgAvatarStyle} onClick={() => console.log("svg")}>
                                    <SvgIcon sx={{margin: "11px"}} width="30px" height="30px" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
                                            fill="#ffffff"/>
                                    </SvgIcon>
                                </div>
                            </div>
                            <Field as={InputName} sx={{ width: "550px", margin: "20px 0" }} name={"name"} id="name" label="Name" type="text" />
                            <Field as={InputName} sx={{ width: "550px", margin: "20px 0" }} name={"address"} id="address" label="Location" type="text" />
                            <Field as={InputName} sx={{ width: "550px", margin: "20px 0" }} name={"himself"} id="himself" label="himself" type="text" />
                        </FormControl>
                    </Form>
                </Formik>

                <Typography sx={{ marginTop: "30px" }}>Edit profile</Typography>
            </Box>
        </Modal>
    )
}

EditProfile.propTypes = {
    name: PropTypes.string.isRequired,
}