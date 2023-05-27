import React, { useEffect, useContext, useState } from "react";
import { PostsDisplaying } from "../components/Posts/PostsDisplaying";
import {
    fetchExplorePosts, setPage,
} from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { ScrollContext } from "../components/Layout.js";

export function Explore() {
    const explorePosts = useSelector(state => state.Posts.explorePosts);
    const page = useSelector(state => state.pageCount.page);
    const { handleParentScroll } = useContext(ScrollContext);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getPosts() {
            try {
                setIsLoading(true);
                await dispatch(fetchExplorePosts(page));
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        if (explorePosts.length === 0) {
            setIsLoading(true);
            getPosts();
        }
    }, []);

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 20) {
            const page2 = page + 1;
            dispatch(setPage(page2));
            dispatch(fetchExplorePosts(page2));
        }
        handleParentScroll(scrollTop, clientHeight, scrollHeight);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} onScroll={handleScroll}>
            <PostsDisplaying userPosts={explorePosts} isLoading={isLoading}/>
        </div>
    );
}