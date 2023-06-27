import React, { useState } from "react";
import {
    Box,
    Switch,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    TextField,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Snackbar,
    Alert, InputAdornment, IconButton
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { checkEmailFetch } from "../store/actions";
import { apiUrl } from "../apiConfig";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { StyledBlackButton } from "../components/LoginModal/loginModalStyles";
import { grey } from "@mui/material/colors";

export function Settings() {
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();
    const [darkMode, setDarkMode] = React.useState(false);
    const userId = useSelector(state => state.userData.userData.userId);
    const [error, setError] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleThemeChange = (event) => {
        setDarkMode(event.target.checked);
    };

    const isXxs = useMediaQuery(theme.breakpoints.down("xxs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    const xxsStyles = {
        AdaptiveListStyles: {
            width: "100vw",
        },
        AdaptiveFormStyles: {
            width: "90vw",
        },
        AdaptiveStyledBlackButton: { ...StyledBlackButton,  width: "100%" },
        DisabledButton: {
            ...StyledBlackButton,
            opacity: 0.5,
            backgroundColor:grey,
            width: "100%",
            color:"white",
        },
    };

    const xsStyles = {
        AdaptiveListStyles: {
            width: "100vw",
        },
        AdaptiveFormStyles: {
            width: "92vw",
        },
        AdaptiveStyledBlackButton: { ...StyledBlackButton,  width: "100%" },
        DisabledButton: {
            ...StyledBlackButton,
            opacity: 0.5,
            backgroundColor:grey,
            width: "100%",
            color:"white"
        },
    };

    const smStyles = {
        AdaptiveListStyles: {
            width: "470px",
        },
        AdaptiveFormStyles: {
            width: "440px",
        },
        AdaptiveStyledBlackButton: { ...StyledBlackButton,  width: "435px" },
        DisabledButton: {
            ...StyledBlackButton,
            opacity: 0.5,
            backgroundColor:grey,
            width: "435px",
            color:"white"
        },
    };

    const mdStyles = {
        AdaptiveListStyles: {
            width: "600px",
        },
        AdaptiveFormStyles: {
            width: "550px",
        },
        AdaptiveStyledBlackButton: { ...StyledBlackButton,  width: "560px" },
        DisabledButton: {
            ...StyledBlackButton,
            opacity: 0.5,
            backgroundColor:grey,
            color:"white",
            width: "560px"
        },
    };

    const lgStyles = {
        AdaptiveListStyles: {
            width: "600px",
        },
        AdaptiveFormStyles: {
            width: "550px",
        },
        AdaptiveStyledBlackButton: { ...StyledBlackButton,  width: "560px" },
        DisabledButton: {
            ...StyledBlackButton,
            opacity: 0.5,
            backgroundColor:grey,
            width: "560px",
            color:"white"
        },
    };

    const xlStyles = {
        AdaptiveListStyles: {
            width: "600px",
        },
        AdaptiveFormStyles: {
            width: "550px",
        },
        AdaptiveStyledBlackButton: { ...StyledBlackButton, width: "560px" },
        DisabledButton: {
            ...StyledBlackButton,
            opacity: 0.5,
            backgroundColor:grey,
            color:"white",
            width: "560px"
        },
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
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

    const sendData = async (currentPassword, newPassword) => {
        try {
            const response = await fetch(`${apiUrl}/api/change_password`, {
                method: "POST",
                body: JSON.stringify({
                    userId: parseInt(userId),
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                }),
                headers: { "Content-Type": "application/json" }
            });
            if (!response.ok) {
                setSnackbarMessage("Failed to change password.Current password is wrong ");
                setSnackbarSeverity("error");
            } else {
                setSnackbarMessage("Password changed successfully!");
                setSnackbarSeverity("success");
            }
            setSnackbarOpen(true);
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    };

    return (
        <Formik
            initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
            }}
            validationSchema={Yup.object({
                currentPassword: Yup.string().required("Current password is required"),
                newPassword: Yup.string().required("Enter new password is required"),
                confirmNewPassword: Yup.string()
                    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
                    .required("Confirm new password is required"),
            })}
            onSubmit={(values) => {
                sendData(values.currentPassword, values.newPassword);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Box sx={styles.AdaptiveListStyles}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                            >
                                <Typography sx={{
                                    padding: "30px 0", fontFamily: "'Lato', sans-serif",
                                    fontWeight: "400",
                                    fontSize: "22px",
                                }}>Password Settings</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend" style={{ marginBottom: "20px" }}>Change
                                        Password</FormLabel>
                                    <FormGroup sx={styles.AdaptiveFormStyles}>
                                        <Field name="currentPassword">
                                            {({ field, form }) => (
                                                <TextField
                                                    {...field}
                                                    type={showPassword ? "text" : "password"}
                                                    label="Current Password"
                                                    variant="outlined"
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    onClick={handleShowPassword}
                                                                    edge="end"
                                                                    aria-label="toggle password visibility"
                                                                >
                                                                    {showPassword ? <VisibilityOffIcon/> :
                                                                        <VisibilityIcon/>}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="currentPassword" component="div" style={{
                                            color: "red", marginLeft: "10px", fontFamily: "'Lato', sans-serif",
                                            fontSize: "12px",
                                        }}/>
                                        <Field name="newPassword">
                                            {({ field, form }) => (
                                                <TextField
                                                    {...field}
                                                    type={showPassword ? "text" : "password"}
                                                    label="New Password"
                                                    variant="outlined"
                                                    style={{ marginTop: "20px" }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    onClick={handleShowPassword}
                                                                    edge="end"
                                                                    aria-label="toggle password visibility"
                                                                >
                                                                    {showPassword ? <VisibilityOffIcon/> :
                                                                        <VisibilityIcon/>}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="newPassword" component="div" style={{
                                            color: "red", marginLeft: "10px", fontFamily: "'Lato', sans-serif",
                                            fontSize: "12px",
                                        }}/>
                                        <Field name="confirmNewPassword">
                                            {({ field, form }) => (
                                                <TextField
                                                    {...field}
                                                    type={showPassword ? "text" : "password"}
                                                    label="Confirm New Password"
                                                    variant="outlined"
                                                    style={{ marginTop: "20px" }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    onClick={handleShowPassword}
                                                                    edge="end"
                                                                    aria-label="toggle password visibility"
                                                                >
                                                                    {showPassword ? <VisibilityOffIcon/> :
                                                                        <VisibilityIcon/>}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="confirmNewPassword" component="div" style={{
                                            color: "red", marginLeft: "10px", fontFamily: "'Lato', sans-serif",
                                            fontSize: "12px",
                                        }}/>
                                        <Button type="submit" variant="contained" color="primary"
                                                style={{
                                                    ...styles.AdaptiveStyledBlackButton,
                                                    ...(isSubmitting && styles.DisabledButton),
                                                }} disabled={isSubmitting}>
                                            Change Password
                                        </Button>
                                    </FormGroup>
                                    <Snackbar
                                        open={snackbarOpen}
                                        autoHideDuration={6000}
                                        onClose={() => setSnackbarOpen(false)}
                                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                    >
                                        <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
                                            {snackbarMessage}
                                        </Alert>
                                    </Snackbar>
                                </FormControl>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel2a-content"
                            >
                                <Typography sx={{
                                    padding: "30px 0", fontFamily: "'Lato', sans-serif",
                                    fontWeight: "400",
                                    fontSize: "22px",
                                }}>Theme Settings</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormControlLabel
                                    control={<Switch checked={darkMode} onChange={handleThemeChange}/>}
                                    label={darkMode ? "Dark Mode" : "Light Mode"}
                                />
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Form>
            )}
        </Formik>

    );
}

