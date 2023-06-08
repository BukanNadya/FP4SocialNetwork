import React, {useEffect} from "react";
import { Post } from "./Post";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import { PostDisplayingEmptyPostsText } from "./PostStyles";

export const PostsDisplaying = ({ userPosts, isLoading }) => {

    useEffect(()=>{
        console.log(userPosts, "userPosts")
    }, [])

    if (isLoading) {
        return <CircularProgress sx={{ marginTop: "20%" }}/>;
    } else if (userPosts.length === 0) {
        return <div style={PostDisplayingEmptyPostsText}>Here will be posts from your friends</div>;
    } else {
        return (
            userPosts.map((post) => (
                <Post key={post.postId} profileImage={post.profileImageLink}
                      userName={post.username}
                      name={post.name} text={post.writtenText}
                      photo={post.photoFileLink}
                      postComments={post.postCommentsCount}
                      dataTime={post.sentDateTime}
                      postId={post.postId}
                      postLikes={post.likesCount}
                      userIdWhoSendPost={post.userId}
                      reposted={post.isReposted}
                />
            ))

        )}
};

PostsDisplaying.propTypes = {
    userPosts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
};