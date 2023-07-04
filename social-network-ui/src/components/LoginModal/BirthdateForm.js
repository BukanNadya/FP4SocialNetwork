import React from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, Modal } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { changeDob, setUserBirthday } from "../../store/actions";
import {
    StyledBlackButton,
    StyledBox,
    StyledModal,
    BirthDateForm,
    BirthDateParagraph, BirthDateBox, BirthDateErrorMessage, DarkStyledBox, DarkBirthDateParagraph
} from "./loginModalStyles";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { SvgIconCapybara } from "./SvgIconCapybara";
import { CloseSvgIcon } from "./CloseSvgIcon";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function BirthdateForm() {
    const userId = useSelector(state => state.userData.userData.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const darkMode = useSelector(state => state.userData.userMode.darkMode);

    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function closeBirthdateForm() {
        dispatch(setUserBirthday(true));
    }
    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px",  width: "70%"  },
        AdaptiveStyledBox: darkMode ? {...DarkStyledBox, width:"100%",  borderRadius: "0"} : {...StyledBox, width:"100%",  borderRadius: "0"},
        AdaptiveBirthDateForm:{
            ...BirthDateForm, width:"300px"
        }
    };

    const xsStyles = {
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px",  width: "70%"  },
        AdaptiveStyledBox: darkMode ? {...DarkStyledBox, width:"100%",  borderRadius: "0"} : {...StyledBox, width:"100%",  borderRadius: "0"},
        AdaptiveBirthDateForm:{
            ...BirthDateForm, width:"400px"
        }
    };

    const smStyles = {
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px",  width: "70%"  },
        AdaptiveStyledBox: darkMode ? {...DarkStyledBox} : {...StyledBox},
        AdaptiveBirthDateForm:{
            ...BirthDateForm, width:"500px"
        }

    };

    const mdStyles = {
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px" },
        AdaptiveStyledBox: darkMode ? {...DarkStyledBox} : {...StyledBox},
        AdaptiveBirthDateForm:{
            ...BirthDateForm, width:"500px"
        }
    };

    const lgStyles = {
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px"  },
        AdaptiveStyledBox: darkMode ? {...DarkStyledBox} : {...StyledBox},
        AdaptiveBirthDateForm:{
            ...BirthDateForm
        }
    };

    const xlStyles = {
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px" },
        AdaptiveStyledBox: darkMode ? {...DarkStyledBox} : {...StyledBox},
        AdaptiveBirthDateForm:{
            ...BirthDateForm
        }
    };

    let styles;
    if (isXl) {
        styles = xlStyles;
    } else if (isLg) {
        styles = lgStyles;
    } else if (isMd) {
        styles = mdStyles;
    } else if (isSm) {
        styles = smStyles;
    } else if (isXs) {
        styles = xsStyles;
    } else {
        styles = xxsStyles;
    }

    return (
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={StyledModal}>
            <Box sx={styles.AdaptiveStyledBox}>
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
                        <Form onSubmit={formikProps.handleSubmit} style={styles.AdaptiveBirthDateForm}>
                            <Typography component="span" sx={darkMode ? DarkBirthDateParagraph : BirthDateParagraph}>Please, enter your
                                birthdate.</Typography>
                            <Box sx={BirthDateBox}>
                                <FormControl sx={
                                    darkMode ? {width: "300px", "& .MuiOutlinedInput-root": {
                                                background: darkMode ? "rgb(39, 51, 64)" : "#ffffff",
                                                color: darkMode ? "rgb(247, 249, 249)" : "#000000",
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: darkMode ? "rgb(247, 249, 249)" : "#000000",
                                            }, "& .MuiSelect-icon": {
                                                color: darkMode ? "rgb(247, 249, 249)" : "#000000",
                                            },
                                        }
                                        :
                                        {width: "300px" }
                                }>
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

                                <FormControl sx={
                                    darkMode ? {width: "300px", "& .MuiOutlinedInput-root": {
                                                background: darkMode ? "rgb(39, 51, 64)" : "#ffffff",
                                                color: darkMode ? "rgb(247, 249, 249)" : "#000000",
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: darkMode ? "rgb(247, 249, 249)" : "#000000",
                                            }, "& .MuiSelect-icon": {
                                                color: darkMode ? "rgb(247, 249, 249)" : "#000000",
                                            },
                                        }
                                        :
                                        {width: "300px" }
                                }>
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

                                <FormControl sx={
                                    darkMode ? {width: "300px", "& .MuiOutlinedInput-root": {
                                                background: darkMode ? "rgb(39, 51, 64)" : "#ffffff",
                                                color: darkMode ? "rgb(247, 249, 249)" : "#000000",
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: darkMode ? "rgb(247, 249, 249)" : "#000000",
                                            }, "& .MuiSelect-icon": {
                                                color: darkMode ? "rgb(247, 249, 249)" : "#000000",
                                            },
                                        }
                                        :
                                        {width: "300px" }
                                }>
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
                                    variant="contained" sx={styles.AdaptiveStyledBlackButton} fullWidth={true}>Submit</Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
}

