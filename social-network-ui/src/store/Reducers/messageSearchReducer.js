import {DELETE_MESSAGE_SUCCESS, GET_MESSAGE_SUCCESS} from "../types";


export function messageSearchReducer (state = {message: []}, action) {
    switch (action.type) {
        case GET_MESSAGE_SUCCESS:
            return {message: action.payload.message}
        case DELETE_MESSAGE_SUCCESS:
            return {message: []}
        default:
            return state
    }
}