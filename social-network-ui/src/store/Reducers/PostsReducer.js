import { SET_POSTS } from "../types";

const initialState = {
    posts:[]
};

export function PostReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POSTS:
            console.log(action.payload)
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
            };
        default:
            return state;
    }
};