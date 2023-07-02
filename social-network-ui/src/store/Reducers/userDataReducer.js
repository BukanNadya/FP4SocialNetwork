import {SET_USER_ID, SET_USER_DATA, SET_SEARCH_ID, SET_SEARCH_DATA, SET_USER_FOLLOW, SET_USER_UNFOLLOW, SET_SEARCH_USER_FOLLOW, SET_SEARCH_USER_UNFOLLOW, SET_USER_FOLLOWING, SET_USER_MODE } from "../types";

const initialState = {
    userData: {
        userName: "",
        name: "",
        userId: null,
    },
    searchData: {
        userId: null,
    },
    followData: {
        userFollow: false,
    },
    userFollowing: {
        following: [],
    },
    userMode: {
        darkMode: false
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
                    address: action.payload.address,
                    birthday: action.payload.birthday,
                },
            };
        case SET_SEARCH_ID:
            return {
                ...state,
                searchData: {
                    userId: action.payload,
                },
            };
        case SET_SEARCH_DATA:
            return {
                ...state,
                searchData: {
                    userId: state.searchData.userId,
                    userName: action.payload.userName,
                    name: action.payload.name,
                    date: action.payload.date,
                    image: action.payload.image,
                    background: action.payload.background,
                    followers: action.payload.followers,
                    followings: action.payload.followings,
                    address: action.payload.address,
                    birthday: action.payload.birthday,
                },
            };
        case SET_SEARCH_USER_FOLLOW:
            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    followers: state.searchData.followers +1,
                },
            };
        case SET_SEARCH_USER_UNFOLLOW:
            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    followers: state.searchData.followers -1,
                },
            };
        case SET_USER_FOLLOW:
            return {
                ...state,
                followData: {
                    userFollow: true,
                },
            };
        case SET_USER_UNFOLLOW:
            return {
                ...state,
                followData: {
                    userFollow: false,
                },
            };
        case SET_USER_FOLLOWING:
            return {
                ...state,
                userFollowing: {
                    following: action.payload.following,
                },
            };
        case SET_USER_MODE:
            return {
                ...state,
                userMode: {
                    darkMode: action.payload,
                },
            };
        default:
            return state;
    }
};