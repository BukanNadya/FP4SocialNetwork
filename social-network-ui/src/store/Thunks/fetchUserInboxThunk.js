import {apiUrl} from "../../apiConfig";
import {setInbox} from "../actions";



export function fetchUserInbox (searchId) {
    return (dispatch, getState) => {

        const state = getState()
        const userId = state.userData.userData.userId
        try {
            fetch(`${apiUrl}/api/addInbox`, {
                method: "POST",
                body: JSON.stringify({
                    inboxUid: `${searchId}`,
                    userId: `${userId}`,
                }),
                headers: {"Content-Type": "application/json"}
            })
                .then(r => r.json())
                .then(data => dispatch(setInbox(data)))

        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
}