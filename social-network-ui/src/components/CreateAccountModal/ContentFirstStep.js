import React, { useState } from "react";
import {
    Modal, Typography, Box, FormControl, InputLabel, Input, Button,
    SvgIcon, OutlinedInput, MenuItem, Select
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { NEW_USER_DATA_FIRST_STEP_REGISTRATION} from "../../store/types";
import { StyledContentBox, StyledFirstStepFormControl, StyledFirstStepInputLabel,
    StyledFirstStepTypographyPlaceholder, StyledFirstStepTypographyCounter,
    StyledFirstStepDateofBirthBox, StyledFirstStepButton, StyledFirstStepTypography,
    StyledFirstStepTypographyDateofBirth, StyledFirstStepTypographyDateofBirthInfo} from "./CreateAccountModalStyles";

export function ContentFirstStep() {
    const dispatch = useDispatch();
    const [nameCounter, setNameCounter] = useState(0);
    const [emailCounter, setEmailCounter] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [day, setDay] = useState(new Date().getDate());
    const [year, setYear] = useState(new Date().getFullYear());

    const CustomMonthSelect = ({ field, form, ...props }) => {
        return (
            <Field name={props.name}>
                {({ field }) => (
                    <Select {...field} {...props}>
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
                    </Select>
                )}
            </Field>
        );
    };

    const CustomDaySelect = ({ field, form, ...props }) => {
        return (
            <Field name={props.name}>
                {({ field, form }) => (
                    <Select {...field} {...props}>
                        {Array.from({ length: getDaysInMonth(month, year) }, (_, i) => (
                            <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                        ))}
                    </Select>
                )}
            </Field>
        );
    };

    const CustomYearSelect = ({ field, form, ...props }) => {
        return (
            <Field name={props.name}>
                {({ field, form }) => (
                    <Select {...field} {...props}>
                        {Array.from({ length: 124 }, (_, i) => (
                            <MenuItem key={i + 1900} value={i + 1900}>{i + 1900}</MenuItem>
                        ))}
                    </Select>
                )}
            </Field>
        );
    };

    CustomDaySelect.propTypes = {
        field: PropTypes.object,
        form: PropTypes.object,
        name: PropTypes.string,
    };

    CustomMonthSelect.propTypes = {
        field: PropTypes.object,
        form: PropTypes.object,
        name: PropTypes.string,
    };

    CustomYearSelect.propTypes = {
        field: PropTypes.object,
        form: PropTypes.object,
        name: PropTypes.string,
    };

    const handlesetName = (nameValue) => {
        setName(nameValue);
    };
    const handleSetEmail = (emailValue) => {
        setEmail(emailValue);
    };
    const handleChangeMonth = (event) => {
        setMonth(event.target.value);
    };
    const handleChangeDay = (event) => {
        setDay(event.target.value);
    };
    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    const ErrorText = ({ children }) => (
        <Typography color="error" variant="caption">
            {children}
        </Typography>
    );

    ErrorText.propTypes = {
        children: PropTypes.string.isRequired,
    };

    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    return (
        <>
                <Typography component="span" sx={StyledFirstStepTypography}>Create your account</Typography>
                <Formik
                    initialValues={{
                        name: name,
                        email: email,
                        day: day,
                        month: month,
                        year: year
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required("name is required")
                            .min(5, "Must be at least 5 digits"),
                        email: Yup.string().required("Email is required")
                            .email("Not a proper email")
                            .min(5, "Must be at least 5 digits"),
                        year: Yup.date()
                            .required("Date of birth is required")
                            .max(
                                new Date(new Date().getFullYear() - 7, new Date().getMonth(), new Date().getDate() - 1),
                                "You must be at least 7 years old to create an account."
                            ),
                    })}
                    onSubmit={async(values, { setErrors, setSubmitting }) => {
                        dispatch({ type: NEW_USER_DATA_FIRST_STEP_REGISTRATION, payload: { valuesState: values } });
                        console.log(values);
                        const response = await fetch("http://localhost:8080/checkEmail", {
                            method: "POST",
                            body: JSON.stringify({email: values.email}),
                            headers: { "Content-Type": "application/json" }
                        })
                        if (response.ok) {
                            //// НЕ РАБОТАЕТ setErrors ///////////////////////////////////////////////////////////

                            setErrors({ email: "User doesn't exist, please check your email" })
                            console.log("ERROR");
                        }
                    }}
                >
                    {(formikProps) => (
                        <Form onSubmit={formikProps.handleSubmit}>
                            <FormControl sx={StyledFirstStepFormControl}>
                            <InputLabel htmlFor="name" sx={ StyledFirstStepInputLabel }>
                                <Typography component="span" sx={ StyledFirstStepTypographyPlaceholder }>name</Typography>
                                <Typography component="span" sx={StyledFirstStepTypographyCounter}>{nameCounter}/50</Typography>
                            </InputLabel>
                            <OutlinedInput
                                id="name"
                                type="text"
                                inputProps={{ maxLength: 50 }}
                                onChange={(e) => {
                                    formikProps.handleChange(e);
                                    setNameCounter(e.target.value.length);
                                    handlesetName(e.target.value);
                                }}
                                sx={{ marginBottom: "5px" }}
                            />
                                {formikProps.touched.name && formikProps.errors.name && (
                                    <ErrorText>{formikProps.errors.name}</ErrorText>
                                )}
                            </FormControl>
                            <FormControl sx={StyledFirstStepFormControl}>
                                <InputLabel htmlFor="email" sx={StyledFirstStepInputLabel }>
                                    <Typography component="span" sx={ StyledFirstStepTypographyPlaceholder }>email</Typography>
                                    <Typography component="span" sx={ StyledFirstStepTypographyCounter }>{emailCounter}/50</Typography>
                                </InputLabel>
                                <OutlinedInput
                                    id="email"
                                    type="text"
                                    inputProps={{ maxLength: 50 }}
                                    onChange={(e) => {
                                        formikProps.handleChange(e);
                                        handleSetEmail(e.target.value);
                                        setEmailCounter(e.target.value.length);
                                    }}/>
                                {formikProps.touched.email && formikProps.errors.email && (
                                    <ErrorText>{formikProps.errors.email}</ErrorText>
                                )}
                                <Typography component="span" sx={StyledFirstStepTypographyDateofBirth}>Date of birth</Typography>
                                <Typography component="span" sx={ StyledFirstStepTypographyDateofBirthInfo }>This will not be shown publicly.
                                 Confirm your own age, even if this account is for a
                                business, a pet or something else.</Typography>
                                <Box sx={ StyledFirstStepDateofBirthBox }>
                                    <FormControl sx={{ width: "200px" }}>
                                        <InputLabel id="demo-simple-select-label">month</InputLabel>
                                        <Field
                                            as={CustomMonthSelect}
                                            id="month"
                                            name="month"
                                            value={month}
                                            label="month"
                                            onChange={(e) => {
                                                formikProps.handleChange(e);
                                                handleChangeMonth(e);
                                            }}
                                        />
                                        {formikProps.touched.month && formikProps.errors.month && (
                                            <ErrorText>{formikProps.errors.month}</ErrorText>
                                        )}
                                    </FormControl>
                                    <FormControl sx={{ width: "100px", margin: "0 10px" }}>
                                        <InputLabel id="demo-simple-select-label">day</InputLabel>
                                        <Field
                                            as={CustomDaySelect}
                                            id="day"
                                            name="day"
                                            value={day}
                                            label="day"
                                            onChange={(e) => {
                                                formikProps.handleChange(e);
                                                handleChangeDay(e);
                                            }}
                                        />
                                        {formikProps.touched.day && formikProps.errors.day && (
                                            <ErrorText
                                                sx={{ marginBottom: "10px" }}>{formikProps.errors.day}</ErrorText>
                                        )}
                                    </FormControl>
                                    <FormControl sx={{ width: "200px" }}>
                                        <InputLabel id="demo-simple-select-label">year</InputLabel>
                                        <Field
                                            as={CustomYearSelect}
                                            id="year"
                                            name="year"
                                            value={year}
                                            label="year"
                                            onChange={(e) => {
                                                formikProps.handleChange(e);
                                                handleChangeYear(e);
                                            }}
                                        />
                                        
                                    </FormControl>
    
                                </Box>
                                {formikProps.touched.year && formikProps.errors.year && (
                                            <ErrorText
                                                sx={{ marginBottom: "10px" }}>{formikProps.errors.year}</ErrorText>
                                        )}
                                <Button variant="contained" sx={ StyledFirstStepButton } type="submit" fullWidth={true}>Next</Button>
                            </FormControl>
                        </Form>
                    )}
                </Formik>
        </>
    );
}