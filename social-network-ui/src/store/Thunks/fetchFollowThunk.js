import {userUnfollow} from "../actions";
import {apiUrl} from "../../apiConfig";
import {fetchUserFollowingData} from "./fetchUserFollowingDataThunk";

export function fetchFollow (searchId) {
    return (dispatch, getState) => {

        const state = getState()
        const userId = state.userData.userData.userId
        try {
            fetch(`${apiUrl}/api/follow`, {
                method: "POST",
                body: JSON.stringify({
                    userFollower: userId,
                    userFollowing: searchId,
                }),
                headers: {"Content-Type": "application/json"}
            })
            .then(r => {
                if (!r.ok) {
                    dispatch(userUnfollow())
                } else {dispatch(fetchUserFollowingData())}
            })
        } catch (error) {
            dispatch(userUnfollow())
            console.error("An error occurred:", error);
        }
    }
}