import React from "react";
import { Post } from "./Post";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

export const PostsDisplaying = () => {
    const userPosts = useSelector(state => state.Posts.posts);
    return (
        userPosts.length === 0 ? (<CircularProgress sx={{ marginTop: "20%" }}/>) : (<div style={{ height: "100vh" }}>
            {userPosts.map((post) => (
                <Post key={post.postId} userName={post.username}
                      name={post.name} text={post.writtenText}
                      photo={post.photoFileByteArray}
                      postComments={post.postComments}
                      dataTime={post.sentDateTime}
                      postId={post.postId}
                      postLikes={post.likesCount}
                />
            ))}
        </div>)
    );
};