import { SAVE_USER_TOKEN } from "../types";

const localStorageToken = JSON.parse(localStorage.getItem("userToken"));
const sessionStorageToken = JSON.parse(sessionStorage.getItem("userToken"));
const parsedUrl = new URL(window.location.href);
console.log(parsedUrl)
const tokenUser = parsedUrl.searchParams.get("token");
if (tokenUser) {
    localStorage.setItem("userToken", JSON.stringify({ token: tokenUser }));
}
let userBirthday = parsedUrl.searchParams.get("birthday");
let userBirthdayCheck = userBirthday || true;


const initialState = {
    userToken: localStorageToken || sessionStorageToken || false,
    userBirthdayFlag: userBirthdayCheck,
};

export function userTokenSaveReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER_TOKEN:
            return {
                ...state,
                userToken: action.payload.userToken,
            };
        case "SET_USER_BIRTHDAY":
            return {
                ...state,
                userBirthdayFlag: action.payload,
            };
        default:
            return state;
    }
};