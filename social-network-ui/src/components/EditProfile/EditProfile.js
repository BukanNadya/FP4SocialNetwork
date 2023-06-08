import React, {useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SvgIcon, Typography} from "@mui/material";

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
import {ErrorMessage, Field, Form, Formik} from "formik";
import {InputName} from "./Input/InputName";
import {InputPhoto} from "./Input/InputPhoto";
import {InputProfilePhoto} from "./Input/InputProfilePhoto";

import PropTypes from "prop-types";
import * as yup from "yup";
import {apiUrl} from "../../apiConfig";

export function EditProfile (props) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch()
    const userId = useSelector(state => state.userData.userData.userId);
    const [photo, setPhoto] = useState(null);
    const [bgPhoto, setBgPhoto] = useState(null);

    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }


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
                    day: props.birthday.slice(8,10),
                    month: props.birthday.slice(5,7),
                    year: props.birthday.slice(0,4),
                    // himself: "",
                    // bgPhoto: props.image || "",
                    // photo: props.background || "",
                }} validationSchema={
                    Yup.object(
                        {
                            name: Yup.string()
                                .required("name is required"),
                            day: yup.number().required("Required").min(1, "Invalid day").max(31, "Invalid day"),
                            month: yup.number().required("Required").min(1, "Invalid month").max(12, "Invalid month"),
                            year: yup.number().required("Required")
                                .min(1900, "Invalid year")
                                .max(new Date().getFullYear() - 7, "You must be at least 7 years old")
                                .test("age", "You must be at least 7 years old", function (value) {
                                    const { day, month } = this.parent;
                                    const userDate = new Date(value, month - 1, day);
                                    const currentDate = new Date();
                                    let age = currentDate.getFullYear() - userDate.getFullYear();
                                    const m = currentDate.getMonth() - userDate.getMonth();
                                    if (m < 0 || (m === 0 && currentDate.getDate() < userDate.getDate())) {
                                        age--;
                                    }
                                    return age >= 7;
                                })
                        }
                    )} onSubmit={async (values, { setErrors, setSubmitting }) => {
                    setIsSubmitting(true)
                    try {
                        const response = await fetch(`${apiUrl}/api/edition`, {
                            method: "PUT",
                            body: JSON.stringify({
                                userId: props.userId,
                                name: values.name,
                                day: values.day,
                                month: values.month,
                                year: values.year,
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

                            const response = await fetch(`${apiUrl}/api/profile/${userId}`);
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
                    {(formikProps) => (
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
                            <Box sx={{
                                width: "400px",
                                display: "flex",
                                justifyContent: "space-around",
                                marginTop: "40px",

                            }}>
                                <FormControl sx={{ width: "300px" }}>
                                    <InputLabel id="month-label">Month</InputLabel>
                                    <Field
                                        as={Select}
                                        id="month"
                                        name="month"
                                        labelId="month-label"
                                        label={"month"}
                                    >
                                        <MenuItem value="12">December</MenuItem>
                                        <MenuItem value="01">January</MenuItem>
                                        <MenuItem value="02">February</MenuItem>
                                        <MenuItem value="03">March</MenuItem>
                                        <MenuItem value="04">April</MenuItem>
                                        <MenuItem value="05">May</MenuItem>
                                        <MenuItem value="06">June</MenuItem>
                                        <MenuItem value="07">July</MenuItem>
                                        <MenuItem value="08">August</MenuItem>
                                        <MenuItem value="09">September</MenuItem>
                                        <MenuItem value="10">October</MenuItem>
                                        <MenuItem value="11">November</MenuItem>
                                    </Field>
                                    <ErrorMessage name="month" component="div" style={{
                                        color: "red", fontFamily: "'Lato', sans-serif",
                                        fontSize: "13px",
                                        lineHeight: "15px",
                                    }}/>
                                </FormControl>

                                <FormControl sx={{ width: "300px" }}>
                                    <InputLabel id="day-label">Day</InputLabel>
                                    <Field
                                        as={Select}
                                        id="day"
                                        name="day"
                                        labelId="day-label"
                                        label={"day"}
                                    >
                                        {Array.from({ length: getDaysInMonth(formikProps.values.month, formikProps.values.year, ) }, (_, i) => (
                                            <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="day" component="div" style={{
                                        color: "red", fontFamily: "'Lato', sans-serif",
                                        fontSize: "13px",
                                        lineHeight: "15px",
                                    }}/>
                                </FormControl>


                                <FormControl sx={{ width: "300px" }}>
                                    <InputLabel id="year-label">Year</InputLabel>
                                    <Field
                                        as={Select}
                                        id="year"
                                        name="year"
                                        labelId="year-label"
                                        label={"year"}
                                    >
                                        {Array.from({ length: 124 }, (_, i) => (
                                            <MenuItem key={i + 1900} value={i + 1900}>{i + 1900}</MenuItem>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="year" component="div" style={{
                                        color: "red", fontFamily: "'Lato', sans-serif",
                                        fontSize: "13px",
                                        lineHeight: "15px",
                                    }}/>
                                </FormControl>
                            </Box>
                        </FormControl>
                    </Form>
                    )}
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
    isSubmitting: PropTypes.bool,
    birthday: PropTypes.string.isRequired,
}