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


  useEffect(() => {
    if (
      userToken &&
      (userBirthdateGoogle === "true" || userBirthdateGoogle === "false")
    ) {
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
      <ThemeProvider theme={theme}>
      {userToken ? (
        <Container maxWidth="false" sx={ContainerStyled}>
          <div style={ContentContainer} onScroll={handleParentScroll}>
            <SideBar />
            {!location.pathname.includes("/messages") &&
              <>
              <div style={ItemWrapper}>
                <div style={ItemWrapperContainer}>
                  <HeaderInformation />
                  <div style={OutletContainer}>
                    <div style={OutletWrapper}>
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
                  <div style={ItemWrapperMessage}>
                    <div style={ItemWrapperContainerMessage}>
                        <HeaderInformation />
                        <div style={OutletContainer}>
                        <div style={OutletWrapperMessage}>
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
