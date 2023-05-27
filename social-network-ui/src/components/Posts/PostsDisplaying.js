import React from "react";
import { Post } from "./Post";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

export const PostsDisplaying = ({userPosts, isLoading}) => {
    if (isLoading) {
        return <CircularProgress sx={{ marginTop: "20%" }}/>
    } else if (userPosts.length === 0) {
        return <div>Here will be posts from your friends</div>
    } else {
        return (
            <div style={{ height: "100vh" }}>
                {userPosts.map((post) => (
                    <Post key={post.postId} userName={post.username}
                          name={post.name} text={post.writtenText}
                          photo={post.photoFileByteArray}
                          postComments={post.postCommentsCount}
                          dataTime={post.sentDateTime}
                          postId={post.postId}
                          postLikes={post.likesCount}
                    />
                ))}
            </div>
        );
    }
};

PostsDisplaying.propTypes = {
    userPosts: PropTypes.array.isRequired,
    isLoading:PropTypes.bool,
 }