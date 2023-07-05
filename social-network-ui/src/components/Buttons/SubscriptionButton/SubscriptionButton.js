import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import PropTypes from 'prop-types';
import {fetchFollow} from "../../../store/Thunks/fetchFollowThunk";
import {userFollow} from "../../../store/actions";

export function SubscriptionButton (props) {

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
                    color: "#ffffff",
                    mb: "20px",
                    mt: "12px", background: "#000000",
                    boxShadow: "0px 3px 1px -2px rgba(255,255,255,0.5), 0px 2px 2px 0px rgba(255,255,255,0.54), 0px 1px 5px 0px rgba(255,255,255,0.52)",
                    // boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.5), 0px 2px 2px 0px rgba(0,0,0,0.54), 0px 1px 5px 0px rgba(0,0,0,0.52)",
                    transition: "0.7s", "&:hover": {
                        transition: "0.7s",
                        backgroundColor: "#ffffff",
                        color: "#000000"
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
                    }
        } fullWidth={true} onClick={() => {
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