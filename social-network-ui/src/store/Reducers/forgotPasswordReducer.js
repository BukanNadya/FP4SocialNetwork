import {CHECK_EMAIL} from "../types";

export function forgotPasswordReducer (state = {}, action) {
    switch (action.type) {
        case CHECK_EMAIL:
            return {...state, forgotPasswordEmail: action.payload }
        default:
            return state
    }
}