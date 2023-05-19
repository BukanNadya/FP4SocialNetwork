import {SET_USER_ID } from "../types";

const initialState = {
    userData: {
        userName: "",
        name: "",
        userId: "",
    }
};

export function userDataReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_ID:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    userId: action.payload,
                },
            };
        default:
            return state;
    }
};