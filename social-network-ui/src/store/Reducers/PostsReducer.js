import { SET_POSTS, SET_USER_POST, SET_CLEAR_POSTS, ADD_EXPLORE_POSTS, ADD_REGISTRATION_POSTS } from "../types";

const initialState = {
    posts: [],
    explorePosts: [],
    registrationPagePosts: [],
};

export function PostReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POSTS:
            console.log("you are on home page");
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
            };
        case SET_CLEAR_POSTS:
            return {
                ...state,
                posts: action.payload,
            };
        case SET_USER_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            };
        case ADD_EXPLORE_POSTS:
            console.log(action.payload)
            return {
                ...state,
                explorePosts: [...state.explorePosts, ...action.payload],
            };
        case ADD_REGISTRATION_POSTS:
            console.log(action.payload)
            console.log("Alooha")
            return {
                ...state,
                registrationPagePosts: [...state.registrationPagePosts, ...action.payload],
            };
        default:
            return state;
    }
}
