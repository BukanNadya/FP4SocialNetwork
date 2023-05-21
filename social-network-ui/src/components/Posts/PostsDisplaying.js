import React, { useEffect, useState } from "react";
import { Post } from "./Post";
import { setPosts, setUserId } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { decodeToken } from "./decodeToken";

export const PostsDisplaying = () => {
    const userPosts = useSelector(state => state.Posts.posts);
    const dispatch = useDispatch();
    const [isEnd, setIsEnd] = useState(false);
    const [page, setPage] = useState(0);

    const fetchPosts = async (page) => {
        const decodedToken = decodeToken();
        let data;
        if (decodedToken) {
            const userId = decodedToken.sub;
            dispatch(setUserId(userId));
            const response = await fetch(`http://localhost:8080/posts?userId=${userId}&page=${page}`);
            data = await response.json();
        } else {
            const response = await fetch(`http://localhost:8080/posts?page=${page}`);
            data = await response.json();
        }
        if (data.length === 0) {
            setIsEnd(true);
        } else {
            // Проверьте, используете ли вы setPosts или addPosts
            dispatch(setPosts(data));
        }
    };

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 20 && !isEnd) { // +20 - это произвольная "погрешность"
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        fetchPosts(page);
        console.log(page);
    }, [page]);

    return (
        <div onScroll={handleScroll} style={ localStorage.getItem("userToken") ? { height: "100vh" } : { height: "auto" } }>
            {userPosts.map((post) => (
                <Post key={post.postId} userName={post.username}
                      name={post.name} text={post.writtenText}
                      photo={post.photoFileByteArray}
                      postComments={post.postComments}
                      postLikes={post.postLikes}
                      dataTime={post.sentDateTime}
                      postId={post.postId}
                />
            ))}
        </div>
    );
};