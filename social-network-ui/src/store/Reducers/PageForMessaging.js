const initialState = {
    page: 0,
    maxAmountOfPages: 0,
};

export function PageForMessaging(state = initialState, action) {
    switch (action.type) {
        case 'SET_MAX_AMOUT_OF_PAGES_FOR_MESSAGING':
            return {
                ...state,
                maxAmountOfPages: action.payload,
            };
        case 'SET_PAGE_FOR_MESSAGING':
            return {
                ...state,
                page: action.payload,
            };
        case "SET_PAGE_ZERO_FOR_MESSAGING":
            return {
                ...state,
                page: 0,
            };
        default:
            return state;
    }
};
