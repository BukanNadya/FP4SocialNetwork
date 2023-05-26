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
    SET_PAGE, SET_CLEAR_POSTS, SET_USER_POST,
    SET_USER_DATA
} from "./types";


export const setPage = (pageNumber) => ({
    type: SET_PAGE,
    payload: pageNumber,
});

export const setLike = (like) => {
    return {
        type: "SET_LIKE",
        payload: like,
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

export const setUserData = (data) => ({
    type: SET_USER_DATA,
    payload: {
        userName: data.username,
        name: data.name,
        date: new Date(data.createdDateTime).toDateString().slice(4),
        image: data.profileImageByteArray,
        background: data.profileBackgroundImageByteArray,
        followers: data.followers,
        followings: data.followings,
    }
})
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
export const GetUsersSuccess = (data) => ({
    type: GET_USERS_SUCCESS,
    payload: { users: data.search }
});
export const DeleteUsersSuccess = () => ({
    type: DELETE_USERS_SUCCESS
});

export const setUserPostToPostsArr = (post) => ({
    type: SET_USER_POST,
    payload: post
});

export const setPosts = (posts) => ({
    type: SET_POSTS,
    payload: posts,
});

export const checkEmail = (data) => ({
    type: CHECK_EMAIL,
    payload: data
})
export const setUserPostsClear = (posts) => ({
    type: SET_CLEAR_POSTS, payload: posts
});

export const fetchPostsByUserId = (userId, page) => {
        return async (dispatch) => {
            const response = await fetch(`http://localhost:8080/posts?userId=${userId}&page=${page}`);
            return await response.json();
        }
};

export const fetchPostsByPage = (page) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8080/posts?page=${page}`);
        return await response.json();
    };
};

export const sendEmailCheckRequest = (values) => {
    return async (dispatch) => {
        try {
            const response = await fetch("http://localhost:8080/checkEmail", {
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
        const response = await fetch("http://localhost:8080/posts", {
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
}


