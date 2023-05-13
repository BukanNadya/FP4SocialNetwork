import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Box, Button, Fab, SvgIcon, Typography } from "@mui/material";

import {
    SidebarBox,
    SidebarFab,
    SidebarTypography,
    SidebarLogOutButton,
    SidebarIconBackground,
    SidebarFabActive
} from "./NavigationStyles";
import { CapybaraSvgIcon } from "../SvgIcons/CapybaraSvgIcon";
import { setUserToken } from "../../store/actions";

export function SideBar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { pathname } = location;

    const clearLocaleStorage = () => {
        dispatch(setUserToken(false))
        localStorage.clear();
        sessionStorage.clear();
    };

    return (
        <Box position="fixed" sx={SidebarBox}>
            <div style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignContent: "start"
            }}>
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
                            <Typography variant="h6" component="div" sx={SidebarTypography}>
                                Home
                            </Typography>
                        </Fab>

                    </Link>
                    <Link to="/explore" variant="contained" style={{ textDecoration: "none" }}>
                        <Fab variant="extended" sx={pathname === "/explore" ? SidebarFabActive : SidebarFab}>
                            <SvgIcon sx={{ width: "25px", height: "25px", marginLeft: "10px" }} viewBox="0 0 24 24"
                                     aria-hidden="true"
                                     className="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                                <g>
                                    <path
                                        d="M10.64 3.157l-.36 3.593h4.99l.38-3.892 2.99.299-.36 3.593h2.97v2.5h-3.22l-.55 5.5h2.77v2.5h-3.02l-.39 3.892-2.98-.299.36-3.593H9.23l-.39 3.892-2.98-.299.36-3.593H2.75v-2.5h3.72l.55-5.5H3.75v-2.5h3.52l.38-3.892 2.99.299zm3.83 11.593l.55-5.5h-4.99l-.55 5.5h4.99z"/>
                                </g>
                            </SvgIcon>
                            <Typography variant="h6" component="div" sx={SidebarTypography}>
                                Explore
                            </Typography>
                        </Fab>
                    </Link>
                    <Link to="/notifications" variant="contained" style={{ textDecoration: "none" }}>
                        <Fab variant="extended" sx={pathname === "/notifications" ? SidebarFabActive : SidebarFab}>
                            <SvgIcon sx={{ width: "25px", height: "25px", marginLeft: "10px" }} viewBox="0 0 24 24"
                                     aria-hidden="true"
                                     className="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                                <g>
                                    <path
                                        d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"/>
                                </g>
                            </SvgIcon>
                            <Typography variant="h6" component="div" sx={SidebarTypography}>
                                Notifications
                            </Typography>
                        </Fab>

                    </Link>
                    <Link to="/messages" variant="contained" style={{ textDecoration: "none" }}>
                        <Fab variant="extended" sx={pathname === "/messages" ? SidebarFabActive : SidebarFab}>
                            <SvgIcon sx={{ width: "25px", height: "25px", marginLeft: "10px" }} viewBox="0 0 24 24"
                                     aria-hidden="true"
                                     className="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                                <g>
                                    <path
                                        d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"/>
                                </g>
                            </SvgIcon>
                            <Typography variant="h6" component="div" sx={SidebarTypography}>
                                Messages
                            </Typography>
                        </Fab>
                    </Link>
                    <Link to="/profile" variant="contained" style={{ textDecoration: "none", marginBottom: "30px" }}>
                        <Fab variant="extended" sx={pathname === "/profile" ? SidebarFabActive : SidebarFab}>
                            <SvgIcon sx={{ width: "25px", height: "25px", marginLeft: "10px" }} viewBox="0 0 24 24"
                                     aria-hidden="true"
                                     className="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                                <g>
                                    <path
                                        d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"/>
                                </g>
                            </SvgIcon>
                            <Typography variant="h6" component="div" sx={SidebarTypography}>
                                Profile
                            </Typography>
                        </Fab>
                    </Link>
                </div>
                <Button  onClick={clearLocaleStorage}
                        variant="contained" sx={SidebarLogOutButton} fullWidth={true}>Log out</Button>
            </div>
        </Box>
    );
}