import React from 'react'
import {AppBar, Box, Button, Typography, Container} from "@mui/material"
import {useDispatch} from "react-redux";
import {openLoginModal, openSignUpModal} from "../../store/actions";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


export  function Footer () {

    const dispatch = useDispatch()

    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
        SidebarTypography: { display: "none" },
        ExploreButton: {
            borderRadius: "40px",
            backgroundColor: "#ffffff",
            boxShadow: "none",
            padding: "0",
            width: "60px",
            height: "60px",
            "&:hover": {
                transition: "0.7s",
                backgroundColor: "rgba(15, 20, 25, 0.15)",
            },
        },
        ContainerStyle: {
            minWidth: "100px",
            width: "auto"
        },
        GridItem: { item: " 1fr" },
        DivStyles: {display: "none"},
        FooterTypography: {display: "none"},
    };

    const xsStyles = {
        SidebarTypography: { display: "none" },
        ExploreButton: {
            borderRadius: "40px",
            backgroundColor: "#ffffff",
            boxShadow: "none",
            padding: "0",
            width: "60px",
            height: "60px",
            "&:hover": {
                transition: "0.7s",
                backgroundColor: "rgba(15, 20, 25, 0.15)",
            },
        },
        ContainerStyle: {
            minWidth: "300px",
            width: "auto"
        },
        GridItem: { item: " 1fr" },
        DivStyles: {display: "none"},
        FooterTypography: {display: "none"},
    };

    const smStyles = {
        SidebarTypography: { display: "none" },
        ExploreButton: {
            borderRadius: "40px",
            backgroundColor: "#ffffff",
            boxShadow: "none",
            padding: "0",
            width: "60px",
            height: "60px",
            "&:hover": {
                transition: "0.7s",
                backgroundColor: "rgba(15, 20, 25, 0.15)",
            },
        },
        ContainerStyle: {
            minWidth: "600px",
            width: "auto"
        },
        GridItem: { item: " 1.5fr 1fr" },
        DivStyles: {display: "none"},
        FooterTypography: {
            flexGrow: 1,
            fontWeight: "400",
            fontSize: "15px",
            lineHeight: "1.3",
            fontFamily: "'Lato', sans-serif",
        }
    };

    const mdStyles = {
        SidebarTypography: { display: "none" },
        ExploreButton: {
            borderRadius: "40px",
            backgroundColor: "#ffffff",
            boxShadow: "none",
            padding: "0",
            width: "60px",
            height: "60px",
            "&:hover": {
                transition: "0.7s",
                backgroundColor: "rgba(15, 20, 25, 0.15)",
            },
        },
        ContainerStyle: {
            minWidth: "900px"
        },
        GridItem: { item: " 0.8fr 6fr 3fr" },
        DivStyles: {display: "block"},
        FooterTypography: {
            flexGrow: 1,
            fontWeight: "400",
            fontSize: "15px",
            lineHeight: "1.3",
            fontFamily: "'Lato', sans-serif",
        }
    };

    const lgStyles = {
        ContainerStyle: {
            minWidth: "1200px"
        },
        GridItem: { item: " 1.75fr 6fr 3fr" },
        DivStyles: {display: "block"},
        FooterTypography: {
            flexGrow: 1,
            fontWeight: "400",
            fontSize: "15px",
            lineHeight: "1.3",
            fontFamily: "'Lato', sans-serif",
        }
    };

    const xlStyles = {
        ContainerStyle: {
            minWidth: "1200px"
        },
        GridItem: { item: " 3fr 6fr 3fr" },
        DivStyles: {display: "block"},
        FooterTypography: {
            flexGrow: 1,
            fontWeight: "400",
            fontSize: "15px",
            lineHeight: "1.3",
            fontFamily: "'Lato', sans-serif",
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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, backgroundColor: "black"}}>
                <Container sx={styles.ContainerStyle} >
                    <Box display="grid" gridTemplateColumns={styles.GridItem.item} gap={2} sx={{height: "72px", alignItems: "center"}}>

                        <div style={styles.DivStyles}/>
                        <Typography variant="h6" component="div" sx={styles.FooterTypography}>
                            <span style={{ fontWeight: "700", fontSize: "23px" }}>Don&rsquo;t miss what&rsquo;s happening</span>
                            <br/>
                            People on Capitweet are the first to know.
                        </Typography>
                        <div style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
                            {isXs || isXxs  ? <Typography variant="h6" component="div" sx={{  fontWeight: "700",
                                fontSize: "20px",
                                lineHeight: "1.3",
                                fontFamily: "'Lato', sans-serif",}}>
                                Welcome to Capitweet!
                            </Typography> : null}
                            <Button variant="outlined" color="inherit" sx={{
                                borderRadius: "20px",
                                fontWeight: "700",
                                margin: "10px",
                                textTransform: "inherit",
                                fontFamily: "'Lato', sans-serif",
                                "&:hover": {
                                    transition: "0.7s",
                                    backgroundColor: "#000000",
                                    color: "#ffffff",
                                    borderColor: "#000000"
                                },
                            }} onClick={() => {dispatch(openLoginModal())}}>Log in</Button>
                            <Button variant="contained" sx={{
                                background: "#ffffff",
                                color: "#000000",
                                borderRadius: "20px",
                                fontWeight: "700",
                                margin: "10px",
                                textTransform: "inherit",
                                fontFamily: "'Lato', sans-serif",
                                "&:hover": {
                                    transition: "0.7s",
                                    backgroundColor: "#000000",
                                    color: "#ffffff"
                                },
                            }} onClick={() => {dispatch(openSignUpModal())}}>Sign up</Button>
                        </div>
                    </Box>
                </Container>
            </AppBar>
        </Box>
    )
}
