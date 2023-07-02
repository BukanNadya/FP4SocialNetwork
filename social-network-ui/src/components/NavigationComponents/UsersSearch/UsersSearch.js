import React from "react";

import { AppBar } from "@mui/material";

import {
    UserSearchAppBar,
    UserSearchContentWrapper,
    UserSearchWrapper
} from "../NavigationStyles";
import { PopularPeopleSidebar } from "./PopularPeopleSidebar";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {Search} from "./Search/Search";
import {useSelector} from "react-redux";

export function UsersSearch() {

    const darkMode = useSelector(state => state.userData.userMode.darkMode);
    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.down("xxs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
        AdaptiveUserSearchAppBar:{...UserSearchAppBar, display:"none", backgroundColor: darkMode ? "rgb(21, 32, 43)" : "#ffffff"},
        AdaptiveUserSearchWrapper:{...UserSearchWrapper, width:"10px", display:"none"},
        AdaptiveUserSearchContentWrapper: {...UserSearchContentWrapper, width:"10px", display:"none"}
    };

    const xsStyles = {
        AdaptiveUserSearchAppBar:{...UserSearchAppBar, display:"none", backgroundColor: darkMode ? "rgb(21, 32, 43)" : "#ffffff"},
        AdaptiveUserSearchWrapper:{...UserSearchWrapper, width:"0px", display:"none"},
        AdaptiveUserSearchContentWrapper: {...UserSearchContentWrapper, width:"10px", display:"none"}

    };

    const smStyles = {
        AdaptiveUserSearchAppBar:{...UserSearchAppBar, display:"none",  flexBasis: "100px", backgroundColor: darkMode ? "rgb(21, 32, 43)" : "#ffffff"},
        AdaptiveUserSearchWrapper:{...UserSearchWrapper, width:"0px", zIndex: "0.1",},
        AdaptiveUserSearchContentWrapper: {...UserSearchContentWrapper, width:"50px"}
    };

    const mdStyles = {
        AdaptiveUserSearchAppBar:{...UserSearchAppBar, display:"none", flexBasis: "100px", backgroundColor: darkMode ? "rgb(21, 32, 43)" : "#ffffff"},
        AdaptiveUserSearchWrapper:{...UserSearchWrapper, width:"0px", zIndex: "0.1",},
        AdaptiveUserSearchContentWrapper: {...UserSearchContentWrapper, width:"100px"}
    };

    const lgStyles = {
        AdaptiveUserSearchAppBar:{...UserSearchAppBar, width:"320px", height: "500px", backgroundColor: darkMode ? "rgb(21, 32, 43)" : "#ffffff"},
        AdaptiveUserSearchWrapper:{...UserSearchWrapper, width:"320px"},
        AdaptiveUserSearchContentWrapper: {...UserSearchContentWrapper, width:"320px"}
    };

    const xlStyles = {
        AdaptiveUserSearchAppBar:{...UserSearchAppBar, width:"320px", height: "500px", backgroundColor: darkMode ? "rgb(21, 32, 43)" : "#ffffff"},
        AdaptiveUserSearchWrapper:{...UserSearchWrapper, width:"320px"},
        AdaptiveUserSearchContentWrapper: {...UserSearchContentWrapper, width:"320px"}
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
        <div style={UserSearchWrapper}>
            <AppBar position="sticky" style={styles.AdaptiveUserSearchAppBar}>
                <Search/>
                <PopularPeopleSidebar/>
            </AppBar>
            <div style={styles.AdaptiveUserSearchContentWrapper}></div>
        </div>
    );
}
