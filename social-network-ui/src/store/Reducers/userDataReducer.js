import {SET_USER_ID, SET_USER_DATA } from "../types";

const initialState = {
    userData: {
        userName: "",
        name: "",
        userId: null,
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
        case SET_USER_DATA:
            return {
                ...state,
                userData: {
                    userId: state.userData.userId,
                    userName: action.payload.userName,
                    name: action.payload.name,
                    date: action.payload.date,
                    image: action.payload.image,
                    background: action.payload.background,
                    followers: action.payload.followers,
                    followings: action.payload.followings,
                },
            };
        default:
            return state;
    }
};