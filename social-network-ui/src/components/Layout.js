import React, { useEffect, useCallback, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";

import { Container } from "@mui/material";

import { HeaderInformation } from "./NavigationComponents/HeaderInformation";
import { UsersSearch } from "./NavigationComponents/UsersSearch/UsersSearch";
import { SideBar } from "./NavigationComponents/SideBar";
import {
  ContainerStyled,
  ContentContainer,
  ItemWrapper,
  ItemWrapperMessage,
  ItemWrapperContainer,
  ItemWrapperContainerMessage,
  OutletContainer,
  OutletWrapper,
  OutletWrapperMessage,
} from "./LayoutStyles";

import { RegistrationPage } from "../pages/RegistrationPage";
import {
  setUserId,
  fetchPostsByUserId,
  fetchExplorePosts,
  setPage,
  setUserData,
  setUserPostsClear,
  setPageZero,
  fetchData,
} from "../store/actions";
import { decodeToken } from "./Posts/decodeToken";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BirthdateForm } from "./LoginModal/BirthdateForm";

export const ScrollContext = React.createContext(() => {});

const theme = createTheme({
    breakpoints: {
        values: {
            xxs: 0, // small phone
            xs: 300, // phone
            sm: 600, // tablets
            md: 900, // small laptop
            lg: 1200, // desktop
            xl: 1536 // large screens
        }
    }
});

