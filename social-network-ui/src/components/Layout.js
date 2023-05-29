import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Container, } from "@mui/material";

import { HeaderInformation } from "./NavigationComponents/HeaderInformation";
import { UsersSearch } from "./NavigationComponents/UsersSearch/UsersSearch";
import { SideBar } from "./NavigationComponents/SideBar";
import {
    ContainerStyled,
    ContentContainer,
    ItemWrapper,
    ItemWrapperContainer,
    OutletContainer,
    OutletWrapper
} from "./LayoutStyles";

import { RegistrationPage } from "../pages/RegistrationPage";
import {
    setUserId,
    fetchPostsByUserId,
    fetchExplorePosts,
    setPage,
    setUserData,
} from "../store/actions";
import { decodeToken } from "./Posts/decodeToken";
import { BirthdateForm } from "./LoginModal/BirthdateForm";

export const ScrollContext = React.createContext(() => {
});

export function Layout() {
    const navigate = useNavigate();
    const userToken = JSON.parse(localStorage.getItem("userToken")) || JSON.parse(sessionStorage.getItem("userToken"));
    const userBirthdateGoogle = useSelector(state => state.saveUserToken.userBirthdayFlag);
    const page = useSelector(state => state.pageCount.page);
    const dispatch = useDispatch();
    let location = useLocation();

    useEffect(() => {
        if (userToken && userBirthdateGoogle === "true" || userToken && userBirthdateGoogle === "false") {
            navigate("/home");
        }

    }, []);

    const fetchPosts = async (page) => {
        const decodedToken = decodeToken();
        if (decodedToken) {
            const userId = decodedToken.sub;
            dispatch(setUserId(userId));
            dispatch(fetchPostsByUserId(userId, page));
            await fetchData(userId);
        }
    };

    const fetchData = async (userId) => {
        const response = await fetch(`http://localhost:8080/profile/${userId}`);
        const userData = await response.json();
        dispatch(setUserData(userData));
    };



    const handleParentScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 5) {
            if (location.pathname === "/explore") {
                const page2 = page + 1;
                dispatch(setPage(page2));
                dispatch(fetchExplorePosts(page2));
            } else if (location.pathname === "/home") {
                const page2 = page + 1;
                dispatch(setPage(page2));
                fetchPosts(page2);
            }
        }
    };

    return (
        <ScrollContext.Provider value={{ handleScroll: handleParentScroll }}>
            {userToken ? (
                <Container maxWidth="false" sx={ContainerStyled}>
                    <div style={ContentContainer} onScroll={handleParentScroll}>
                        <SideBar/>
                        <div style={ItemWrapper}>
                            <div style={ItemWrapperContainer}>
                                <HeaderInformation/>
                                <div style={OutletContainer}>
                                    <div style={OutletWrapper}>
                                        <Outlet/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {userBirthdateGoogle ? null : <BirthdateForm/>}
                        <UsersSearch/>
                    </div>
                </Container>) : (<RegistrationPage/>)
            }
        </ScrollContext.Provider>
    );
};