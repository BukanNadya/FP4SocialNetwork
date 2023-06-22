import {SET_INBOX} from "../types";
const initialState = {
    messages: [],
    inbox: [],
};

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_MESSAGES":
            console.log(action.payload);
            return {
                ...state,
                messages: [...state.messages, ...action.payload],
            };
        case "ADD_ONE_MESSAGE_FROM_WEBSOCKET":
            return {
                ...state,
                messages: [{...action.payload}, ...state.messages],
            };
        case "CLEAR_MESSAGES":
            return {
                ...state,
                messages: [],
            };
        case SET_INBOX:
            return {
                ...state,
                inbox: [action.payload],
            };
        default:
            return state;
    }
};