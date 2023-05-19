import { UPDATE_USER_DATA_USERNAME, UPDATE_USER_PASSWORD, UPDATE_REMEMBER_ME_ACTION  } from "../types";

const initialState = {
    userLoginData: {
        rememberMe: true,
    }
};

export function userDataLoginReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_DATA_USERNAME:
            return {
                ...state,
                userLoginData: {
                    ...state.userLoginData,
                    email: action.payload.email,
                },
            };
        case UPDATE_USER_PASSWORD:
            return {
                ...state,
                userLoginData: {
                    ...state.userLoginData,
                    password: action.payload.password,
                },
            };
        case UPDATE_REMEMBER_ME_ACTION:
            return {
                ...state,
                userLoginData: {
                    ...state.userLoginData,
                    rememberMe: !state.userLoginData.rememberMe,
                },
            };
        default:
            return state;
    }
}