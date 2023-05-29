import React, { useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow, differenceInDays, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent, Avatar, Typography, CardActions, IconButton } from "@mui/material";
import { FavoriteBorder, ChatBubbleOutline, Repeat, Favorite } from "@mui/icons-material";
import { Comments } from "./Comments.js";

import { PostCard, PostText, ShowMoreLinkStyles } from "./PostStyles";
import { openLoginModal, setComments } from "../../store/actions";

export const Post = ({ userName, name, photo, text, dataTime, postId, postLikes, postComments }) => {
    const userId = useSelector(state => state.userData.userData.userId);
    const dispatch = useDispatch();
    const [showMore, setShowMore] = useState(false);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [postCommentCount, setPostCommentCount] = useState(postComments);
    const comments = useSelector(state => state.comments.comments);
    const [like, setLike] = useState(false);
    const [likeArr, setLikeArr] = useState([]);
    const [isReposted, setIsReposted] = useState(false);
    const [likeCount, setLikeCount] = useState(postLikes);

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const activeLikesResponse = await fetch(`http://localhost:8080/likes/active?postId=${postId}&userId=${userId}`);
                    const activeLikes = await activeLikesResponse.json();
                    setLike(activeLikes);
                } catch (error) {
                    console.error("Ошибка при получении данных:", error);
                }
            }
        };
        fetchData();
    }, [userId, postId]);




    const  sendRepost = async () => {
        if (userId) {
            setIsReposted(true);
           await fetch(`http://localhost:8080/reposts`, {
                method: "POST",
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
        } else {
            dispatch(openLoginModal());
        }
    };

    const handleCommentToggle = async () => {
        if (userId) {
            setIsCommentOpen(!isCommentOpen);
            let commentsResponse = await fetch(`http://localhost:8080/comments?postId=${postId}`);
            let dataComments = await commentsResponse.json();
            dispatch(setComments(dataComments));

        } else {
            dispatch(openLoginModal());
        }
    };

    const addLikeHandle = useCallback(async () => {
        if (userId) {
            if (!like) {
                await fetch("http://localhost:8080/likes", {
                    method: "POST",
                    body: JSON.stringify({
                        postId: postId,
                        userId: userId,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setLikeCount(likeCount + 1);
                setLikeArr([...likeArr, { postId: postId, userId: userId }]);
            } else {
                await fetch(`http://localhost:8080/likes?postId=${postId}&userId=${userId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setLikeCount(likeCount - 1);
                setLikeArr(likeArr.filter(item => item.userId !== userId));
            }

            setLike(!like);
        } else {
            dispatch(openLoginModal());
        }
    }, [like, userId, postId, likeArr, dispatch]);

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

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
        // Все то же самое
    }, [dataTime]);

    const renderText = () => {
        const words = text.split(" ");
        if (showMore || words.length <= 10) {
            return text;
        } else {
            const truncatedWords = words.slice(0, 10);
            return truncatedWords.join(" ") + "...";
        }
    };

    return (
        <Card sx={PostCard}>
            <CardContent sx={{ display: "flex", paddingBottom: 0 }}>
                <Avatar alt={userName} src="#"/>
                <div style={{ marginLeft: 16, flex: 1 }}>
                    <Typography variant="subtitle1" component="div">
                        {name} <span style={{ color: "#5b7083" }}>@{userName}</span> · {postDate}
                    </Typography>
                    <Typography variant="body1" component="div" mt={1}
                                sx={{ ...PostText, maxHeight: showMore ? "none" : "90px", }}>{renderText()}
                    </Typography>
                    {text.split(" ").length > 10 && (
                        <a href="#" style={ShowMoreLinkStyles} onClick={handleShowMore}>
                            {showMore ? "hight text" : "see more"}
                        </a>
                    )}
                </div>
            </CardContent>
            {
                photo ? (<div style={{
                    maxWidth: "600px",
                    width: "600px",
                    margin: "10px auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <img src={photo ? `data:image/png;base64,${photo}` : ""}
                         style={{ width: "450px", margin: "0 auto" }} alt=""/>

                </div>) : null
            }
            <CardActions sx={{ padding: "20px 20px" }}>
                <IconButton onClick={handleCommentToggle}>
                    <ChatBubbleOutline fontSize="small"/>
                    <Typography variant="body2" sx={{ marginLeft: "5px" }}>{postCommentCount}</Typography>
                </IconButton>
                <IconButton onClick={sendRepost}>
                    <Repeat fontSize="small" htmlColor={isReposted ? "blue" : "inherit"} />
                </IconButton>
                <IconButton onClick={addLikeHandle}>
                    {like ? <Favorite fontSize="small" sx={{ color: "red" }}/> : <FavoriteBorder fontSize="small"/>}
                    <Typography variant="body2" sx={{ marginLeft: "5px" }}>{likeCount}</Typography>
                </IconButton>
            </CardActions>
            {isCommentOpen && <Comments comments={comments} postCommentCount={postCommentCount} setPostCommentCount={setPostCommentCount} postId={postId} userId={userId}/>}
        </Card>
    );
};

Post.propTypes = {
    postId: PropTypes.number,
    dataTime: PropTypes.string,
    userName: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.string,
    postComments: PropTypes.number,
    postLikes: PropTypes.number,
    text: PropTypes.string,
};


