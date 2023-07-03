import {
    UPDATE_USER_DATA_USERNAME,
    UPDATE_USER_PASSWORD,
    UPDATE_REMEMBER_ME_ACTION,
    SAVE_USER_TOKEN,
    OPEN_SIGN_UP_MODAL,
    SET_USER_ID,
    SET_POSTS,
    GET_USERS_SUCCESS,
    OPEN_LOGIN_MODAL,
    CLOSE_SIGN_UP_MODAL,
    CLOSE_LOGIN_MODAL,
    DELETE_USERS_SUCCESS,
    CHECK_EMAIL,
    SET_PAGE,
    SET_CLEAR_POSTS,
    SET_USER_POST,
    SET_SEARCH_ID,
    SET_SEARCH_DATA,
    SET_USER_DATA,
    ADD_EXPLORE_POSTS,
    ADD_REGISTRATION_POSTS,
    SET_PROFILE_POSTS,
    OPEN_EDIT_MODAL,
    CLOSE_EDIT_MODAL,
    SET_PROFILE_LIKE_POSTS,
    SET_PROFILE_REPOSTS,
    SET_USER_FOLLOW,
    SET_USER_UNFOLLOW,
    SET_SEARCH_USER_FOLLOW,
    SET_SEARCH_USER_UNFOLLOW,
    SET_USER_FOLLOWING,
    DELETE_MESSAGE_SUCCESS,
    GET_MESSAGE_SUCCESS, SET_INBOX, CLEAR_INBOX, SET_USER_MODE,
} from "./types";
import { apiUrl } from "../apiConfig";

export const setPage = (pageNumber) => ({
    type: SET_PAGE,
    payload: pageNumber,
});

export const setPageForMessage = (pageNumber) => ({
    type: "SET_PAGE_FOR_MESSAGING",
    payload: pageNumber,
});

export const setLike = (like) => {
    return {
        type: "SET_LIKE",
        payload: like,
    };
};

export const setComments = (comments) => {
    return {
        type: "SET_COMMENTS",
        payload: comments
    };
};

export const setCommentFromUser = (comment) => {
    return {
        type: "SET_COMMENT_FROM_USER",
        payload: comment
    };
};

export const setUserEmail = (userData) => ({
    type: UPDATE_USER_DATA_USERNAME,
    payload: userData,
});

export const setUserPassword = (userData) => ({
    type: UPDATE_USER_PASSWORD,
    payload: userData,
});

export const setRememberMeAction = () => ({
    type: UPDATE_REMEMBER_ME_ACTION,
});

export const setUserToken = (userToken) => ({
    type: SAVE_USER_TOKEN,
    payload: { userToken },
});

export const setUserId = (userId) => ({
    type: SET_USER_ID,
    payload: userId,
});
export const setSearchId = (userId) => ({
    type: SET_SEARCH_ID,
    payload: userId
});

export const setUserData = (data) => ({
    type: SET_USER_DATA,
    payload: {
        userName: data.username,
        name: data.name,
        date: new Date(data.createdDateTime).toDateString().slice(4),
        image: data.profileImageLink,
        background: data.profileBackgroundImageLink,
        followers: data.followers,
        followings: data.followings,
        address: data.address,
        birthday: data.dateOfBirth,
    }
});
export const setSearchData = (data) => ({
    type: SET_SEARCH_DATA,
    payload: {
        userName: data.username,
        name: data.name,
        date: new Date(data.createdDateTime).toDateString().slice(4),
        image: data.profileImageLink,
        background: data.profileBackgroundImageLink,
        followers: data.followers,
        followings: data.followings,
        address: data.address,
        birthday: data.dateOfBirth,
    }
});
export const openSignUpModal = () => ({
    type: OPEN_SIGN_UP_MODAL
});

