import React from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, Modal } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { changeDob, setUserBirthday } from "../../store/actions";
import {
    StyledBlackButton,
    StyledBox,
    StyledModal,
    BirthDateForm,
    BirthDateParagraph, BirthDateBox, BirthDateErrorMessage
} from "./loginModalStyles";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { SvgIconCapybara } from "./SvgIconCapybara";
import { CloseSvgIcon } from "./CloseSvgIcon";

export function BirthdateForm() {
    const userId = useSelector(state => state.userData.userData.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function closeBirthdateForm() {
        dispatch(setUserBirthday(true));
    }

    return (
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={StyledModal}>
            <Box sx={StyledBox}>
                <CloseSvgIcon closeFunction={closeBirthdateForm}/>
                <SvgIconCapybara/>
                <Formik
                    initialValues={{
                        day: "",
                        month: "",
                        year: ""
                    }}
                    validationSchema={
                        Yup.object(
                            {
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
                        )}
                    onSubmit={async (values) => {
                        changeDob(userId, values);
                        navigate("/home");
                    }}
                >
                    {(formikProps) => (
                        <Form onSubmit={formikProps.handleSubmit} style={BirthDateForm}>
                            <Typography component="span" sx={BirthDateParagraph}>Please, enter your
                                birthdate.</Typography>
                            <Box sx={BirthDateBox}>
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
                                        <MenuItem value="1">January</MenuItem>
                                        <MenuItem value="2">February</MenuItem>
                                        <MenuItem value="3">March</MenuItem>
                                        <MenuItem value="4">April</MenuItem>
                                        <MenuItem value="5">May</MenuItem>
                                        <MenuItem value="6">June</MenuItem>
                                        <MenuItem value="7">July</MenuItem>
                                        <MenuItem value="8">August</MenuItem>
                                        <MenuItem value="9">September</MenuItem>
                                        <MenuItem value="10">October</MenuItem>
                                        <MenuItem value="11">November</MenuItem>
                                    </Field>
                                    <ErrorMessage name="month" component="div" style={BirthDateErrorMessage}/>
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
                                        {Array.from({ length: getDaysInMonth(formikProps.values.month, formikProps.values.year) }, (_, i) => (
                                            <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="day" component="div" style={BirthDateErrorMessage}/>
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
                                    <ErrorMessage name="year" component="div" style={BirthDateErrorMessage}/>
                                </FormControl>
                            </Box>
                            <Button type="submit"
                                    variant="contained" sx={StyledBlackButton} fullWidth={true}>Submit</Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
}

