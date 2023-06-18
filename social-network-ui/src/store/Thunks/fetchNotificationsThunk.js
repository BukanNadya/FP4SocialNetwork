import {apiUrl} from "../../apiConfig";
import {userUnfollow} from "../actions";


export function fetchNotifications (searchId, data) {
    return (dispatch, getState) => {

        const state = getState()
        const userId = state.userData.userData.userId
        try {
            fetch(`${apiUrl}/api/notification`, {
                method: "POST",
                body: JSON.stringify({
                    userFollower: userId,
                    userFollowing: searchId,
                    receiveNotifications: `${data}`
                }),
                headers: {"Content-Type": "application/json"}
            })
                .then(r => {
                    if (!r.ok) {
                        console.log("error")
                    }
                })
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
}