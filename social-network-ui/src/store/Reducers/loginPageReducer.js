import {CLOSE_LOGIN_MODAL, CLOSE_SIGN_UP_MODAL, OPEN_LOGIN_MODAL, OPEN_SIGN_UP_MODAL, OPEN_EDIT_MODAL, CLOSE_EDIT_MODAL} from "../types";


export function loginPageReducer (state = {isLoginModal: false, isSignUpModal: false, isEditModal: false}, action) {
    switch (action.type) {
        case OPEN_LOGIN_MODAL:
            return {...state, isLoginModal: true}
        case CLOSE_LOGIN_MODAL:
            return {...state, isLoginModal: false}
        case OPEN_SIGN_UP_MODAL:
            return {...state, isSignUpModal: true}
        case CLOSE_SIGN_UP_MODAL:
            return {...state, isSignUpModal: false}
        case OPEN_EDIT_MODAL:
            return {...state, isEditModal: true}
        case CLOSE_EDIT_MODAL:
            return {...state, isEditModal: false}
        default:
            return state
    }
}