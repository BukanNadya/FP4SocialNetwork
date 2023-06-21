const initialState = {
    click: false,
};

export function inboxClickReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CLICK_INBOX_FALSE':
            return {
                ...state,
                click: false,
            };
        case 'SET_CLICK_INBOX_TRUE':
            return {
                ...state,
                click: true,
            };
        default:
            return state;
    }
};
