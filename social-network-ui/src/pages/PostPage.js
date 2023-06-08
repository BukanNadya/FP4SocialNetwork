import React, { useEffect, useContext, useState, useCallback } from "react";
import { PostsDisplaying } from "../components/Posts/PostsDisplaying";
import { PostWrapper } from "./pagesStyles/HomeScreenStyles";


export function PostPage() {
    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPost([{
            isReposted: null,
            likesCount: 2,
            name: "Bohdan",
            photoFileByteArray: "",
            postCommentsCount: 1,
            postId: 11,
            profileImageByteArray: null,
            sentDateTime: "2023-06-06T16:25:37.858773",
            userId: 8,
            username: "Bohdan",
            writtenText: "Testik",
        }]);
    }, []);

    return (
        <div>
            <PostsDisplaying userPosts={post} isLoading={isLoading}/>
        </div>
    );
}