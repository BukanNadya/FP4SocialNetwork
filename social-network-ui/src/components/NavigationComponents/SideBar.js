import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import { Box, Button, Fab, SvgIcon, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Badge from "@mui/material/Badge";

import {
    SidebarBox,
    SidebarFab,
    SidebarTypography,
    SidebarLogOutButton,
    SidebarIconBackground,
    SidebarFabActive, SvgIconStyles
} from "./NavigationStyles";
import { CapybaraSvgIcon } from "../SvgIcons/CapybaraSvgIcon";
import { setUserToken } from "../../store/actions";
import { apiUrl } from "../../apiConfig";
import PropTypes from "prop-types";
import { Post } from "../Posts/Post";

let stompClient = null;

export function SideBar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { pathname } = location;
    const theme = useTheme();
    const userId = useSelector(state => state.userData.userData.userId);
    const [notificationCount, setNotificationCount] = useState(0);
    const [messageCount, setMessageCount] = useState(0);

    const isXxs = useMediaQuery(theme.breakpoints.down("xxs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    useEffect(() => {
        async function getNotification() {
            let notificationInformation = await fetch(`${apiUrl}/api/unread_notifications`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                }),
                headers: { "Content-Type": "application/json" }
            });
            let notificationData = await notificationInformation.json();
            setNotificationCount(notificationData.unreadNotifications);

            let messageInformation = await fetch(`${apiUrl}/api/${userId}/unread`);
            let messageData = await messageInformation.json();
            setMessageCount(messageData.unread)
            console.log(messageData)
        }
        if(userId){
            getNotification();
        }
    }, [userId]);

    useEffect(() => {
        if (location.pathname === "/notifications") {
            setNotificationCount(0);
        }

        let stompClient;

        const onConnected = () => {
            if (stompClient.connected) {
                stompClient.subscribe("/user/" + userId + "/unread_notifications", onPrivateMessage);
            }
        };

        const onError = (err) => {
            console.log(err);
        };

        if (location.pathname !== "/notifications") {
            let Sock = new SockJS(`${apiUrl}/websocket`);
            stompClient = over(Sock);
            stompClient.connect({}, onConnected, onError);
        }

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, [location.pathname]);

    const onPrivateMessage = (payload) => {
        let payloadData = JSON.parse(payload.body);
        setNotificationCount(payloadData.unreadNotifications);
        console.log(payloadData, "unreadNotificationsFromSidebar");
    };

    const xxsStyles = {
        SidebarBox: {
            "& > :not(style)": { m: 1 },
            width: "60px",
            display: "none",
            textAlign: "start",
            alignContent: "start",
            flexDirection: "column",
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#ffff",
            position: "sticky",
            top: 0,
        },
        SidebarTypography: { display: "none" },
        LogoutButton: {
            ...SidebarLogOutButton,
            padding: "0",
            minWidth: "20px",
            width: "40px",
            borderRadius: "100px",
            marginLeft: "4px",
            height: "40px",
            marginTop: 0
        },
        ExitSvgIcon: {
            height: "20px",
            width: "20px",
            marginRight: "0px",
        }
        ,
        AdaptiveDivWrapper: { display: "none" }
    };

    const xsStyles = {
        SidebarBox: {
            "& > :not(style)": { m: 1 },
            width: "60px",
            display: "none",
            textAlign: "start",
            alignContent: "start",
            flexDirection: "column",
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#ffff",
            position: "sticky",
            top: 0,
        },
        SidebarTypography: { display: "none" },
        LogoutButton: {
            ...SidebarLogOutButton,
            padding: "0",
            minWidth: "20px",
            width: "40px",
            borderRadius: "100px",
            marginLeft: "4px",
            height: "40px",
            marginTop: 0
        },
        ExitSvgIcon: {
            height: "20px",
            width: "20px",
            marginRight: "0px",
        }
        ,
        AdaptiveDivWrapper: { display: "none" }
    };

    const smStyles = {
        SidebarBox: {
            "& > :not(style)": { m: 1 },
            width: "60px",
            display: "flex",
            textAlign: "start",
            alignContent: "start",
            flexDirection: "column",
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#ffff",
            position: "sticky",
            top: 0,
        },
        SidebarTypography: { display: "none" },
        LogoutButton: {
            ...SidebarLogOutButton,
            padding: "0",
            minWidth: "20px",
            width: "40px",
            borderRadius: "100px",
            marginLeft: "4px",
            height: "40px",
            marginTop: 0
        },
        ExitSvgIcon: {
            height: "20px",
            width: "20px",
            marginRight: "0px",
        }
        ,
        AdaptiveDivWrapper: {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignContent: "start"
        }

    };

    const mdStyles = {
        SidebarBox: {
            "& > :not(style)": { m: 1 },
            width: "60px",
            display: "flex",
            textAlign: "start",
            alignContent: "start",
            flexDirection: "column",
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#ffff",
            position: "sticky",
            top: 0,
        },
        SidebarTypography: { display: "none" },
        LogoutButton: {
            ...SidebarLogOutButton,
            padding: "0",
            minWidth: "20px",
            width: "40px",
            borderRadius: "100px",
            marginLeft: "4px",
            height: "40px",
            marginTop: 0
        },
        ExitSvgIcon: {
            height: "15px",
            width: "15px",
            marginRight: "0"
        }
        ,
        AdaptiveDivWrapper: {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignContent: "start"
        }
    };

    const lgStyles = {
        SidebarBox: {
            "& > :not(style)": { m: 1 },
            width: "300px",
            display: "flex",
            textAlign: "start",
            alignContent: "start",
            flexDirection: "column",
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#ffff",
            position: "sticky",
            top: 0,
        },
        SidebarTypography: {
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            fontWeight: "700",
            fontSize: "22px",
            display: "flex",
            alignItems: "center",
            padding: "0 20px 0 10px",
            textTransform: "none",
        },
        LogoutButton: { ...SidebarLogOutButton },
        ExitSvgIcon: {
            height: "20px",
            width: "20px",
            marginRight: "10px",
        }
        ,
        AdaptiveDivWrapper: {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignContent: "start"
        }
    };

    const xlStyles = {
        SidebarBox: {
            "& > :not(style)": { m: 1 },
            width: "300px",
            display: "flex",
            textAlign: "start",
            alignContent: "start",
            flexDirection: "column",
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#ffff",
            position: "sticky",
            top: 0,
        },
        SidebarTypography: {
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            fontWeight: "700",
            fontSize: "22px",
            display: "flex",
            alignItems: "center",
            padding: "0 20px 0 10px",
            textTransform: "none",
        },
        LogoutButton: { ...SidebarLogOutButton },
        ExitSvgIcon: {
            height: "20px",
            width: "20px",
            marginRight: "10px",
        },
        AdaptiveDivWrapper: {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignContent: "start"
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

    const clearLocaleStorage = () => {
        dispatch(setUserToken(false));
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    };

    return (
        <Box data-testid={"sidebar_for_home_page"} position="fixed" sx={styles.SidebarBox}>
            <div style={styles.AdaptiveDivWrapper}>
                <div
                    style={{ height: "60%", display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
                    <Link to="/home" variant="contained">
                        <Fab variant="extended" sx={SidebarIconBackground}>
                            <CapybaraSvgIcon/>
                        </Fab>
                    </Link>
                    <Link to="/home" variant="contained" style={{ textDecoration: "none" }}>
                        <Fab variant="extended" sx={pathname === "/home" ? SidebarFabActive : SidebarFab}>
                            <SvgIcon sx={{ width: "25px", height: "25px", marginLeft: "10px" }} viewBox="0 0 24 24"
                                     aria-hidden="true"
                                     className="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                                <g>
                                    <path
                                        d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"/>
                                </g>
                            </SvgIcon>
                            <Typography variant="h6" component="div" sx={styles.SidebarTypography}>
                                Home
                            </Typography>
                        </Fab>

                    </Link>
                    <Link to="/explore" variant="contained" style={{ textDecoration: "none" }}>
                        <Fab variant="extended" sx={pathname === "/explore" ? SidebarFabActive : SidebarFab}>
                            <SvgIcon sx={SvgIconStyles} viewBox="0 0 24 24"
                                     aria-hidden="true"
                                     className="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                                <g>
                                    <path
                                        d="M10.64 3.157l-.36 3.593h4.99l.38-3.892 2.99.299-.36 3.593h2.97v2.5h-3.22l-.55 5.5h2.77v2.5h-3.02l-.39 3.892-2.98-.299.36-3.593H9.23l-.39 3.892-2.98-.299.36-3.593H2.75v-2.5h3.72l.55-5.5H3.75v-2.5h3.52l.38-3.892 2.99.299zm3.83 11.593l.55-5.5h-4.99l-.55 5.5h4.99z"/>
                                </g>
                            </SvgIcon>
                            <Typography variant="h6" component="div" sx={styles.SidebarTypography}>
                                Explore
                            </Typography>
                        </Fab>
                    </Link>
                    {!isLg && !isXl ? <Link to="/search" variant="contained" style={{ textDecoration: "none" }}>
                        <Fab variant="extended" sx={pathname === "/search" ? SidebarFabActive : SidebarFab}>
                            <SvgIcon sx={SvgIconStyles} viewBox="0 0 24 24"
                                     aria-hidden="true"
                                     className="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                                <g>
                                    <path
                                        d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"/>
                                </g>
                            </SvgIcon>
                            <Typography variant="h6" component="div" sx={styles.SidebarTypography}>
                                Search
                            </Typography>
                        </Fab>
                    </Link> : null}
                    <Link to="/notifications" variant="contained" style={{ textDecoration: "none" }}>
                        <Fab variant="extended" sx={pathname === "/notifications" ? SidebarFabActive : SidebarFab}
                             onClick={() => {
                                 setNotificationCount(0);
                             }}>
                            {notificationCount > 0 ? (
                                <Badge badgeContent={notificationCount} color={"primary"}>
                                    <SvgIcon sx={SvgIconStyles} viewBox="0 0 24 24"
                                             aria-hidden="true"
                                             className="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                                        <g>
                                            <path
                                                d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"/>
                                        </g>
                                    </SvgIcon>
                                </Badge>
                            ) : (
                                <SvgIcon sx={SvgIconStyles} viewBox="0 0 24 24"
                                         aria-hidden="true"
                                         className="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                                    <g>
                                        <path
                                            d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"/>
                                    </g>
                                </SvgIcon>
                            )}
                            <Typography variant="h6" component="div" sx={styles.SidebarTypography}>
                                Notifications
                            </Typography>
                        </Fab>
                    </Link>
                    <Link to="/messages" variant="contained" style={{ textDecoration: "none" }}>
                        <Fab variant="extended" sx={pathname === "/messages" ? SidebarFabActive : SidebarFab}>
                            <Badge badgeContent={location.pathname === "/messages" ? 0 : messageCount} color={"primary"}>
                            <SvgIcon sx={SvgIconStyles} viewBox="0 0 24 24"
                                     aria-hidden="true"
                                     className="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                                <g>
                                    <path
                                        d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"/>
                                </g>
                            </SvgIcon>
                            </Badge>
                            <Typography variant="h6" component="div" sx={styles.SidebarTypography}>
                                Messages
                            </Typography>
                        </Fab>
                    </Link>
                    <Link to="/profile" variant="contained" style={{ textDecoration: "none" }}>
                        <Fab variant="extended" sx={pathname === "/profile" ? SidebarFabActive : SidebarFab}>
                            <SvgIcon sx={SvgIconStyles} viewBox="0 0 24 24"
                                     aria-hidden="true"
                                     className="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                                <g>
                                    <path
                                        d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"/>
                                </g>
                            </SvgIcon>
                            <Typography variant="h6" component="div" sx={styles.SidebarTypography}>
                                Profile
                            </Typography>
                        </Fab>
                    </Link>
                    <Link to="/settings" variant="contained" style={{ textDecoration: "none", marginBottom: "30px" }}>
                        <Fab variant="extended" sx={pathname === "/settings" ? SidebarFabActive : SidebarFab}>
                            <ManageAccountsOutlinedIcon sx={SvgIconStyles}/>
                            <Typography variant="h6" component="div" sx={styles.SidebarTypography}>
                                Settings
                            </Typography>
                        </Fab>
                    </Link>
                </div>
                <Button onClick={clearLocaleStorage}
                        variant="contained" sx={styles.LogoutButton} fullWidth={true}>
                    <SvgIcon fill="#000000" sx={styles.ExitSvgIcon} version="1.1"
                             id="Capa_1"
                             viewBox="0 0 384.971 384.971">
                        <g>
                            <g id="Sign_Out">
                                <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
			C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
			C192.485,366.299,187.095,360.91,180.455,360.91z"/>
                                <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
			c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
			c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                        </g>
                    </SvgIcon>
                    <Typography variant="h6" component="div" sx={{
                        ...styles.SidebarTypography,
                        fontSize: "15px",
                        padding: "0",
                        marginLeft: "5px",
                        textTransform: "uppercase"
                    }}>
                        Log out
                    </Typography>
                </Button>
            </div>
        </Box>
    );
}

