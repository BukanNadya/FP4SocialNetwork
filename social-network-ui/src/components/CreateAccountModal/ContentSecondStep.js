import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Typography, Box, FormControl, InputLabel, Button,
    OutlinedInput, MenuItem, Select
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import { SET_STEP_MODAL } from "../../store/types";
import {
    StyledFirstStepFormControl, StyledFirstStepInputLabel,
    StyledFirstStepTypographyPlaceholder, StyledFirstStepTypographyCounter,
    StyledFirstStepDateofBirthBox, StyledFirstStepButton, StyledFirstStepTypography,
    StyledFirstStepTypographyDateofBirth, StyledFirstStepTypographyDateofBirthInfo
} from "./CreateAccountModalStyles";
import { apiUrl } from "../../apiConfig";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function ContentSecondStep() {
    const dispatch = useDispatch();
    const valuesState = useSelector((state) => state.stepModal.stepModal.valuesState);

    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    const xxsStyles = {

        FirstFormStyle: { ...StyledFirstStepFormControl, width: "100%" },
        Form: { width: "100%" },
        TypographyDateofBirth: { ...StyledFirstStepTypographyDateofBirth, width: "100%" },
        TypographyDateofBirthInfo: { ...StyledFirstStepTypographyDateofBirthInfo, width: "100%" },
        BoxFirstStepDateofBirth: { ...StyledFirstStepDateofBirthBox, width: "100%" },
        StyledFirstStepButton: { ...StyledFirstStepButton, width: "100%" },
        StyledFirstStepTypography: { ...StyledFirstStepTypography, width: "100%" },

    };

    const xsStyles = {

        FirstFormStyle: { ...StyledFirstStepFormControl, width: "100%" },
        Form: { width: "100%" },
        TypographyDateofBirth: { ...StyledFirstStepTypographyDateofBirth, width: "100%" },
        TypographyDateofBirthInfo: { ...StyledFirstStepTypographyDateofBirthInfo, width: "100%" },
        BoxFirstStepDateofBirth: { ...StyledFirstStepDateofBirthBox, width: "100%" },
        StyledFirstStepButton: { ...StyledFirstStepButton, width: "100%" },
        StyledFirstStepTypography: { ...StyledFirstStepTypography, width: "100%" },

    };

    const smStyles = {

        FirstFormStyle: { ...StyledFirstStepFormControl, width: "100%" },
        Form: { width: "100%" },
        TypographyDateofBirth: { ...StyledFirstStepTypographyDateofBirth, width: "100%" },
        TypographyDateofBirthInfo: { ...StyledFirstStepTypographyDateofBirthInfo, width: "100%" },
        BoxFirstStepDateofBirth: { ...StyledFirstStepDateofBirthBox, width: "100%" },
        StyledFirstStepButton: { ...StyledFirstStepButton, width: "100%" },
        StyledFirstStepTypography: { ...StyledFirstStepTypography, width: "100%" },

    };

    const mdStyles = {

        FirstFormStyle: { ...StyledFirstStepFormControl },
        Form: { width: "100%" },
        TypographyDateofBirth: { ...StyledFirstStepTypographyDateofBirth },
        TypographyDateofBirthInfo: { ...StyledFirstStepTypographyDateofBirthInfo },
        BoxFirstStepDateofBirth: { ...StyledFirstStepDateofBirthBox },
        StyledFirstStepButton: { ...StyledFirstStepButton },
        StyledFirstStepTypography: { ...StyledFirstStepTypography },

    };

    const lgStyles = {

        FirstFormStyle: { ...StyledFirstStepFormControl },
        Form: { width: "100%" },
        TypographyDateofBirth: { ...StyledFirstStepTypographyDateofBirth },
        TypographyDateofBirthInfo: { ...StyledFirstStepTypographyDateofBirthInfo },
        BoxFirstStepDateofBirth: { ...StyledFirstStepDateofBirthBox },
        StyledFirstStepButton: { ...StyledFirstStepButton },
        StyledFirstStepTypography: { ...StyledFirstStepTypography },

    };

    const xlStyles = {

        FirstFormStyle: { ...StyledFirstStepFormControl },
        Form: { width: "100%" },
        TypographyDateofBirth: { ...StyledFirstStepTypographyDateofBirth },
        TypographyDateofBirthInfo: { ...StyledFirstStepTypographyDateofBirthInfo },
        BoxFirstStepDateofBirth: { ...StyledFirstStepDateofBirthBox },
        StyledFirstStepButton: { ...StyledFirstStepButton },
        StyledFirstStepTypography: { ...StyledFirstStepTypography },

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
                    const url = `${apiUrl}/api/sendLetter`;
                    const requestBody = {
                        name: valuesState.name,
                        email: valuesState.email,
                    };

                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
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
                        console.error("Error:", error);
                        // Handle the error appropriately
                    }
                }}
            >
                {(formikProps) => (
                    <Form onSubmit={formikProps.handleSubmit} style={styles.Form}>
                        <Typography component="span" sx={styles.StyledFirstStepTypography}>Please, check your
                            information.</Typography>
                        <FormControl sx={styles.FirstFormStyle}>
                            <InputLabel htmlFor="name" sx={StyledFirstStepInputLabel}>
                                <Typography component="span" sx={StyledFirstStepTypographyPlaceholder}>name</Typography>
                                <Typography component="span"
                                            sx={StyledFirstStepTypographyCounter}>{valuesState.name.length}/50</Typography>
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
                        <FormControl sx={styles.FirstFormStyle}>
                            <InputLabel htmlFor="email" sx={StyledFirstStepInputLabel}>
                                <Typography component="span"
                                            sx={StyledFirstStepTypographyPlaceholder}>email</Typography>
                                <Typography component="span"
                                            sx={StyledFirstStepTypographyCounter}>{valuesState.email.length}/50</Typography>
                            </InputLabel>
                            <OutlinedInput
                                id="email"
                                type="text"
                                inputProps={{ maxLength: 50 }}
                                value={valuesState.email}
                                disabled/>
                            <Typography component="span" sx={styles.TypographyDateofBirth}>Date of birth</Typography>
                            <Typography component="span" sx={styles.TypographyDateofBirthInfo}>This will not be shown
                                publicly. Confirm your own age, even if this account is for a
                                business, a pet or something else.</Typography>
                            <Box sx={styles.BoxFirstStepDateofBirth}>
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
                            <Button variant="contained" sx={styles.StyledFirstStepButton} type="submit"
                                    fullWidth={true}>Send letter</Button>
                        </FormControl>
                    </Form>
                )}
            </Formik>
        </>
    );
}