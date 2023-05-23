

const initialState = {
    like:false,
};

export const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LIKE":
            return {
                ...state,
                like: action.payload,
            };
        default:
            return state;
    }
};