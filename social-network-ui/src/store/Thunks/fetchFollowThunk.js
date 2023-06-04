import {buttonDisabled, buttonEnabled, userFollow} from "../actions";


export function fetchFollow () {
    return (dispatch, getState) => {

        const state = getState()
        const searchId = state.userData.searchData.userId
        const userId = state.userData.userData.userId
        dispatch(buttonDisabled())

        fetch(`http://localhost:8080/api/follow`, {
                method: "POST",
                body: JSON.stringify({
                    userFollower: userId,
                    userFollowing: searchId,
                }),
                headers: {"Content-Type": "application/json"}
            })
                .then(r => {
                    if (r.ok) {
                        dispatch(userFollow())
                        dispatch(buttonEnabled())
                    }
                })
        }
}