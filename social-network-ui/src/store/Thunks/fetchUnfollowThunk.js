
import {buttonDisabled, buttonEnabled, userUnfollow} from "../actions";
import {apiUrl} from "../../apiConfig";


export function fetchUnfollow () {
    return (dispatch, getState) => {

        const state = getState()
        const searchId = state.userData.searchData.userId
        const userId = state.userData.userData.userId
        dispatch(buttonDisabled())

        fetch(`${apiUrl}/api/unfollow`, {
            method: "POST",
            body: JSON.stringify({
                userUnfollowed: userId,
                userUnfollowing: searchId,
            }),
            headers: { "Content-Type": "application/json" }
        })
            .then(r => {
                if (r.ok) {
                    dispatch(userUnfollow())
                    dispatch(buttonEnabled())
                }
            })

    }
}