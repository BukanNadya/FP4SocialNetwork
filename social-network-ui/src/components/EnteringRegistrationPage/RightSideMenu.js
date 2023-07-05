import React from "react";
import { Box, Button, Card, CardContent, SvgIcon, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSignUpModal } from "../../store/actions";
import { apiUrl } from "../../apiConfig";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function RightSideMenu() {

    const dispatch = useDispatch();

    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    const xxsStyles = {
        RightSideStyle: { display: "none" },
        GridItem: { item: "282px" },
        SideMenuButton: {
            height: "45px",
            padding: "0 12px",
            mb: "20px",
            mt: "12px", width: "250px", background: "#000000",
            transition: "0.7s", "&:hover": {
                transition: "0.7s",
                backgroundColor: "#ffffff",
                color: "#000000"
            },
            fontWeight: 700,
            borderRadius: "20px",
            fontFamily: "'Lato', sans-serif",
        },
        GoogleButton: {
            fontFamily: "'Lato', sans-serif",
            fontSize: "15px",
            lineHeight: "23px",
            fontStyle: "normal",
            height: "45px",
            padding: "0 12px",
            width: "226px",
            background: "#000000",
            transition: "0.7s",
            "&:hover": {
                transition: "0.7s",
                backgroundColor: "#ffffff",
                color: "#000000"
            },
            fontWeight: 700,
            borderRadius: "20px",
            marginTop: "10px",
            textTransform: "uppercase",
            textAlign: "center",
            textDecoration: "none",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            color: "white",
        }
    };

    const xsStyles = {
        RightSideStyle: { display: "none" },
        GridItem: { item: "282px" },
        SideMenuButton: {
            height: "45px",
            padding: "0 12px",
            mb: "20px",
            mt: "12px", width: "250px", background: "#000000",
            transition: "0.7s", "&:hover": {
                transition: "0.7s",
                backgroundColor: "#ffffff",
                color: "#000000"
            },
            fontWeight: 700,
            borderRadius: "20px",
            fontFamily: "'Lato', sans-serif",
        },
        GoogleButton: {
            fontFamily: "'Lato', sans-serif",
            fontSize: "15px",
            lineHeight: "23px",
            fontStyle: "normal",
            height: "45px",
            padding: "0 12px",
            width: "226px",
            background: "#000000",
            transition: "0.7s",
            "&:hover": {
                transition: "0.7s",
                backgroundColor: "#ffffff",
                color: "#000000"
            },
            fontWeight: 700,
            borderRadius: "20px",
            marginTop: "10px",
            textTransform: "uppercase",
            textAlign: "center",
            textDecoration: "none",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            color: "white",
        }
    };

    const smStyles = {
        RightSideStyle: { display: "none" },
        GridItem: { item: "282px" },
        SideMenuButton: {
            height: "45px",
            padding: "0 12px",
            mb: "20px",
            mt: "12px", width: "250px", background: "#000000",
            transition: "0.7s", "&:hover": {
                transition: "0.7s",
                backgroundColor: "#ffffff",
                color: "#000000"
            },
            fontWeight: 700,
            borderRadius: "20px",
            fontFamily: "'Lato', sans-serif",
        },
        GoogleButton: {
            fontFamily: "'Lato', sans-serif",
            fontSize: "15px",
            lineHeight: "23px",
            fontStyle: "normal",
            height: "45px",
            padding: "0 12px",
            width: "226px",
            background: "#000000",
            transition: "0.7s",
            "&:hover": {
                transition: "0.7s",
                backgroundColor: "#ffffff",
                color: "#000000"
            },
            fontWeight: 700,
            borderRadius: "20px",
            marginTop: "10px",
            textTransform: "uppercase",
            textAlign: "center",
            textDecoration: "none",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            color: "white",
        }
    };

    const mdStyles = {
        RightSideStyle: { position: "relative" },
        GridItem: { item: "282px" },
        SideMenuButton: {
            height: "45px",
            padding: "0 12px",
            mb: "20px",
            mt: "12px", width: "250px", background: "#000000",
            transition: "0.7s", "&:hover": {
                transition: "0.7s",
                backgroundColor: "#ffffff",
                color: "#000000"
            },
            fontWeight: 700,
            borderRadius: "20px",
            fontFamily: "'Lato', sans-serif",
        },
        GoogleButton: {
            fontFamily: "'Lato', sans-serif",
            fontSize: "15px",
            lineHeight: "23px",
            fontStyle: "normal",
            height: "45px",
            padding: "0 12px",
            width: "226px",
            background: "#000000",
            transition: "0.7s",
            "&:hover": {
                transition: "0.7s",
                backgroundColor: "#ffffff",
                color: "#000000"
            },
            fontWeight: 700,
            borderRadius: "20px",
            marginTop: "10px",
            textTransform: "uppercase",
            textAlign: "center",
            textDecoration: "none",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            color: "white",
        }
    };

    const lgStyles = {
        RightSideStyle: { position: "relative" },
        GridItem: { item: "350px" },
        SideMenuButton: {
            height: "45px",
            padding: "0 12px",
            mb: "20px",
            mt: "12px", width: "300px", background: "#000000",
            transition: "0.7s", "&:hover": {
                transition: "0.7s",
                backgroundColor: "#ffffff",
                color: "#000000"
            },
            fontWeight: 700,
            borderRadius: "20px",
            fontFamily: "'Lato', sans-serif",
        },
        GoogleButton: {
            fontFamily: "'Lato', sans-serif",
            fontSize: "15px",
            lineHeight: "23px",
            fontStyle: "normal",
            height: "45px",
            padding: "0 12px",
            width: "276px",
            background: "#000000",
            transition: "0.7s",
            "&:hover": {
                transition: "0.7s",
                backgroundColor: "#ffffff",
                color: "#000000"
            },
            fontWeight: 700,
            borderRadius: "20px",
            marginTop: "10px",
            textTransform: "uppercase",
            textAlign: "center",
            textDecoration: "none",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            color: "white",
        }
    };

    const xlStyles = {
        RightSideStyle: { position: "relative" },
        GridItem: { item: "350px" },
        SideMenuButton: {
            height: "45px",
            padding: "0 12px",
            mb: "20px",
            mt: "12px", width: "300px", background: "#000000",
            transition: "0.7s", "&:hover": {
                transition: "0.7s",
                backgroundColor: "#ffffff",
                color: "#000000"
            },
            fontWeight: 700,
            borderRadius: "20px",
            fontFamily: "'Lato', sans-serif",
        },
        GoogleButton: {
            fontFamily: "'Lato', sans-serif",
            fontSize: "15px",
            lineHeight: "23px",
            fontStyle: "normal",
            height: "45px",
            padding: "0 12px",
            width: "276px",
            background: "#000000",
            transition: "0.7s",
            "&:hover": {
                transition: "0.7s",
                backgroundColor: "#ffffff",
                color: "#000000"
            },
            fontWeight: 700,
            borderRadius: "20px",
            marginTop: "10px",
            textTransform: "uppercase",
            textAlign: "center",
            textDecoration: "none",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            color: "white",
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
        <div style={styles.RightSideStyle}>
            <Box display="grid" gridTemplateColumns={styles.GridItem.item} gap={2} sx={{ position: "fixed" }}>
                <Card sx={{ minWidth: 275, height: "300px", maxWidth: "350px", borderRadius: "16px" }}>
                    <CardContent>
                        <Typography variant="h5" component="div" sx={{
                            fontWeight: "800",
                            lineHeight: "24px",
                            fontSize: "20px",
                            color: "rgb(15, 20, 25)",
                            padding: "12px 16px",
                            fontFamily: "'Lato', sans-serif"
                        }}>
                            First time on Capitweet?
                        </Typography>
                        <Typography sx={{
                            fontWeight: "400",
                            lineHeight: "16px",
                            fontSize: "13px",
                            color: "rgb(83, 100, 113)",
                            padding: "0 16px",
                            fontFamily: "'Lato', sans-serif"
                        }}>
                            Sign up now to personalize your feed!
                        </Typography>
                        <a href={`${apiUrl}/oauth2/authorization/google`} style={styles.GoogleButton}><SvgIcon
                            sx={{ marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                            width="48px" height="48px">
                            <path fill="#FFC107"
                                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                            <path fill="#FF3D00"
                                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                            <path fill="#4CAF50"
                                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                            <path fill="#1976D2"
                                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                        </SvgIcon> Sign in with Google</a>
                        <Button type="submit"
                                variant="contained" sx={styles.SideMenuButton} fullWidth={true} onClick={() => {
                            dispatch(openSignUpModal());
                        }}>Create account</Button>
                        <Typography sx={{
                            fontWeight: "400",
                            lineHeight: "16px",
                            fontSize: "14px",
                            color: "rgb(83, 100, 113)",
                            padding: "0 12px",
                            mb: "16px",
                            fontFamily: "'Lato', sans-serif"
                        }}>
                            By registering, you agree to the Terms of Service and Privacy Policy as well as the Cookie
                            Policy.
                        </Typography>
                    </CardContent>
                </Card>
                <Typography sx={{
                    fontWeight: "400",
                    lineHeight: "16px",
                    fontSize: "14px",
                    color: "rgb(83, 100, 113)",
                    padding: "0 16px",
                    margin: "16px 0",
                    fontFamily: "'Lato', sans-serif"
                }}>
                    Terms of Service
                    Privacy Policy
                    Cookies Policy
                    Special Features
                    Advertising Information
                    More
                    © 2023 X Corp.
                </Typography>
            </Box>
        </div>
    );
}