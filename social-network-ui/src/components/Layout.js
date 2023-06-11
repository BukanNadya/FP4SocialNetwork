import React, { useEffect, useCallback, useRef } from "react";
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
    fetchPostsByUserId,
    fetchExplorePosts,
    setPage,
    fetchData,
} from "../store/actions";
import { BirthdateForm } from "./LoginModal/BirthdateForm";
import { decodeToken } from "./Posts/decodeToken";

export const ScrollContext = React.createContext(() => {
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

    useEffect(() => {
        if (userToken && userBirthdateGoogle === "true" || userToken && userBirthdateGoogle === "false") {
            navigate("/home");
        }
    }, []);

    useEffect(()=>{
        allPostsLoadedRef.current = false;
        loadingPostsRef.current = false;
    }, [location.pathname])

    useEffect(()=>{
        console.log(userId, "userIdFromLayout")
    },[userId])

    // useEffect(() => {
    //     dispatch(fetchData(userId));
    // }, []);

    const handleParentScroll = useCallback(async (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 20 && !allPostsLoadedRef.current && !loadingPostsRef.current) {
            loadingPostsRef.current = true;
            let newPosts;
            const page2 = page + 1;
            console.log(page)
            if (location.pathname === "/explore") {
                newPosts = await dispatch(fetchExplorePosts(userId, page2));
                console.log("newPostsExplore",newPosts )
            } else if (location.pathname === "/home") {
                console.log('fetching posts by user id in layout scroll callback', page);
                console.log(userId)
                newPosts = await dispatch(fetchPostsByUserId(userId, page2));
                console.log("newPostsHome", newPosts )
            }
            if (newPosts && newPosts.length === 0) {
                console.log('All posts loaded, stopping further fetches');
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
