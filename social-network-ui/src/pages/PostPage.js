import React, { useEffect, useContext, useState, useCallback } from "react";
import { PostsDisplaying } from "../components/Posts/PostsDisplaying";
import { PostWrapper } from "./pagesStyles/HomeScreenStyles";
import { useSelector } from "react-redux";
import { Post } from "../components/Posts/Post";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { apiUrl } from "../apiConfig";
export function PostPage() {
    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(state => state.userData.userData.userId);
    const { postId } = useParams();
    console.log(postId, "postId");

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                let postData = await fetch(`${apiUrl}/api/post/${postId}?userId=${userId}`);
                let postInform = await postData.json();
                setPost([postInform]);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, []);

    return (
        <div>
            <PostsDisplaying userPosts={post} isLoading={isLoading}/>
        </div>
    );
}

PostPage.propTypes = {
    props: PropTypes.object,
    match: PropTypes.object,
};