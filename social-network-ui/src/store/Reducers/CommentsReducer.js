
const initialState = {
    comments:[],
};

export const CommentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_COMMENTS":
            return {
                ...state,
                comments: action.payload,
            };
        case "SET_COMMENT_FROM_USER":
            return {
                ...state,
                comments: [...state.comments, action.payload],
            };
        default:
            return state;
    }
};