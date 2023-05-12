import {SAVE_USER_TOKEN} from "../types"

const localStorageToken = JSON.parse(localStorage.getItem("userToken"));
const sessionStorageToken = JSON.parse(sessionStorage.getItem("userToken"));

const initialState = {
    userToken: localStorageToken || sessionStorageToken || false,
};

export function userTokenSaveReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER_TOKEN:
            return {
                userToken: action.payload.userToken,
            };
        default:
            return state;
    }
};