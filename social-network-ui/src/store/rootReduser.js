import { combineReducers } from "redux";
import { stepModalReducer } from "./Reducers/stepModalReducer";
import { userDataLoginReducer } from "./Reducers/userDataLoginReducer";
import { loginPageReducer } from "./Reducers/loginPageReducer";
import { userTokenSaveReducer } from "./Reducers/userTokenReducer";
import { forgotPasswordReducer } from "./Reducers/forgotPasswordReducer";
import { usersSearchReducer } from "./Reducers/usersSearchReducer";
import { userDataReducer } from "./Reducers/userDataReducer";
import { PostReducer } from "./Reducers/PostsReducer";
import { PageDisplaing } from "./Reducers/PageDisplaing";
import { likeReducer } from "./Reducers/likeReducer";
import { CommentsReducer } from "./Reducers/CommentsReducer";
import { messageReducer } from "./Reducers/messageReducer";
import {messageSearchReducer} from "./Reducers/messageSearchReducer";
import { PageForMessaging } from "./Reducers/PageForMessaging";

const rootReducer = combineReducers({
    loginUserData: userDataLoginReducer,
    modal: loginPageReducer,
    stepModal: stepModalReducer,
    saveUserToken: userTokenSaveReducer,
    usersSearch: usersSearchReducer,
    messageSearch: messageSearchReducer,
    userData: userDataReducer,
    Posts: PostReducer,
    pageCount: PageDisplaing,
    isLikedPost: likeReducer,
    forgot: forgotPasswordReducer,
    comments: CommentsReducer,
    messages: messageReducer,
    pageCountMessage: PageForMessaging,
});

export default rootReducer;