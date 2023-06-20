import React, { useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow, differenceInDays, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import { Card, CardContent, Avatar, Typography, CardActions, IconButton, Paper, Box, Button , Tooltip} from "@mui/material";
import { FavoriteBorder, ChatBubbleOutline, Repeat, Favorite } from "@mui/icons-material";
import { Comments } from "./Comments.js";
import BarChartIcon from '@mui/icons-material/BarChart';

import {
    PostCard,
    PostText,
    PostTextWrapper,
    ProfileImgStyles,
    ShowMoreLinkStyles,
    userLikeCount,
    userNameParagraph,
    UserPhoto,
    UserPhotoWrapper,
    PostPaper,
    LikesCircular,
    LikeBox,
    CardContentPost,
    EmptyLikesUserArrParagraph
} from "./PostStyles";
import {
    activeLikesFetch, addLikeFetch, deleteLikeFetch,
    fetchLikes,
    getComments,
    openLoginModal,
    sendRepost, sendRepostFetch,
    setSearchId,
} from "../../store/actions";
import CircularProgress from "@mui/material/CircularProgress";
import { apiUrl } from "../../apiConfig";
import { UsersLikes } from "./UsersLikes";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



export const Post = ({
                         userName,
                         name,
                         photo,
                         text,
                         dataTime,
                         postId,
                         postLikes,
                         postComments,
                         userIdWhoSendPost,
                         profileImage,
                         reposted,
                         repostsCount,
                         sendEventToWebsocket
                     }) => {
    const userId = useSelector(state => state.userData.userData.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [postCommentCount, setPostCommentCount] = useState(postComments);
    const comments = useSelector(state => state.comments.comments);
    const [like, setLike] = useState(false);
    const [likeArr, setLikeArr] = useState([]);
    const [isReposted, setIsReposted] = useState(reposted);
    const [likeCount, setLikeCount] = useState(postLikes);
    const [showLike, setShowLike] = useState(false);
    const [usersWhoLike, setUsersWhoLike] = useState([]);
    const [likesIsLoading, setLikesIsLoading] = useState(false);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const[repostCountView, setRepostCountView] = useState(repostsCount)

    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.down("xxs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    const xxsStyles = {
        AdaptiveUserPhoto:{
            width: "100%",
        },
        AdaptivePostCard:{    width: "100vw",
            maxWidth: "100vw",
            borderRadius: 0,
            mb: 1,
            margin: "0",
            padding: "0",
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)", position: "relative",
            overflowAnchor: "none"
        },
        AdaptiveUserPhotoWrapper:{
            maxWidth: "90vw",
            margin: "10px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        AdaptiveText:{
            display:"none",
        },
        AdaptiveSmallText:{
            ...PostText, padding:"0 20px", marginTop:"10px"
        }
    };

    const xsStyles = {
        AdaptiveUserPhoto:{
            width: "100%",
        },
        AdaptivePostCard:{    width: "100vw",
            maxWidth: "100vw",
            borderRadius: 0,
            mb: 1,
            margin: "0",
            padding: "0",
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)", position: "relative",
            overflowAnchor: "none"
        },
        AdaptiveUserPhotoWrapper:{
            maxWidth: "90vw",
            margin: "10px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        AdaptiveText:{
            display:"none",
        },
        AdaptiveSmallText:{
            ...PostText, padding:"0 20px",  marginTop:"10px"
        }
    };

    const smStyles = {
        AdaptiveUserPhoto:{
            width: "430px",
            marginRight:"130px",
        },
        AdaptivePostCard:{    width: "470px",
            maxWidth: "100%",
            borderRadius: 0,
            mb: 1,
            margin: "0",
            padding: "0",
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)", position: "relative",
            overflowAnchor: "none"
        },
        AdaptiveUserPhotoWrapper:{
            maxWidth: "600px",
            width: "600px",
            margin: "10px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        AdaptiveText:{
            ...PostText
        },
        AdaptiveSmallText:{
            display:"none"
        }
    };

    const mdStyles = {
        AdaptiveUserPhoto:{
            width: "450px",
            margin: "0 auto"
        },
        AdaptivePostCard:{    width: "600px",
            maxWidth: "100%",
            borderRadius: 0,
            mb: 1,
            margin: "0",
            padding: "0",
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)", position: "relative",
            overflowAnchor: "none"
        },
        AdaptiveUserPhotoWrapper:{
            maxWidth: "600px",
            width: "600px",
            margin: "10px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        AdaptiveText:{
            ...PostText
        },
        AdaptiveSmallText:{
            display:"none"
        }
    };

    const lgStyles = {
        AdaptiveUserPhoto:{
            width: "450px",
            margin: "0 auto"
        },
        AdaptivePostCard:{    width: "600px",
            maxWidth: "100%",
            borderRadius: 0,
            mb: 1,
            margin: "0",
            padding: "0",
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)", position: "relative",
            overflowAnchor: "none"
        },
        AdaptiveUserPhotoWrapper:{
            maxWidth: "600px",
            width: "600px",
            margin: "10px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        AdaptiveText:{
            ...PostText
        },
        AdaptiveSmallText:{
            display:"none"
        }
    };

    const xlStyles = {
        AdaptiveUserPhoto:{
            width: "450px",
            margin: "0 auto"
        },
        AdaptivePostCard:{    width: "600px",
            maxWidth: "100%",
            borderRadius: 0,
            mb: 1,
            margin: "0",
            padding: "0",
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)", position: "relative",
            overflowAnchor: "none"
        },
        AdaptiveUserPhotoWrapper:{
            maxWidth: "600px",
            width: "600px",
            margin: "10px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        AdaptiveText:{
              ...PostText
        },
        AdaptiveSmallText:{
            display:"none",
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

    const ShowUsersWhoLike = async () => {
        if (userId) {
            setShowLike(!showLike);
        } else {
            dispatch(openLoginModal());
        }
    };

    useEffect(() => {
        if (showLike) {
            dispatch(fetchLikes(setLikesIsLoading, setUsersWhoLike, postId));
        }
    }, [showLike, dispatch, postId]);

    useEffect(() => {
        if (userId) {
            dispatch(activeLikesFetch(postId, userId, setLike));
        }
    }, []);

    const toAnotherUserPage = (userIdWhoSendPost) => {
        if (userId) {
            dispatch(setSearchId(String(userIdWhoSendPost)));
            navigate("/view");
        } else {
            dispatch(openLoginModal());
        }
    };

    const sendRepost = async () => {
        if (userId) {
            const newIsReposted = !isReposted;
            setIsReposted(newIsReposted);
            dispatch(sendRepostFetch(postId, userId, newIsReposted, setRepostCountView, repostCountView,  sendEventToWebsocket));
        } else {
            dispatch(openLoginModal());
        }
    };

    const handleCommentToggle = async () => {
        if (userId) {
            dispatch(getComments(setIsLoadingComments, isCommentOpen, setIsCommentOpen, postId));
        } else {
            dispatch(openLoginModal());
        }
    };

    const addLikeHandle = useCallback(async () => {
        if (userId) {
            setLike(!like);
            if (!like) {
                setLikeCount(likeCount + 1);
                setLikeArr([...likeArr, { postId: postId, userId: userId }]);
                await dispatch(addLikeFetch(postId, userId));
            } else {
                if(likeCount===0){
                    setLikeCount(likeCount);
                }else{
                    setLikeCount(likeCount - 1);
                }
                setLikeArr(likeArr.filter(item => item.userId !== userId));
                dispatch(deleteLikeFetch(postId, userId));
            }
        } else {
            dispatch(openLoginModal());
        }
    }, [like, userId, postId, likeArr, dispatch]);

    const postDate = () => {
        const date = new Date(dataTime);
        const diffDays = differenceInDays(new Date(), date);

        if (diffDays < 1) {
            return formatDistanceToNow(date, { addSuffix: true });
        } else if (diffDays < 365) {
            return format(date, "MMM d");
        } else {
            return format(date, "MMM d, yyyy");
        }
    };

    return (
        <Card sx={styles.AdaptivePostCard}>
            <CardContent sx={CardContentPost}>
                {profileImage ? <img src={profileImage ? profileImage : ""}
                                     style={ProfileImgStyles} alt=""/> :
                    <Avatar alt={userName} src="#"/>}
                <div style={PostTextWrapper}>
                    <Typography variant="subtitle1" component="div"
                                sx={userNameParagraph}
                                onClick={() => toAnotherUserPage(userIdWhoSendPost)}>
                        {name} <span style={{ color: "#5b7083" }}>@{userName}</span> · {postDate()}
                    </Typography>
                    <Typography variant="body1" component="div" mt={1} sx={ styles.AdaptiveText}>{text}</Typography>
                </div>
            </CardContent>
            <Typography variant="body1" component="div" mt={1} sx={styles.AdaptiveSmallText}>{text}</Typography>
            {
                photo ? (<div style={styles.AdaptiveUserPhotoWrapper}>
                    <img src={photo ? photo : ""}
                         style={styles.AdaptiveUserPhoto} alt=""/>
                </div>) : null
            }
            <CardActions sx={{ padding: "20px 20px" }}>
                <Tooltip title={"See comments"}>
                <IconButton onClick={handleCommentToggle}>
                    <ChatBubbleOutline fontSize="small"/>
                    <Typography variant="body2" sx={{ marginLeft: "5px" }}>{postCommentCount}</Typography>
                </IconButton>
                </Tooltip>
                <Tooltip title={isReposted ? "Undo repost" : "Repost"}>
                <IconButton onClick={sendRepost}>
                    <Repeat fontSize="small" htmlColor={isReposted ? "rgb(0, 186, 124)" : "inherit"}/>
                    <Typography variant="body2" sx={{ marginLeft: "5px" }}>{repostCountView}</Typography>
                </IconButton>
                </Tooltip>
                <Tooltip title={"Views"}>
                    <IconButton>
                        <BarChartIcon></BarChartIcon>
                    </IconButton>
                </Tooltip>
                <Tooltip title={like ? "Undo like" : "Like"}>
                <IconButton onClick={addLikeHandle}>
                    {like ? <Favorite fontSize="small" sx={{ color: "red" }}/> : <FavoriteBorder fontSize="small"/>}
                </IconButton>
                </Tooltip>
                <Typography onClick={ShowUsersWhoLike} variant="body2" sx={userLikeCount}>{likeCount}</Typography>
                <UsersLikes showLike={showLike} likesIsLoading={likesIsLoading} usersWhoLike={usersWhoLike}
                            toAnotherUserPage={toAnotherUserPage}/>
            </CardActions>
            {isCommentOpen &&
                <Comments comments={comments} isLoadingComments={isLoadingComments} postCommentCount={postCommentCount}
                          setPostCommentCount={setPostCommentCount} postId={postId} userId={userId}/>}
        </Card>
    );
};

Post.propTypes = {
    sendEventToWebsocket:PropTypes.func,
    repostsCount:PropTypes.number,
    reposted: PropTypes.bool,
    profileImage: PropTypes.string,
    postId: PropTypes.number,
    dataTime: PropTypes.string,
    userName: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.string,
    postComments: PropTypes.number,
    postLikes: PropTypes.number,
    text: PropTypes.string,
    userIdWhoSendPost: PropTypes.number,
    scrollPosition: PropTypes.string,
};


