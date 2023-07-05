

const initialState = {
    notificationsCount:0,
};

export const NotificationCount = (state = initialState, action) => {
    switch (action.type) {
        case "SET_NOTIFICATIONS_COUNT":
            return {
                ...state,
                notificationsCount: action.payload,
            };
        default:
            return state;
    }
};