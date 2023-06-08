
import {userFollow} from "../actions";
import {apiUrl} from "../../apiConfig";

export function fetchUnfollow (searchId) {
    return (dispatch, getState) => {

        const state = getState()
        const userId = state.userData.userData.userId

        try {
            fetch(`${apiUrl}/api/unfollow`, {
                method: "POST",
                body: JSON.stringify({
                    userUnfollowed: userId,
                    userUnfollowing: searchId,
                }),
                headers: {"Content-Type": "application/json"}
            })
            .then(r => {
                if (!r.ok) {
                    dispatch(userFollow())
                }
            })
        } catch (error) {
            console.error("An error occurred:", error);
        }

    }
}