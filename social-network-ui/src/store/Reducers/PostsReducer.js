import { SET_POSTS, SET_USER_POST, SET_CLEAR_POSTS, ADD_EXPLORE_POSTS, ADD_REGISTRATION_POSTS, SET_PROFILE_POSTS, SET_PROFILE_REPOSTS, SET_PROFILE_LIKE_POSTS } from "../types";

const initialState = {
    posts: [],
    explorePosts: [],
    registrationPagePosts: [],
    profilePosts: [],
    profileLikePosts: [],
    profileReposts: [],
};

export function PostReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
            };
        case SET_CLEAR_POSTS:
            return {
                ...state,
                posts:action.payload,
                explorePosts: action.payload,
                profilePosts: action.payload,
                profileLikePosts: action.payload,
                profileReposts: action.payload,
            };
        case SET_USER_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            };
        case ADD_EXPLORE_POSTS:
            return {
                ...state,
                explorePosts: [...state.explorePosts, ...action.payload],
            };
        case "SET_EXPLORE_POSTS_DELETE":
            return {
                ...state,
                explorePosts: action.payload,
            };
        case "SET_POSTS_DELETE":
            return {
                ...state,
                posts: action.payload,
            };
        case "SET_REGISTRATION_POSTS_DELETE":
            return {
                ...state,
                registrationPagePosts: action.payload,
            };
        case "SET_PROFILE_POSTS_DELETE":
            return {
                ...state,
                profilePosts: action.payload,
            };
        case "SET_PROFILE_LIKE_POSTS_DELETE":
            return {
                ...state,
                profileLikePosts: action.payload,
            };
        case "SET_PROFILE_REPOSTS_DELETE":
            return {
                ...state,
                profileReposts: action.payload,
            };
        case ADD_REGISTRATION_POSTS:
            return {
                ...state,
                registrationPagePosts: [...state.registrationPagePosts, ...action.payload],
            };
        case SET_PROFILE_POSTS:
            return {
                ...state,
                profilePosts: [...state.profilePosts, ...action.payload],
            };
        case SET_PROFILE_REPOSTS:
            return {
                ...state,
                profileReposts: [...state.profileReposts, ...action.payload],
            };
        case SET_PROFILE_LIKE_POSTS:
            return {
                ...state,
                profileLikePosts: [...state.profileLikePosts, ...action.payload],
            };
        default:
            return state;
    }
}
