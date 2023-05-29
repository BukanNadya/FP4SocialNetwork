import React, {useState} from 'react';
import {Box, Button, FormControl, Modal, SvgIcon, Typography} from "@mui/material";

import {
    StyledBox,
    StyledCloseSvgIcon,
    StyledModal,
    StyleHead,
    StyleTitle, StyleButton, StyledForm
} from "./EditProfileStyles";
import {useDispatch, useSelector} from "react-redux";
import {closeEditModal, setUserData} from "../../store/actions";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {InputName} from "./Input/InputName";
import {InputPhoto} from "./Input/InputPhoto";
import {InputProfilePhoto} from "./Input/InputProfilePhoto";

import PropTypes from "prop-types";

export function EditProfile (props) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch()
    const userId = useSelector(state => state.userData.userData.userId);
    const [photo, setPhoto] = useState(null);
    const [bgPhoto, setBgPhoto] = useState(null);


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
                    address: props.address || "",
                    // himself: "",
                    // bgPhoto: props.image || "",
                    // photo: props.background || "",
                }} validationSchema={
                    Yup.object(
                        {
                            name: Yup.string()
                                .required("name is required")
                                .min(5, "Must be at least 5 digits"),
                            // address: Yup.string().required("Address is required"),
                            // himself: Yup.string().required("Himself is required"),
                            // bgPhoto: Yup.string().required("Himself is required"),
                            // photo: Yup.string().required("Himself is required"),
                        }
                    )} onSubmit={async (values, { setErrors, setSubmitting }) => {
                    setIsSubmitting(true)
                    try {
                        const response = await fetch("http://localhost:8080/edition", {
                            method: "PUT",
                            body: JSON.stringify({
                                userId: props.userId,
                                name: values.name,
                                day: "27",
                                month: "01",
                                year: "1990",
                                address: values.address,
                                profileImageUrl: photo || props.image,
                                profileBackgroundImageUrl: bgPhoto || props.background
                            }),
                            headers: { "Content-Type": "application/json" }
                        });

                        if (response.status !== 200) {
                            setErrors({ name: "Enter your name" });
                        } else {
                            // const userExistData = await response.json();

                            const response = await fetch(`http://localhost:8080/profile/${userId}`);
                            const userData = await response.json();
                            dispatch(setUserData(userData));

                            {dispatch(closeEditModal())}
                        }
                    } catch (error) {
                        console.error("An error occurred:", error);
                        setErrors({ name: "An error occurred, please try again" });
                    } finally {
                        setIsSubmitting(false)
                    }
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
                                        variant="contained" sx={StyleButton} fullWidth={true} disabled={isSubmitting}>Saved</Button>
                            </div>
                            <Field as={InputPhoto} name={"bgPhoto"} id="bgPhoto" label="bgPhoto" onImageUpload={setBgPhoto} background={props.background}/>
                            <Field as={InputProfilePhoto} name={"photo"} id="photo" label="photo" onImageUpload={setPhoto} image={props.image}/>
                            <Field as={InputName} sx={{ width: "550px", margin: "20px 0" }} name={"name"} id="name" label="Name" type="text" />
                            <Field as={InputName} sx={{ width: "550px", margin: "20px 0" }} name={"address"} id="address" label="Location" type="text" />
                            {/*<Field as={InputName} sx={{ width: "550px", margin: "20px 0" }} name={"himself"} id="himself" label="himself" type="text" />*/}
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
    userId: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
}