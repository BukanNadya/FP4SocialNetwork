import { combineReducers } from "redux";

import { userDataReducer } from "./Reducers/userDataReducer";
import {loginPageReducer} from "./Reducers/loginPageReducer";

const rootReducer = combineReducers({
    loginUserData: userDataReducer,
    modal: loginPageReducer
});

export default rootReducer;