export function Layout() {
    const navigate = useNavigate();
    const userToken = JSON.parse(localStorage.getItem("userToken")) || JSON.parse(sessionStorage.getItem("userToken"));
    const userBirthdateGoogle = useSelector(state => state.saveUserToken.userBirthdayFlag);
    const page = useSelector(state => state.pageCount.page);
    const dispatch = useDispatch();
    let location = useLocation();
    const userId = useSelector(state => state.userData.userData.userId);
    const loadingPostsRef = useRef(false);
    const allPostsLoadedRef = useRef(false);

    const isXxs = useMediaQuery(theme.breakpoints.down("xxs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    const xxsStyles = {
        AdaptiveOutletWrapper: {},
        AdaptiveItemWrapperContainer: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
        },
        MaxWidthAdaptive: "true",
        AdaptiveContainerStyled: {
            padding: "0!important",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowX: "hidden",
            width: "100vw",
        },
        AdaptiveContentContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            position: "sticky",
            top: 0,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&:::WebkitScrollbar": {
                display: "none"
            },
        },
        AdaptiveItemWrapper: {
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            position: "relative",
            alignItems: "center",
        },
        AdaptiveOutletContainer:{
            position: "relative",
            width: "100%",
            display: "flex",
        }
    };

    const xsStyles = {
        AdaptiveOutletWrapper: {},
        AdaptiveItemWrapperContainer: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
        },
        MaxWidthAdaptive: "false",
        AdaptiveContainerStyled: {
            padding: "0!important",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowX: "hidden",
            width: "100vw",
        },
        AdaptiveContentContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            position: "sticky",
            top: 0,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&:::WebkitScrollbar": {
                display: "none"
            },
        },
        AdaptiveItemWrapper: {
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            position: "relative",
            alignItems: "center",
        },
        AdaptiveOutletContainer:{
            position: "relative",
            width: "100%",
            display: "flex",
        }
    };

    const smStyles = {
        AdaptiveOutletWrapper: {},
        AdaptiveItemWrapperContainer: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "470px",
        },
        MaxWidthAdaptive: "false",
        AdaptiveContainerStyled: {
            padding: "0!important",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowX: "hidden",
        },
        AdaptiveContentContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            position: "sticky",
            top: 0,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            marginRight: "-40px",
            "&:::WebkitScrollbar": {
                display: "none"
            },
        },
        AdaptiveItemWrapper: {
            display: "flex",
            flexDirection: "column",
            maxWidth: "700px",
            position: "relative",
            alignItems: "center",
        },
        AdaptiveOutletContainer:{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
        }
    };

    const mdStyles = {
        AdaptiveItemWrapperMessage: {...ItemWrapperMessage},
        AdaptiveItemWrapperContainer: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "600px",
        },
        MaxWidthAdaptive: "true",
        AdaptiveContainerStyled: {
            padding: "0!important",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowX: "hidden",
        },
        AdaptiveContentContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            position: "sticky",
            top: 0,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            marginRight: "-40px",
            "&:::WebkitScrollbar": {
                display: "none"
            },
        },
        AdaptiveItemWrapper: {
            display: "flex",
            flexDirection: "column",
            maxWidth: "700px",
            position: "relative",
            alignItems: "center",
        },
        AdaptiveOutletContainer:{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
        }
    };

    const lgStyles = {
        AdaptiveOutletWrapper: {...ItemWrapperMessage},
        AdaptiveItemWrapperContainer: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "600px",
        },
        MaxWidthAdaptive: "false",
        AdaptiveContainerStyled: {
            padding: "0!important",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowX: "hidden",
        },
        AdaptiveContentContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            position: "sticky",
            top: 0,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            marginRight: "-40px",
            "&:::WebkitScrollbar": {
                display: "none"
            },
        },
        AdaptiveItemWrapper: {
            display: "flex",
            flexDirection: "column",
            maxWidth: "700px",
            position: "relative",
            alignItems: "center",
        },
        AdaptiveOutletContainer:{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
        },
        AdaptiveItemWrapperMessage: {
            ...ItemWrapperMessage,
        },
        AdaptiveItemWrapperContainerMessage: {
            ...ItemWrapperContainerMessage,
            width: "900px",
        },

        AdaptiveOutletWrapperMessage: {
            ...OutletWrapperMessage,
        }
    };

    const lStyles = {
        AdaptiveOutletWrapper: {...ItemWrapperMessage},
        AdaptiveItemWrapperContainer: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "600px",
        },
        MaxWidthAdaptive: "false",
        AdaptiveContainerStyled: {
            padding: "0!important",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowX: "hidden",
        },
        AdaptiveContentContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            position: "sticky",
            top: 0,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            marginRight: "-40px",
            "&:::WebkitScrollbar": {
                display: "none"
            },
        },
        AdaptiveItemWrapper: {
            display: "flex",
            flexDirection: "column",
            maxWidth: "700px",
            position: "relative",
            alignItems: "center",
        },
        AdaptiveOutletContainer:{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
        },
        AdaptiveItemWrapperMessage: {
            ...ItemWrapperMessage,
        },
        AdaptiveItemWrapperContainerMessage: {
            ...ItemWrapperContainerMessage,
            width: "900px",
        },

        AdaptiveOutletWrapperMessage: {
            ...OutletWrapperMessage,
        }
    };


    const xlStyles = {
        AdaptiveOutletWrapper: {...ItemWrapperMessage},
        AdaptiveItemWrapperContainer: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "600px",
        },
        MaxWidthAdaptive: "false",
        AdaptiveContainerStyled: {
            padding: "0!important",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            overflowX: "hidden",
        },
        AdaptiveContentContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            position: "sticky",
            top: 0,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            marginRight: "-40px",
            "&:::WebkitScrollbar": {
                display: "none"
            },
        },
        AdaptiveItemWrapper: {
            display: "flex",
            flexDirection: "column",
            maxWidth: "700px",
            position: "relative",
            alignItems: "center",
        },
        AdaptiveOutletContainer:{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
        },
        AdaptiveItemWrapperMessage: {
            ...ItemWrapperMessage,
        },
        AdaptiveItemWrapperContainerMessage: {
            ...ItemWrapperContainerMessage,
            width: "1200px",
        },

        AdaptiveOutletWrapperMessage: {
            ...OutletWrapperMessage,
        }
    };

    let styles;
    if (isXl) {
        styles = xlStyles;
    }  else if (isLg) {
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

    useEffect(() => {
        if (userToken && userBirthdateGoogle === "true" || userToken && userBirthdateGoogle === "false") {
            navigate("/home");
        }
    }, []);

    useEffect(()=>{
        allPostsLoadedRef.current = false;
        loadingPostsRef.current = false;
    }, [location.pathname])



    const handleParentScroll = useCallback(async (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 20 && !allPostsLoadedRef.current && !loadingPostsRef.current) {
            loadingPostsRef.current = true;
            let newPosts;
            const page2 = page + 1;
            if (location.pathname === "/explore") {
                newPosts = await dispatch(fetchExplorePosts(userId, page2));
            } else if (location.pathname === "/home") {
                newPosts = await dispatch(fetchPostsByUserId(userId, page2));
            }
            if (newPosts && newPosts.length === 0) {
                allPostsLoadedRef.current = true;
                loadingPostsRef.current = false;
            } else {
                dispatch(setPage(page2));
                loadingPostsRef.current = false;
            }
        }
    }, [dispatch, location.pathname, page, userId]);

    return (
        <ScrollContext.Provider value={handleParentScroll}>
            <ThemeProvider theme={theme}>
                {userToken ? (
                    <Container maxWidth={styles.MaxWidthAdaptive}  sx={styles.AdaptiveContainerStyled}>
                        <div style={styles.AdaptiveContentContainer} onScroll={handleParentScroll}>
                            <SideBar />
                            {!location.pathname.includes("/messages") &&
                                <>
                                    <div style={styles.AdaptiveItemWrapper}>
                                        <div style={styles.AdaptiveItemWrapperContainer}>
                                            <HeaderInformation />
                                            <div style={styles.AdaptiveOutletContainer}>
                                                <div style={styles.AdaptiveOutletWrapper}>
                                                    <Outlet />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {userBirthdateGoogle ? null : <BirthdateForm />}
                                    <UsersSearch />
                                </>
                            }
                            {location.pathname.includes("/messages") &&
                                <>
                                    <div style={styles.AdaptiveItemWrapperMessage}>
                                        <div style={styles.AdaptiveItemWrapperContainerMessage}>
                                            <div style={styles.AdaptiveOutletContainer}>
                                                <div style={styles.AdaptiveOutletWrapperMessage}>
                                                    <Outlet />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>}
                        </div>
                    </Container>) : (<RegistrationPage />)
                }
            </ThemeProvider>
        </ScrollContext.Provider>
    );
}
