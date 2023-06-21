const initialState = {
    messages: [],
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
                messages: [...action.payload, ...state.messages],
            };
        case "CLEAR_MESSAGES":
            return {
                ...state,
                messages: [],
            };
        default:
            return state;
    }
};