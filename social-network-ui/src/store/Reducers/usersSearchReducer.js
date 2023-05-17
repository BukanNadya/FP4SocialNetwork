import {GET_USERS_SUCCESS} from "../types";

export function usersSearchReducer (state = {users: []}, action) {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            return {users: action.payload.users}
        default:
            return state
    }
}