import {apiUrl} from "../../apiConfig";
import {userFollowing} from "../actions";


export function fetchUserFollowingData () {
    return (dispatch, getState) => {

        const state = getState()
        const userId = state.userData.userData.userId

        try {
            fetch(`${apiUrl}/api/following/${userId}`)
                .then(r => r.json())
                .then(data => dispatch(userFollowing(data.map(el => String(el.userId)))))
        } catch (error) {
            console.error("An error occurred:", error);
        }

    }
}