import { combineReducers } from "redux";

import { userDataReducer } from "./Reducers/userDataReducer";

const rootReducer = combineReducers({
    loginUserData: userDataReducer
});

export default rootReducer;