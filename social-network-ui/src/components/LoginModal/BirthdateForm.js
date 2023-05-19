import React from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, Modal, SvgIcon } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { closeLoginModal } from "../../store/actions";
import { StyledBlackButton, StyledBox, StyledCloseSvgIcon, StyledModal } from "./loginModalStyles";

export function BirthdateForm() {
    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    return (
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={StyledModal}>
            <Box sx={StyledBox}>
                <SvgIcon sx={StyledCloseSvgIcon} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                          fill="#000000"/>
                </SvgIcon>
                <Formik
                    initialValues={{
                        day: "",
                        month: "",
                        year: ""
                    }}
                    onSubmit={async (values) => {
                        // Здесь вы можете обрабатывать значения формы
                        console.log(values);
                    }}
                >
                    {(formikProps) => (
                        <Form onSubmit={formikProps.handleSubmit} style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Typography component="span" sx={{
                                fontFamily: "'Lato', sans-serif",
                                fontSize: "25px",
                                textAlign: "center",
                                margin: "0 auto"
                            }}>Please, enter your birthdate.</Typography>
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
