const initialState = {
    message: [],
};

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ITEM":
            return {
                ...state,
                message: action.payload,
            };
        default:
            return state;
    }
};