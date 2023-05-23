import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
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
import {useNavigate} from "react-router-dom";

import { RegistrationPage } from "../pages/RegistrationPage";
import { setPosts, setUserId, setPage, fetchPostsByUserId, fetchPostsByPage } from "../store/actions";
import { useState } from "react";
import { decodeToken } from "./Posts/decodeToken";

export function Layout() {
    const userToken = useSelector(state => state.saveUserToken.userToken);
    const page = useSelector(state=>state.pageCount.page)
    const [isEnd, setIsEnd] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();


    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const fetchPosts = async (page) => {
        const decodedToken = decodeToken();
        let data;
        if (decodedToken) {
            const userId = decodedToken.sub;
            dispatch(setUserId(userId));
            data = await dispatch(fetchPostsByUserId(userId, page));
        } else if(!decodedToken || navigate==="/explore"){
            data = await dispatch(fetchPostsByPage(page));
            console.log(data)
        }
        if (data.length === 0) {
            setIsEnd(true);
        } else {
            dispatch(setPosts(data));
        }
    };

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 20 && !isEnd) {
            let a = page + 1
            dispatch(setPage(a));
        }
    };

    return (
        userToken ? (
            <Container maxWidth="false" sx={ContainerStyled}>
                <div style={ContentContainer} onScroll={handleScroll}>
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
                    <UsersSearch/>
                </div>
            </Container>) : (<RegistrationPage/>)
    );
}