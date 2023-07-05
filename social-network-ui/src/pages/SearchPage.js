import React from "react";
import { Search } from "../components/NavigationComponents/UsersSearch/Search/Search";
import { useEffect, useState } from "react";
import { PopularPeopleFetch, setSearchId, userFollowing } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    darkUserNameParagraph,
    darkUserNickLink,
    ElementLi,
    ElementUl, emptyArrParagraph,
    imgStyles, PaperStyles,
    TextWrapper, userNameParagraph, userNickLink, userNickParagraph, Wrapper
} from "../components/NavigationComponents/UsersSearch/popularPeopleSidebarStyles";
import { Avatar, Button, Typography } from "@mui/material";
import { StyledBlackButton } from "../components/LoginModal/loginModalStyles";
import { ToggleButton } from "../components/Buttons/ToggleButton/ToggleButton";
import { apiUrl } from "../apiConfig";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useTransition, animated } from 'react-spring';

export function SearchPage() {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const idUser = useSelector(state => state.userData.userData.userId);
    const [mostPopularPeople, setMostPopularPeople] = useState([]);
    const darkMode = useSelector(state => state.userData.userMode.darkMode);

    const transitions = useTransition(mostPopularPeople, {
        from: { opacity: 0, transform: 'translate3d(0,50%,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0%,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,50%,0)' },
        keys: item => item.userId,
        config: { duration: 600, delay: 200 },
    });

    const toAnotherUserPage = (userIdWhoSendPost) => {
        dispatch(setSearchId(String(userIdWhoSendPost)));
        navigate("/view");
    };
    const userFollowingData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${apiUrl}/api/following/${idUser}`);
            const followData = await response.json();
            const followArr = followData.map(el => String(el.userId));
            dispatch(userFollowing(followArr));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            dispatch(PopularPeopleFetch(setIsLoading, setMostPopularPeople));
            userFollowingData();
        };
        fetchData();
    }, []);

    const isXxs = useMediaQuery(theme.breakpoints.down("xxs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    const xxsStyles = {
        PaperAdaptiveStyles: { ...PaperStyles, width: "220px" },
        ElementLiAdaptiveStyles: {
            ...ElementLi,
            ...Wrapper,
            width: "100%",
            marginLeft: "0px",
            alignItems: "center",
            borderBottom: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
            justifyItems: "center",
        },
        FollowButtonWidth: "100px",
        AdaptiveElementUl: {
            ...ElementUl,
            width: "100vw",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        },
        AdaptiveTextWrapper:{ ...TextWrapper}
    };

    const xsStyles = {
        PaperAdaptiveStyles: { ...PaperStyles, width: "220px" },
        ElementLiAdaptiveStyles: {
            ...ElementLi,
            ...Wrapper,
            width: "100%",
            marginLeft: "0px",
            alignItems: "center",
            borderBottom: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
            justifyItems: "center",
        },
        FollowButtonWidth: "150px",
        AdaptiveElementUl: {
            ...ElementUl,
            width: "100vw",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        },
        AdaptiveTextWrapper:{ ...TextWrapper}
    };

    const smStyles = {
        PaperAdaptiveStyles: { ...PaperStyles, width: "220px" },
        ElementLiAdaptiveStyles: {
            ...ElementLi,
            ...Wrapper,
            width: "98%",
            marginLeft: "140px",
            alignItems: "center",
            borderBottom: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
            justifyItems: "center",
        },
        FollowButtonWidth: "150px",
        AdaptiveElementUl: {
            ...ElementUl,
            width: "77.5%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        },
        AdaptiveTextWrapper:{ ...TextWrapper, flexDirection: "row" }
    };

    const mdStyles = {
        PaperAdaptiveStyles: { ...PaperStyles, width: "220px" },
        ElementLiAdaptiveStyles: {
            ...ElementLi,
            ...Wrapper,
            width: "98%",
            marginLeft: "10px",
            alignItems: "center",
            borderBottom: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
            justifyItems: "center",
        },
        FollowButtonWidth: "200px",
        AdaptiveElementUl: {
            ...ElementUl,
            width: "98.5%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        },
        AdaptiveTextWrapper:{ ...TextWrapper, flexDirection: "row" }
    };

    const lgStyles = {
        PaperAdaptiveStyles: { ...PaperStyles },
        ElementLiAdaptiveStyles: {
            ...ElementLi,
            ...Wrapper,
            width: "98%",
            marginLeft: "10px",
            alignItems: "center",
            borderBottom: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
            justifyItems: "center",
        },
        FollowButtonWidth: "100px",
        AdaptiveElementUl: {
            ...ElementUl,
            width: "98.5%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        },
        AdaptiveTextWrapper:{ ...TextWrapper, flexDirection: "row" }
    };

    const xlStyles = {
        PaperAdaptiveStyles: { ...PaperStyles },
        ElementLiAdaptiveStyles: {
            ...ElementLi,
            ...Wrapper,
            width: "98%",
            marginLeft: "10px",
            alignItems: "center",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            border: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
            justifyItems: "center",
        },
        FollowButtonWidth: "100px",
        AdaptiveElementUl: {
            ...ElementUl,
            width: "98.5%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        },
        AdaptiveTextWrapper:{ ...TextWrapper, flexDirection: "row" }
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
        <div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            width:"100%",
        }}>
            <div style={{ width: "580px", paddingRight: "40px" }}>
                <Search/>
            </div>
            {isLoading ? <CircularProgress sx={{ marginTop: "20%",  }}/>  : <div style={{ marginTop: "30px", width:"100%" }}>
                {mostPopularPeople.length > 0 ?
                    <ul style={styles.AdaptiveElementUl}>
                        {transitions((style, user) => (
                            <animated.li key={user.userId} style={{
                                ...styles.ElementLiAdaptiveStyles,
                                ...style,
                            }}>
                                {user.profileImageLink ?
                                    <img src={user.profileImageLink}
                                         style={imgStyles}
                                         alt=""/> :
                                    <Avatar alt={user.username} style={{ width: "50px", height: "50px" }}
                                            src={user.avatar}/>}
                                <div style={styles.AdaptiveTextWrapper}>
                                    <Typography style={darkMode ? darkUserNameParagraph : userNameParagraph} onClick={() => {
                                        toAnotherUserPage(user.userId);
                                    }}>{user.name}
                                    </Typography>
                                    <Typography style={{ ...userNickParagraph,
                                        marginLeft: (styles === xsStyles || styles === xxsStyles)? "0" : "40px",
                                    }} onClick={() => {
                                        toAnotherUserPage(user.userId);
                                    }}>
                                        <Link style={darkMode ? darkUserNickLink : userNickLink}>@{user.username}</Link>
                                    </Typography>
                                </div>
                                {idUser == user.userId ? <Button disabled={true} sx={{
                                    ...StyledBlackButton,
                                    width: `${styles.FollowButtonWidth}`,
                                    height: "30px",
                                    marginTop: 0,
                                    color: "white",
                                    "&.Mui-disabled": {
                                        color: "white",
                                        opacity: 1,
                                        boxShadow: "0px 3px 1px -2px rgba(255,255,255,0.5), 0px 2px 2px 0px rgba(255,255,255,0.54), 0px 1px 5px 0px rgba(255,255,255,0.52)",
                                    },
                                }}>Me</Button> : <ToggleButton href="#" width={styles.FollowButtonWidth} height="30px"
                                                                searchId={`${user.userId}`}/>}
                            </animated.li>
                        ))}
                    </ul> : <Typography sx={emptyArrParagraph}>we have no ideas to show</Typography>
                }
            </div>}
        </div>
    );
}