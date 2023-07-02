import React, { useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow, differenceInDays, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import {
    Card,
    CardContent,
    Avatar,
    Typography,
    CardActions,
    IconButton,
    Paper,
    Box,
    Button,
    Tooltip, Menu, MenuItem, Dialog, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import { FavoriteBorder, ChatBubbleOutline, Repeat, Favorite } from "@mui/icons-material";
import { Comments } from "./Comments.js";
import BarChartIcon from "@mui/icons-material/BarChart";


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
    activeLikesFetch,
    addLikeFetch,
    deleteExplorePost,
    deleteHomeScreenPost,
    deleteLikeFetch, deleteProfileLikePosts, deleteProfilePost,
    deleteRegistrationPagePostScreenPost,
    fetchLikes,
    getComments,
    openLoginModal,
    sendRepost,
    sendRepostFetch,
    setSearchId,
    deleteProfileRepostsPosts
} from "../../store/actions";
import CircularProgress from "@mui/material/CircularProgress";
import { apiUrl } from "../../apiConfig";
import { UsersLikes } from "./UsersLikes";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import * as Yup from "yup";

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
                         sendEventToWebsocket,
                         viewCount,
                         handleLikesClick
                     }) => {
    const userId = useSelector(state => state.userData.userData.userId);
    const dispatch = useDispatch();
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [postCommentCount, setPostCommentCount] = useState(postComments);
    const comments = useSelector(state => state.comments.comments);
    const [like, setLike] = useState(false);
    const [likeArr, setLikeArr] = useState([]);
    const [isReposted, setIsReposted] = useState(reposted);
    const [likeCount, setLikeCount] = useState(postLikes);
    const [showLike, setShowLike] = useState(false);
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [repostCountView, setRepostCountView] = useState(repostsCount);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openWindow, setOpenWindow] = useState(false);
    const open = Boolean(anchorEl);
    const explorePosts = useSelector(state => state.Posts.explorePosts);
    const profilePosts = useSelector(state => state.Posts.profilePosts)
    const profileLikePosts = useSelector(state => state.Posts.profileLikePosts)
    const profileReposts = useSelector(state => state.Posts.profileReposts)
    const navigate = useNavigate();

    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.down("xxs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    const xxsStyles = {
        AdaptiveUserPhoto: {
            width: "100%",
        },
        AdaptivePostCard: {
            width: "100vw",
            maxWidth: "100vw",
            borderRadius: 0,
            mb: 1,
            margin: "0",
            padding: "0",
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)", position: "relative",
            overflowAnchor: "none"
        },
        AdaptiveUserPhotoWrapper: {
            maxWidth: "90vw",
            margin: "10px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        AdaptiveText: {
            display: "none",
        },
        AdaptiveSmallText: {
            ...PostText, padding: "0 20px", marginTop: "10px"
        }
    };

    const xsStyles = {
        AdaptiveUserPhoto: {
            width: "100%",
        },
        AdaptivePostCard: {
            width: "100vw",
            maxWidth: "100vw",
            borderRadius: 0,
            mb: 1,
            margin: "0",
            padding: "0",
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)", position: "relative",
            overflowAnchor: "none"
        },
        AdaptiveUserPhotoWrapper: {
            maxWidth: "90vw",
            margin: "10px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        AdaptiveText: {
            display: "none",
        },
        AdaptiveSmallText: {
            ...PostText, padding: "0 20px", marginTop: "10px"
        }
    };

    const smStyles = {
        AdaptiveUserPhoto: {
            width: "430px",
            marginRight: "130px",
        },
        AdaptivePostCard: {
            width: "470px",
            maxWidth: "100%",
            borderRadius: 0,
            mb: 1,
            margin: "0",
            padding: "0",
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)", position: "relative",
            overflowAnchor: "none"
        },
        AdaptiveUserPhotoWrapper: {
            maxWidth: "600px",
            width: "600px",
            margin: "10px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        AdaptiveText: {
            ...PostText
        },
        AdaptiveSmallText: {
            display: "none"
        }
    };

    const mdStyles = {
        AdaptiveUserPhoto: {
            width: "450px",
            margin: "0 auto"
        },
        AdaptivePostCard: {
            width: "600px",
            maxWidth: "100%",
            borderRadius: 0,
            mb: 1,
            margin: "0",
            padding: "0",
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)", position: "relative",
            overflowAnchor: "none"
        },
        AdaptiveUserPhotoWrapper: {
            maxWidth: "600px",
            width: "600px",
            margin: "10px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        AdaptiveText: {
            ...PostText
        },
        AdaptiveSmallText: {
            display: "none"
        }
    };

    const lgStyles = {
        AdaptiveUserPhoto: {
            width: "450px",
            margin: "0 auto"
        },
        AdaptivePostCard: {
            width: "600px",
            maxWidth: "100%",
            borderRadius: 0,
            mb: 1,
            margin: "0",
            padding: "0",
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)", position: "relative",
            overflowAnchor: "none"
        },
        AdaptiveUserPhotoWrapper: {
            maxWidth: "600px",
            width: "600px",
            margin: "10px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        AdaptiveText: {
            ...PostText
        },
        AdaptiveSmallText: {
            display: "none"
        }
    };

    const xlStyles = {
        AdaptiveUserPhoto: {
            width: "450px",
            margin: "0 auto"
        },
        AdaptivePostCard: {
            width: "600px",
            maxWidth: "100%",
            borderRadius: 0,
            mb: 1,
            margin: "0",
            padding: "0",
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)", position: "relative",
            overflowAnchor: "none"
        },
        AdaptiveUserPhotoWrapper: {
            maxWidth: "600px",
            width: "600px",
            margin: "10px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        AdaptiveText: {
            ...PostText
        },
        AdaptiveSmallText: {
            display: "none",
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

        } else {
            dispatch(openLoginModal());
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const validationSchema = Yup.object().shape({
        comment: Yup.string()
            .required("Please enter a comment").max(250, "Comment must be no longer than 250 characters")
    });


    useEffect(() => {
        if (showLike) {

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
            dispatch(sendRepostFetch(postId, userId, newIsReposted, setRepostCountView, repostCountView, sendEventToWebsocket));
        } else {
            dispatch(openLoginModal());
        }
    };

    const deletePost = async () => {
        const filterPostPredicate = (post) => post.postId !== postId;
        if(location.pathname === "/explore"){
            let filteredExplorePosts = explorePosts.filter(filterPostPredicate);
            dispatch(deleteExplorePost(filteredExplorePosts))
        }else if(location.pathname === "/profile"){
            let filteredProfilePosts = profilePosts.filter(filterPostPredicate);
            dispatch(deleteProfilePost(filteredProfilePosts))
            let filteredProfileLikePosts= profileLikePosts.filter(filterPostPredicate);
            dispatch(deleteProfileLikePosts(filteredProfileLikePosts))
            let filteredProfileReposts = profileReposts.filter(filterPostPredicate);
            dispatch(deleteProfileRepostsPosts(filteredProfileReposts))
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
                handleLikesClick(postId, userId);
            } else {
                if (likeCount === 0) {
                    setLikeCount(likeCount);
                } else {
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
        <Card sx={styles.AdaptivePostCard} data-testid={`postId_${postId}`}>
            <CardContent sx={CardContentPost}>
                {profileImage ? <img src={profileImage ? profileImage : ""}
                                     style={ProfileImgStyles} alt=""/> :
                    <Avatar alt={userName} src="#"/>}
                <div style={PostTextWrapper}>
                    <Typography variant="subtitle1" component="div"
                                sx={{...userNameParagraph, maxWidth:"300px"}}
                                onClick={() => toAnotherUserPage(userIdWhoSendPost)}>
                        {name} <span style={{ color: "#5b7083" }}>@{userName}</span> · {postDate()}
                    </Typography>
                    <div data-testid="user_post_text">
                        <Typography  variant="body1" component="div" mt={1} sx={styles.AdaptiveText}>{text}</Typography>
                    </div>
                </div>
            </CardContent>
            <Typography variant="body1" component="div" mt={1} sx={styles.AdaptiveSmallText}>{text}</Typography>
            {
                photo ? (<div style={styles.AdaptiveUserPhotoWrapper}>
                    <img src={photo ? photo : ""}
                         style={styles.AdaptiveUserPhoto} alt=""/>
                </div>) : null
            }

            {userIdWhoSendPost == userId ? <div style={{ position: "absolute", right: "30px",top:"20px", }}>
                <MoreVertOutlinedIcon
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                />
                <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {
                        setOpenWindow(true);
                        handleClose();
                    }}>Delete post</MenuItem>
                </Menu>
            </div> : null
            }
            <div>
                <Dialog
                    open={openWindow}
                    keepMounted
                    onClose={() => setOpenWindow(false)}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Do you want to delete this post?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            deletePost();
                            setOpenWindow(false);
                        }} color="primary">
                            Yes
                        </Button>
                        <Button onClick={() => setOpenWindow(false)} color="primary">
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
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
                        <BarChartIcon/>
                        <Typography variant="body2" sx={{ marginLeft: "5px" }}>{viewCount}</Typography>
                    </IconButton>
                </Tooltip>
                <Tooltip title={like ? "Undo like" : "Like"}>
                    <IconButton onClick={addLikeHandle}>
                        {like ? <Favorite fontSize="small" sx={{ color: "red" }} data-testid={"red_like_icon"}/> : <FavoriteBorder data-testid={"icon_button_add_like"} fontSize="small"/>}
                    </IconButton>
                </Tooltip>
                <Typography onClick={()=>{
                    navigate(`/likes/${postId}`)
                }} variant="body2" sx={userLikeCount}>{likeCount}</Typography>
            </CardActions>
            {isCommentOpen &&
                <Comments comments={comments} isLoadingComments={isLoadingComments}
                          setPostCommentCount={setPostCommentCount} postCommentCount={postCommentCount} postId={postId}
                          userIdWhoSendPost={userIdWhoSendPost}/>}
        </Card>
    );
};

Post.propTypes = {
    handleLikesClick: PropTypes.any,
    viewCount: PropTypes.any,
    sendEventToWebsocket: PropTypes.func,
    repostsCount: PropTypes.number,
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


