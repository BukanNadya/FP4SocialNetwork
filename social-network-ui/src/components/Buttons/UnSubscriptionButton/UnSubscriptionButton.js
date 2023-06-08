import React, {useState} from 'react';
import {fetchUnfollow} from "../../../store/Thunks/fetchUnfollowThunk";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import {userUnfollow} from "../../../store/actions";

export function UnSubscriptionButton (props) {

    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch()


    return (
        <Button type="submit" variant="contained" sx={{
            height: `${props.height}`,
            width: `${props.width}`,
            padding: "0 12px",
            color: "#ffffff",
            mb: "20px",
            mt: "12px", background: "#000000",
            transition: "0.7s", "&:hover": {
                transition: "0.7s",
                backgroundColor: "rgba(244, 33, 46, 0.1)",
                borderColor: "rgb(253, 201, 206)",
                color: "#c21818"
            },
            fontWeight: 700,
            borderRadius: "20px",
            fontFamily: "'Lato', sans-serif",
        }} fullWidth={true}
                onMouseEnter={(ev) => {
                    ev.preventDefault()
                    setIsHovered(true)
                }}
                onMouseLeave={(ev) => {
                    ev.preventDefault()
                    setIsHovered(false)
                }}
                onClick={() => {
                    props.btnClick()
                    dispatch(userUnfollow())
                    dispatch(fetchUnfollow(props.searchId))
                }}>{isHovered ? "Unsubscribe" : "Signed"}</Button>
    )
}

UnSubscriptionButton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    searchId: PropTypes.string,
    btnClick: PropTypes.func,
}