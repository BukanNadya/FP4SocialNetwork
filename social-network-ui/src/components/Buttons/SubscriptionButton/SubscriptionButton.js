import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import PropTypes from 'prop-types';
import {fetchFollow} from "../../../store/Thunks/fetchFollowThunk";
import {userFollow} from "../../../store/actions";

export function SubscriptionButton (props) {

    const dispatch = useDispatch()

    return (
        <Button type="submit" variant="contained" sx={{
            height: `${props.height}`,
            width: `${props.width}`,
            padding: "0 12px",
            color: "#000000",
            mb: "20px",
            mt: "12px", background: "#ffffff",
            transition: "0.7s", "&:hover": {
                transition: "0.7s",
                backgroundColor: "#000000",
                color: "#ffffff"
            },
            fontWeight: 700,
            borderRadius: "20px",
            fontFamily: "'Lato', sans-serif",
        }} fullWidth={true} onClick={() => {
            props.btnClick()
            dispatch(userFollow())
            dispatch(fetchFollow(props.searchId))
        }}>Subscribe</Button>
    )
}

SubscriptionButton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    searchId: PropTypes.string,
    btnClick: PropTypes.func,
}