export const closeLoginModal = () => ({
    type: CLOSE_LOGIN_MODAL
});
export const openLoginModal = () => ({
    type: OPEN_LOGIN_MODAL
});
export const closeSignUpModal = () => ({
    type: CLOSE_SIGN_UP_MODAL
});
export const openEditModal = () => ({
    type: OPEN_EDIT_MODAL
});
export const closeEditModal = () => ({
    type: CLOSE_EDIT_MODAL
});
export const GetUsersSuccess = (data) => ({
    type: GET_USERS_SUCCESS,
    payload: { users: data }
});
export const DeleteUsersSuccess = () => ({
    type: DELETE_USERS_SUCCESS
});
export const GetMessageSuccess = (data) => ({
    type: GET_MESSAGE_SUCCESS,
    payload: { message: data }
});
export const DeleteMessageSuccess = () => ({
    type: DELETE_MESSAGE_SUCCESS
});

export const setUserPostToPostsArr = (post) => ({
    type: SET_USER_POST,
    payload: post
});

export const setPosts = (posts) => ({
    type: SET_POSTS,
    payload: posts,
});

export const setMessages = (texts) => ({
    type: "SET_MESSAGES",
    payload: texts,
});

export const getMoreTexts = (texts) => ({
    type: "GET_MORE_TEXTS",
    payload: texts,
});

export const maxPages = (pages) => ({
    type: "SET_MAX_AMOUT_OF_PAGES_FOR_MESSAGING",
    payload: pages,
});

export const deleteExplorePost = (posts) => ({
    type: "SET_EXPLORE_POSTS_DELETE",
    payload: posts,
});

export const deleteHomeScreenPost = (posts) => ({
    type: "SET_POSTS_DELETE",
    payload: posts,
});

export const deleteRegistrationPagePostScreenPost = (posts) => ({
    type: "SET_REGISTRATION_POSTS_DELETE",
    payload: posts,
});

export const deleteProfilePost = (posts) => ({
    type: "SET_PROFILE_POSTS_DELETE",
    payload: posts,
});

export const deleteProfileLikePosts = (posts) => ({
    type: "SET_PROFILE_LIKE_POSTS_DELETE",
    payload: posts,
});

export const deleteProfileRepostsPosts = (posts) => ({
    type: "SET_PROFILE_REPOSTS_DELETE",
    payload: posts,
});










export const checkEmail = (email) => ({
    type: CHECK_EMAIL,
    payload: email
});
export const setUserPostsClear = (posts) => ({
    type: SET_CLEAR_POSTS, payload: posts
});

