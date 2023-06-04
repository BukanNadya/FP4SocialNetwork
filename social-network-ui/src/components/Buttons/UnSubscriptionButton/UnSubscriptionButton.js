import React, {useState} from 'react';
import {unsubscribeButtonStyles} from "./UnSubscriptionButtonStyles";
import {fetchUnfollow} from "../../../store/Thunks/fetchUnfollowThunk";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

export function UnSubscriptionButton () {

    const [isHovered, setIsHovered] = useState(false);
    const disabled = useSelector(state => state.userData.disabled.disabled);
    const dispatch = useDispatch()


    return (
        <Button type="submit" variant="contained" sx={unsubscribeButtonStyles} fullWidth={true}
                onMouseEnter={(ev) => {
                    ev.preventDefault()
                    setIsHovered(true)
                }}
                onMouseLeave={(ev) => {
                    ev.preventDefault()
                    setIsHovered(false)
                }}
                onClick={() => dispatch(fetchUnfollow())} disabled={disabled}>{isHovered ? "Unsubscribe" : "Signed"}</Button>
    )
}

