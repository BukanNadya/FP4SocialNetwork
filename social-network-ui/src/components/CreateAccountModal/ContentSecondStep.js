import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    Modal, Typography, Box, FormControl, InputLabel, Input, Button,
    SvgIcon, OutlinedInput, MenuItem, Select
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { SET_STEP_MODAL } from "../../store/types";
import { StyledContentBox, StyledFirstStepFormControl, StyledFirstStepInputLabel,
    StyledFirstStepTypographyPlaceholder, StyledFirstStepTypographyCounter,
    StyledFirstStepDateofBirthBox, StyledFirstStepButton, StyledFirstStepTypography,
    StyledFirstStepTypographyDateofBirth, StyledFirstStepTypographyDateofBirthInfo } from "./CreateAccountModalStyles";
import {apiUrl} from "../../apiConfig";

export function ContentSecondStep() {
    const dispatch = useDispatch();
    const valuesState = useSelector((state) => state.stepModal.stepModal.valuesState);
    console.log(valuesState.name);
    const CustomMonthSelect = ({ field, form, ...props }) => {
        return (
            <Field name={props.name}>
                {({ field, form }) => (
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
                        {Array.from({ length: getDaysInMonth(valuesState.month, valuesState.year) }, (_, i) => (
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

    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
    
    return (
        <>
            <Formik
                    initialValues={{
                        name: valuesState.name,
                        email: valuesState.email,
                        day: valuesState.day,
                        month: valuesState.month,
                        year: valuesState.year
                    }}
                    onSubmit={async (values, { setErrors }) => {
                        const url = `${apiUrl}/sendLetter`;
                        const requestBody = {
                            name: valuesState.name,
                            email: valuesState.email,
                        };

                        try {
                            const response = await fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(requestBody),
                            });

                            if (response.ok) {
                                const userToken = await response.json();
                                dispatch({ type: SET_STEP_MODAL, step: 3 });
                            } else {
                                setErrors({ password: "wrong data" });
                            }
                        } catch (error) {
                            console.error('Error:', error);
                            // Handle the error appropriately
                        }
                    }}
                >
                    {(formikProps) => (
                        <Form onSubmit={formikProps.handleSubmit}>
                            <Typography component="span" sx={ StyledFirstStepTypography }>Please, check your information.</Typography>
                            <FormControl sx={ StyledFirstStepFormControl }>
                            <InputLabel htmlFor="name" sx={ StyledFirstStepInputLabel }>
                                <Typography component="span" sx={ StyledFirstStepTypographyPlaceholder }>name</Typography>
                                <Typography component="span" sx={ StyledFirstStepTypographyCounter }>{valuesState.name.length}/50</Typography>
                            </InputLabel>
                            <OutlinedInput
                                id="name"
                                type="text"
                                inputProps={{ maxLength: 50 }}
                                value={valuesState.name}
                                disabled
                                sx={{ marginBottom: "5px" }}
                            />
                            </FormControl>
                            <FormControl sx={ StyledFirstStepFormControl }>
                                <InputLabel htmlFor="email" sx={ StyledFirstStepInputLabel }>
                                    <Typography component="span" sx={ StyledFirstStepTypographyPlaceholder }>email</Typography>
                                    <Typography component="span" sx={ StyledFirstStepTypographyCounter }>{valuesState.email.length}/50</Typography>
                                </InputLabel>
                                <OutlinedInput
                                    id="email"
                                    type="text"
                                    inputProps={{ maxLength: 50 }}
                                    value={valuesState.email}
                                    disabled/>
                                <Typography component="span" sx={ StyledFirstStepTypographyDateofBirth }>Date of birth</Typography>
                                <Typography component="span" sx={ StyledFirstStepTypographyDateofBirthInfo }>This will not be shown publicly. Confirm your own age, even if this account is for a
                                business, a pet or something else.</Typography>
                                <Box sx={ StyledFirstStepDateofBirthBox }>
                                    <FormControl sx={{ width: "200px" }}>
                                        <InputLabel id="demo-simple-select-label">month</InputLabel>
                                        <Field
                                            as={CustomMonthSelect}
                                            id="month"
                                            name="month"
                                            value={valuesState.month}
                                            label="month"
                                            disabled
                                        />
                                    </FormControl>
                                    <FormControl sx={{ width: "100px", margin: "0 10px" }}>
                                        <InputLabel id="demo-simple-select-label">day</InputLabel>
                                        <Field
                                            as={CustomDaySelect}
                                            id="day"
                                            name="day"
                                            value={valuesState.day}
                                            label="day"
                                            disabled
                                        />
                                    </FormControl>
                                    <FormControl sx={{ width: "200px" }}>
                                        <InputLabel id="demo-simple-select-label">year</InputLabel>
                                        <Field
                                            as={CustomYearSelect}
                                            id="year"
                                            name="year"
                                            value={valuesState.year}
                                            label="year"
                                            disabled
                                        />
                                        
                                    </FormControl>
    
                                </Box>
                                <Button variant="contained" sx={ StyledFirstStepButton } type="submit" fullWidth={true}>Send letter</Button>
                            </FormControl>
                        </Form>
                    )}
                </Formik>
        </>
    );
}