import { combineReducers } from "redux";
import { stepModalReducer } from "./Reducers/stepModalReducer";
import { userDataReducer } from "./Reducers/userDataReducer";
import {loginPageReducer} from "./Reducers/loginPageReducer";
import { userTokenSaveReducer } from "./Reducers/userTokenReducer";
import {usersSearchReducer} from "./Reducers/usersSearchReducer";

const rootReducer = combineReducers({
    loginUserData: userDataReducer,
    modal: loginPageReducer,
    stepModal: stepModalReducer,
    saveUserToken: userTokenSaveReducer,
    usersSearch: usersSearchReducer
});

export default rootReducer;