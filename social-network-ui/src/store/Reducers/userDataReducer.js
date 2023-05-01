import { UPDATE_USER_DATA_USERNAME, UPDATE_USER_PASSWORD, UPDATE_REMEMBER_ME_ACTION  } from "../types";

const initialState = {
    userData: {
        rememberMe: true,
    }
};

export function userDataReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_DATA_USERNAME:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    userName: action.payload.userName,
                },
            };
        case UPDATE_USER_PASSWORD:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    password: action.payload.password,
                },
            };
        case UPDATE_REMEMBER_ME_ACTION:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    rememberMe: !state.userData.rememberMe,
                },
            };
        default:
            return state;
    }
};