export const checkEmailFetch = (values, setErrors) => {
    return async (dispatch) => {
        try {
            console.log(values);
            const response = await fetch(`${apiUrl}/api/checkEmail`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" }
            });
            if (response.status === 302) {
                dispatch(setUserEmail(values));
            } else {
                setErrors({ email: "User doesn't exist, please check your email" });
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };
};

export const sendComments = (values, userId, postId) => {
    return async (dispatch) => {
        try {
            let userCommentResponse = await fetch(`${apiUrl}/api/comments`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                    commentText: values.comment,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let userCommentData = await userCommentResponse.json();
            dispatch(setCommentFromUser(userCommentData));
        } catch (error) {
            console.warn("Ошибка:", error);
        }
    };
};

export const getComments = (setIsLoadingComments, isCommentOpen, setIsCommentOpen, postId) => {
    return async (dispatch) => {
        try {
            setIsCommentOpen(!isCommentOpen);
            setIsLoadingComments(true);
            let commentsResponse = await fetch(`${apiUrl}/api/comments?postId=${postId}`);
            let dataComments = await commentsResponse.json();
            dispatch(setComments(dataComments));
        } catch (error) {
            console.log(err);
        } finally {
            setIsLoadingComments(false);
        }
    };
};


export const fetchLikes = (setLikesIsLoading, setUsersWhoLike, postId) => {
    return async (dispatch) => {
        try {
            setLikesIsLoading(true);
            let dataAboutUsersWhoLike = await fetch(`${apiUrl}/api/users/likes?postId=${postId}&page=0`);
            let usersWhoLike2 = await dataAboutUsersWhoLike.json();
            setUsersWhoLike(usersWhoLike2);
        } catch (error) {
            console.log(err);
        } finally {
            setLikesIsLoading(false);
        }
    };
};

export const activeLikesFetch = (postId, userId, setLike) => {
    return async (dispatch) => {
        try {
            const activeLikesResponse = await fetch(`${apiUrl}/api/likes/active?postId=${postId}&userId=${userId}`);
            const activeLikes = await activeLikesResponse.json();
            setLike(activeLikes);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };
};

export const sendRepostFetch = (postId, userId, isReposted, setRepostCountView, repostCountView, sendEventToWebsocket) => {
    return async (dispatch) => {
        if (isReposted) {
            setRepostCountView(repostCountView + 1);
            try {
                await fetch(`${apiUrl}/api/reposts`, {
                    method: "POST",
                    body: JSON.stringify({
                        postId: postId,
                        userId: userId,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                sendEventToWebsocket(userId, postId);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }

        } else if (!isReposted) {
            setRepostCountView(repostCountView - 1);
            try {
                await fetch(`${apiUrl}/api/reposts?postId=${postId}&userId=${userId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        }

    };
};

export const addLikeFetch = (postId, userId) => {
    return async (dispatch) => {
        try {
            await fetch(`${apiUrl}/api/likes`, {
                method: "POST",
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };
};

export const deleteLikeFetch = (postId, userId) => {
    return async (dispatch) => {
        try {
            await fetch(`${apiUrl}/api/likes?postId=${postId}&userId=${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };
};

export const fetchData = (userId) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/profile/${userId}`);
            const userData = await response.json();
            dispatch(setUserData(userData));
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };
};



export const checkPasswordFetch = (values, userDataState, setErrors) => {
    return async (dispatch) => {
        try {
            const userPassword = await fetch(`${apiUrl}/login`, {
                method: "POST",
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    rememberMe: userDataState.rememberMe
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (userPassword.ok) {
                const userToken = await userPassword.json();
                if (userDataState.rememberMe) {
                    dispatch(setUserToken(userToken));
                    localStorage.setItem("userToken", JSON.stringify(userToken));
                    dispatch(closeLoginModal());
                    dispatch(setUserEmail({ userEmail: "" }));
                } else {
                    dispatch(setUserToken(userToken));
                    sessionStorage.setItem("userToken", JSON.stringify(userToken));
                    dispatch(closeLoginModal());
                    dispatch(setUserEmail({ userEmail: "" }));
                }
            } else {
                setErrors({ password: "Wrong password" });
            }
        } catch (err) {
            setErrors({ password: "An error occurred, please try again" });
            console.error("Ошибка:", err);
        }

    };
};

export const PopularPeopleFetch = (setIsLoading, setMostPopularPeople) => {
    return async (dispatch) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${apiUrl}/api/users/popular?page=0`);
            const popularPeople = await response.json();
            setMostPopularPeople(popularPeople);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
};



export const changeDob = (userId, values) => {
    return async (dispatch) => {
        const response = await fetch(`${apiUrl}/api/change_dob`, {
            method: "POST",
            body: JSON.stringify({
                userId: userId,
                day: values.day,
                month: values.month,
                year: values.year,
            }),
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        dispatch(setUserBirthday(true));
        return data;
    };
};

export const fetchPostsByUserId = (userId, page) => {
    console.log(userId, "userIdFromActionFEtchByPosts");
    return async (dispatch) => {
        const response = await fetch(`${apiUrl}/api/posts?userId=${userId}&page=${page}`);
        const data = await response.json();
        let postIds = data.map(post => post.postId);
        await fetch(`${apiUrl}/api/post/view`, {
            method: "PUT",
            body: JSON.stringify(
                postIds
            ),
            headers: { "Content-Type": "application/json" }
        });
        dispatch(setPosts(data));
        return data;
    };
};

export const fetchPostsByPage = (page) => {
    return async (dispatch) => {
        const response = await fetch(`${apiUrl}/api/posts?page=${page}`);
        let posts = await response.json();
        let postIds = posts.map(post => post.postId);
        console.log(postIds);
        await fetch(`${apiUrl}/api/post/view`, {
            method: "PUT",
            body: JSON.stringify(
                postIds
            ),
            headers: { "Content-Type": "application/json" }
        });
        dispatch(addRegistrationPosts(posts));
    };
};

export const fetchTextsByPage = (inboxUid, userId, page) => {
    return async (dispatch) => {
        try {
            async function getData() {
                const response = await fetch(`${apiUrl}/api/getMessages?page=${page}`, {
                    method: "POST",
                    body: JSON.stringify({
                        inboxUid: inboxUid,
                        userId: userId,
                        // page: page,
                    }),
                    headers: { "Content-Type": "application/json" }
                });
                const response2 = await response.json();
                if (response2) {
                    dispatch(maxPages(10));
                    dispatch(setMessages(response2));
                    return response2;
                }
            }

            return getData();

        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    };
};

export const setUserBirthday = (flag) => {
    return {
        type: "SET_USER_BIRTHDAY",
        payload: flag,
    };
};

export const fetchExplorePosts = (userId, page) => {
    return async (dispatch) => {
        const response = await fetch(`${apiUrl}/api/posts/explorer?userId=${userId}&page=${page}`);
        let posts = await response.json();
        dispatch(addExplorePosts(posts));
        return posts;
    };
};

export const addExplorePosts = (posts) => ({
    type: ADD_EXPLORE_POSTS, payload: posts
});

export const addRegistrationPosts = (posts) => ({
    type: ADD_REGISTRATION_POSTS, payload: posts
});

export const sendEmailCheckRequest = (values) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/api/checkEmail`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            return response;
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    };
};

export const sendPost = (postObject, setSubmitting) => async (dispatch) => {
    try {
        const response = await fetch(`${apiUrl}/api/posts`, {
            method: "POST",
            body: JSON.stringify(postObject),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Failed to create post");
        }
        const userPost = await response.json();
        dispatch(setUserPostToPostsArr(userPost));
        setSubmitting(false);
        return userPost;
    } catch (error) {
        console.error("Error while sending the post:", error);
        throw error;
    }
};

export const addMessageFromWebsocket=(message)=>{
    return {
        type: "ADD_ONE_MESSAGE_FROM_WEBSOCKET",
        payload: message,
    }
}

export const setClickedInboxTrue = () => {
    return {
        type: 'SET_CLICK_INBOX_TRUE',
    }
}

export const setClickedInboxFalse = () => {
    return {
        type: 'SET_CLICK_INBOX_FALSE',
    }
}

export const setProfilePosts = (posts) => ({
    type: SET_PROFILE_POSTS,
    payload: posts
});
export const setProfileLikePosts = (posts) => ({
    type: SET_PROFILE_LIKE_POSTS,
    payload: posts
});
export const setProfileReposts = (posts) => ({
    type: SET_PROFILE_REPOSTS,
    payload: posts
});

export const setPageZero = () => {
    return {
        type: "SET_PAGE_ZERO"
    };
};

export const setPageZeroForMessaging = () => {
    return {
        type: "SET_PAGE_ZERO_FOR_MESSAGING"
    };
};

export const clearMessages = () => {
    return {
        type: "CLEAR_MESSAGES"
    };
};



export const userFollow = () => ({
    type: SET_USER_FOLLOW
});
export const userUnfollow = () => ({
    type: SET_USER_UNFOLLOW
});
export const userSearchFollow = () => ({
    type: SET_SEARCH_USER_FOLLOW
});
export const userSearchUnfollow = () => ({
    type: SET_SEARCH_USER_UNFOLLOW
});
export const userFollowing = (data) => ({
    type: SET_USER_FOLLOWING,
    payload: { following: data }
});
export const setInbox = (data) => ({
    type: SET_INBOX,
    payload: data
});
export const setUserMode = (data) => ({
    type: SET_USER_MODE,
    payload: data
});
