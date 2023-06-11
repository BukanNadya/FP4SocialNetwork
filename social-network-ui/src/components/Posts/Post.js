import React, { useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow, differenceInDays, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

import { Card, CardContent, Avatar, Typography, CardActions, IconButton, Paper, Box, Button , Tooltip} from "@mui/material";
import { FavoriteBorder, ChatBubbleOutline, Repeat, Favorite } from "@mui/icons-material";
import { Comments } from "./Comments.js";

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
                         reposted
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
            dispatch(sendRepostFetch(postId, userId, newIsReposted));
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

    const postDate = useMemo(() => {
        const date = new Date(dataTime);
        const diffDays = differenceInDays(new Date(), date);

        if (diffDays < 1) {
            return formatDistanceToNow(date, { addSuffix: true });
        } else if (diffDays < 365) {
            return format(date, "MMM d");
        } else {
            return format(date, "MMM d, yyyy");
        }
    }, [dataTime]);

    return (
        <Card sx={PostCard}>
            <CardContent sx={CardContentPost}>
                {profileImage ? <img src={profileImage ? profileImage : ""}
                                     style={ProfileImgStyles} alt=""/> :
                    <Avatar alt={userName} src="#"/>}
                <div style={PostTextWrapper}>
                    <Typography variant="subtitle1" component="div"
                                sx={userNameParagraph}
                                onClick={() => toAnotherUserPage(userIdWhoSendPost)}>
                        {name} <span style={{ color: "#5b7083" }}>@{userName}</span> · {postDate}
                    </Typography>
                    <Typography variant="body1" component="div" mt={1} sx={{ ...PostText }}>{text}</Typography>
                </div>
            </CardContent>
            {
                photo ? (<div style={UserPhotoWrapper}>
                    <img src={photo ? photo : ""}
                         style={UserPhoto} alt=""/>
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


