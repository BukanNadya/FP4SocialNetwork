import React, { useEffect, useContext, useState, useCallback } from "react";
import { PostsDisplaying } from "../components/Posts/PostsDisplaying";
import { PostWrapper } from "./pagesStyles/HomeScreenStyles";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Posts/Post";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../apiConfig";
import { Box, Paper, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { EmptyLikesUserArrParagraph, LikeBox, LikesCircular, PostPaper } from "../components/Posts/PostStyles";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchLikes, openLoginModal, setSearchId } from "../store/actions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export function PostLikesPage() {
    const userId = useSelector(state => state.userData.userData.userId);
    const [likesIsLoading, setLikesIsLoading] = useState(false);
    const { postId } = useParams();
    console.log(postId, "postId");
    const [usersWhoLike, setUsersWhoLike] = useState([]);
    const dispatch = useDispatch();
    const [showLike, setShowLike] = useState(true);
    const navigate = useNavigate();
    const theme = useTheme();
    const darkMode = useSelector(state => state.userData.userMode.darkMode);

    const isXxs = useMediaQuery(theme.breakpoints.down("xxs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    useEffect(() => {
        dispatch(fetchLikes(setLikesIsLoading, setUsersWhoLike, postId));
    }, []);

    const toAnotherUserPage = (userIdWhoSendPost) => {
        if (userId) {
            dispatch(setSearchId(String(userIdWhoSendPost)));
            navigate("/view");
        } else {
            dispatch(openLoginModal());
        }
    };

    const xxsStyles = {
        AdaptiveListStyles: {
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    };

    const xsStyles = {
        AdaptiveListStyles: {
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    };

    const smStyles = {

        AdaptiveListStyles: {
            width: "470px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    };

    const mdStyles = {
        AdaptiveListStyles: {
            width: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    };

    const lgStyles = {
        AdaptiveListStyles: {
            width: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    };

    const xlStyles = {
        AdaptiveListStyles: {
            width: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }

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
        <List style={styles.AdaptiveListStyles}>
            {likesIsLoading ?
                <ListItem>
                    <CircularProgress />
                </ListItem> :
                showLike ?
                    usersWhoLike.length > 0 ?
                        usersWhoLike.map(user => (
                            <ListItem key={user.userId} onClick={() => toAnotherUserPage(user.userId)}
                                      style={darkMode ? {border: "1px solid rgb(56, 68, 77)"} : { borderBottom: '1px solid #ccc' }}>
                                <ListItemAvatar>
                                    <Avatar alt={user.username} src={user.profileImageUrl} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary= {user.name}
                                    secondary={`@${user.username} · Liked this post`}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        wordWrap: "break-word",
                                        overflowWrap: "anywhere",
                                        color: darkMode ? "rgb(247, 249, 249)" : "rgba(0, 0, 0, 0.6)",
                                        "& .MuiTypography-root": {color: darkMode ? "rgb(247, 249, 249)" : "rgba(0, 0, 0, 0.6)"}
                                    }}
                                />
                            </ListItem>
                        )) :
                        <ListItem>
                            <ListItemText primary="No likes yet! Be the first one." />
                        </ListItem>
                    : null
            }
        </List>
    );

}
