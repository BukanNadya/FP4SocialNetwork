import React, {useState} from 'react';
import {fetchUnfollow} from "../../../store/Thunks/fetchUnfollowThunk";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from 'prop-types';
import {userUnfollow} from "../../../store/actions";

export function UnSubscriptionButton (props) {

    const [isHovered, setIsHovered] = useState(false);
    const darkMode = useSelector(state => state.userData.userMode.darkMode);
    const dispatch = useDispatch()


    return (
        <Button type="submit" variant="contained"
                sx={
            darkMode
                ?
                {
                    height: `${props.height}`,
                    width: `${props.width}`,
                    padding: "0 12px",
                    color: "#000000",
                    mb: "20px",
                    mt: "12px", background: "#ffffff",
                    transition: "0.7s", "&:hover": {
                        transition: "0.7s",
                        backgroundColor: "rgb(255,166,174)",
                        boxShadow: "0px 3px 1px -2px rgba(253, 201, 206,0.5), 0px 2px 2px 0px rgba(253, 201, 206,0.54), 0px 1px 5px 0px rgba(253, 201, 206,0.52)",
                        borderColor: "rgb(253, 201, 206)",
                        color: "#c21818"
                    },
                    fontWeight: 700,
                    borderRadius: "20px",
                    fontFamily: "'Lato', sans-serif",
                    }
                :
                {
                        height: `${props.height}`,
                        width: `${props.width}`,
                        padding: "0 12px",
                        color: "#ffffff",
                        mb: "20px",
                        mt: "12px", background: "#000000",
                        transition: "0.7s", "&:hover": {
                            transition: "0.7s",
                            backgroundColor: "rgba(244, 33, 46, 0.1)",
                            boxShadow: "0px 3px 1px -2px rgba(253, 201, 206,0.5), 0px 2px 2px 0px rgba(253, 201, 206,0.54), 0px 1px 5px 0px rgba(253, 201, 206,0.52)",
                            borderColor: "rgb(253, 201, 206)",
                            color: "#c21818"
                        },
                        fontWeight: 700,
                        borderRadius: "20px",
                        fontFamily: "'Lato', sans-serif",
                    }
        } fullWidth={true}
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