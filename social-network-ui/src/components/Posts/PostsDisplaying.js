import React from "react";
import { Post } from "./Post";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import { PostDisplayingEmptyPostsText } from "./PostStyles";
import { useTransition, animated } from 'react-spring';

export const PostsDisplaying = ({ userPosts, isLoading }) => {
    const transitions = useTransition(userPosts, {
        from: { opacity: 0, transform: 'translate3d(0,50%,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0%,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,50%,0)' },
        keys: post => post.postId,
        config: { duration: 600, delay: 200 },
    });

    if (isLoading) {
        return <CircularProgress sx={{ marginTop: "20%" }}/>;
    } else if (userPosts.length === 0) {
        return <div style={PostDisplayingEmptyPostsText}>Here will be posts from your friends</div>;
    } else {
        return (
            <>
                {transitions((style, item) => (
                    <animated.div style={style} key={item.postId}>
                        <Post
                            profileImage={item.profileImageLink}
                            userName={item.username}
                            name={item.name}
                            text={item.writtenText}
                            photo={item.photoFileLink}
                            postComments={item.postCommentsCount}
                            dataTime={item.sentDateTime}
                            postId={item.postId}
                            postLikes={item.likesCount}
                            userIdWhoSendPost={item.userId}
                            reposted={item.isReposted}
                        />
                    </animated.div>
                ))}
            </>
        )}
};

PostsDisplaying.propTypes = {
    userPosts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
};