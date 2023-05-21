import {CLOSE_LOGIN_MODAL, CLOSE_SIGN_UP_MODAL, OPEN_LOGIN_MODAL, OPEN_SIGN_UP_MODAL} from "../types";


export function forgotPasswordReducer (state = {}, action) {
    switch (action.type) {
        case OPEN_LOGIN_MODAL:
            return {...state, isLoginModal: true}
        case CLOSE_LOGIN_MODAL:
            return {...state, isLoginModal: false}
        case OPEN_SIGN_UP_MODAL:
            return {...state, isSignUpModal: true}
        case CLOSE_SIGN_UP_MODAL:
            return {...state, isSignUpModal: false}
        default:
            return state
    }
}