import { SET_POSTS, SET_USER_POST, SET_CLEAR_POSTS } from "../types";

const initialState = {
    posts: [],
};

export function PostReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
            };
        case SET_CLEAR_POSTS:
            console.log(action.payload);
            return {
                ...state,
                posts: action.payload,
            };
        case SET_USER_POST:
            console.log(action.payload);
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        default:
            return state;
    }
};