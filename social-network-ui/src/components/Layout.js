import React, { useEffect, useCallback, useState } from "react";
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
    setUserData, setUserPostsClear, setPageZero,fetchData
} from "../store/actions";
import { decodeToken } from "./Posts/decodeToken";
import { BirthdateForm } from "./LoginModal/BirthdateForm";
import {apiUrl} from "../apiConfig";

export const ScrollContext = React.createContext(() => {
});

export function Layout() {
    const navigate = useNavigate();
    const userToken = JSON.parse(localStorage.getItem("userToken")) || JSON.parse(sessionStorage.getItem("userToken"));
    const userBirthdateGoogle = useSelector(state => state.saveUserToken.userBirthdayFlag);
    const page = useSelector(state => state.pageCount.page);
    const dispatch = useDispatch();
    let location = useLocation();
    const [allPostsLoaded, setAllPostsLoaded] = useState(false);
    const userId = useSelector(state => state.userData.userData.userId);
    const [loadingPosts, setLoadingPosts] = useState(false);

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
             // dispatch(fetchPostsByUserId(userId, page));
            await dispatch(fetchData(userId));
        }
    };

    useEffect(() => {
        // setPageZero();
        // setUserPostsClear([]);
        dispatch(fetchData(userId));
        // fetchPosts(page);
    }, []);



    const handleParentScroll = useCallback(async (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 20 && !allPostsLoaded && !loadingPosts) {
            setLoadingPosts(true);
            let newPosts;
            const page2 = page + 1;
            console.log(page)
            if (location.pathname === "/explore") {
                newPosts = await dispatch(fetchExplorePosts(userId, page2));
                console.log("newPostsExplore",newPosts )
            } else if (location.pathname === "/home") {
                console.log(page);
                newPosts = await dispatch(fetchPostsByUserId(userId, page2));
                console.log("newPostsHome", newPosts )
            }
            if (newPosts && newPosts.length === 0) {
                console.log('All posts loaded, stopping further fetches');
                setAllPostsLoaded(true);
                setLoadingPosts(false);
            } else {
                dispatch(setPage(page2));
                setLoadingPosts(false);
            }
        }
    }, [dispatch, location.pathname, page, fetchPosts, allPostsLoaded]);



    return (
        <ScrollContext.Provider value={{ handleScroll: handleParentScroll, loadingPosts: loadingPosts }}>
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
