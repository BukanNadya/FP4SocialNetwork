import React from "react";
import {useLocation} from "react-router-dom";

import { AppBar, Toolbar, Typography } from "@mui/material";

import { Header } from "./NavigationStyles";


export function HeaderInformation() {
    const location = useLocation();
    const { pathname } = location;

    const getRouteName = (path) => {
        switch (path) {
            case '/home':
                return 'Home';
            case '/explore':
                return 'Explore';
            case '/notifications':
                return 'Notifications';
            case '/messages':
                return 'Messages';
            case '/profile':
                return 'Profile';
            case '/subscribe':
                return 'Subscribe';
            case '/view':
                return 'View';
            default:
                return 'Home';
        }
    };

    return (
        <AppBar position="fixed" color="primary" sx={Header}>
            <Toolbar sx={{ height: "70px" }}>
                <Typography variant="h5" component="div" sx={{ fontFamily: "'Lato', sans-serif", color: "#000000" }}>
                    {getRouteName(pathname)}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
