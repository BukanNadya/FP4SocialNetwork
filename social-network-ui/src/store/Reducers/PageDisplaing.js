import { SET_PAGE } from "../types";

const initialState = {
    page:0
};

export function PageDisplaing(state = initialState, action) {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                page: action.payload,
            };
        default:
            return state;
    }
};
