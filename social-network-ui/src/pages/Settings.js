import React from 'react';
import { Box, Switch, FormControl, FormLabel, FormGroup, FormControlLabel, TextField, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export function Settings() {
    const theme = useTheme();
    const [darkMode, setDarkMode] = React.useState(false); // Изначальное состояние для темы

    const handleThemeChange = (event) => {
        setDarkMode(event.target.checked); // Обновление состояния при переключении темы
    }

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
        AdaptiveFormStyles:{
            width: "90vw",
        }
    };

    const xsStyles = {
        AdaptiveListStyles: {
            width: "100vw",
        },
        AdaptiveFormStyles:{
            width: "92vw",
        }
    };

    const smStyles = {
        AdaptiveListStyles: {
            width: "470px",
        },
        AdaptiveFormStyles:{
            width: "440px",
        }
    };

    const mdStyles = {
        AdaptiveListStyles: {
            width: "600px",
        },
        AdaptiveFormStyles:{
            width: "550px",
        }
    };

    const lgStyles = {
        AdaptiveListStyles: {
            width: "600px",
        },
        AdaptiveFormStyles:{
            width: "550px",
        }
    };

    const xlStyles = {
        AdaptiveListStyles: {
            width: "600px",
        },
        AdaptiveFormStyles:{
            width: "550px",
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
        <Box sx={styles.AdaptiveListStyles}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                >
                    <Typography sx={{padding:"30px 0",   fontFamily: "'Lato', sans-serif",
                        fontWeight: "400",
                        fontSize: "22px",}}>Password Settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Change Password</FormLabel>
                        <FormGroup sx={styles.AdaptiveFormStyles}>
                            <TextField type="password" label="Current Password" variant="outlined" />
                            <TextField type="password" label="New Password" variant="outlined" style={{ marginTop: '20px' }} />
                            <TextField type="password" label="Confirm New Password" variant="outlined" style={{ marginTop: '20px' }} />
                            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>Change Password</Button>
                        </FormGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                >
                    <Typography sx={{padding:"30px 0",   fontFamily: "'Lato', sans-serif",
                        fontWeight: "400",
                        fontSize: "22px",}}>Theme Settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControlLabel
                        control={<Switch checked={darkMode} onChange={handleThemeChange} />}
                        label={darkMode ? 'Dark Mode' : 'Light Mode'}
                    />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

