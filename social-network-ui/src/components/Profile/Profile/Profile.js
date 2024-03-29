import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
    BgImgStyle,
    infoTextStyles,
    imgStyle,
    LinkQuantityStyles,
    LinkStyles,
    LinkTextStyles,
    NameStyles,
    NicknameStyles,
    ProfileStyles,
    SvgStyles,
    infoStyle,
    PhotoStyle,
    editButtonStyles,
    noticesButton,
    DarkNameStyles,
    DarkNicknameStyles, DarkSvgStyles, DarkInfoTextStyles, DarkLinkTextStyles, DarkLinkQuantityStyles, DarkNoticesButton
} from "./ProfileStyles";
import {Avatar, Button, SvgIcon, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ProfileSwipeableViews} from "../ProfilePageSwipeableViews/ProfileSwipeableViews";
import {useDispatch, useSelector} from "react-redux";
import {userFollow, userSearchFollow, userSearchUnfollow, userUnfollow} from "../../../store/actions";
import {UnSubscriptionButton} from "../../Buttons/UnSubscriptionButton/UnSubscriptionButton";
import {apiUrl} from "../../../apiConfig";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {fetchNotifications} from "../../../store/Thunks/fetchNotificationsThunk";

export function Profile (props) {

    const searchId = useSelector(state => state.userData.searchData.userId);
    const userId = useSelector(state => state.userData.userData.userId);
    const isFollow = useSelector(state => state.userData.followData.userFollow)
    const darkMode = useSelector(state => state.userData.userMode.darkMode);
    const [isNotices, setIsNotices] = useState(true)
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchIsFollow = async () => {

            const response = await fetch(`${apiUrl}/api/isfollowing`, {
                method: "POST",
                        body: JSON.stringify({
                            userFollower: userId,
                            userFollowing: searchId,
                        }),
                        headers: { "Content-Type": "application/json" }
            });
            const userIsFollow = await response.json();
            if (userIsFollow.following === "true") {
                dispatch(userFollow())
                if (userIsFollow.notification === "true") {
                    setIsNotices(true)
                } else if (userIsFollow.notification === "false") {
                    setIsNotices(false)
                }
            } else if (userIsFollow.following === "false") {
                dispatch(userUnfollow())
            }

        };
        if (searchId) {
            fetchIsFollow();
        }

    }, [searchId])

    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
        ContainerStyle: {
            width: "100vw"
        },
        NoticesStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    };

    const xsStyles = {
        ContainerStyle: {
            width: "100vw"
        },
        NoticesStyle: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
        },
    };

    const smStyles = {
        ContainerStyle: {
            width: "470px"
        },
        NoticesStyle: {
            display: "flex",
            alignItems: "center",
        },

    };

    const mdStyles = {
        ContainerStyle: {
            width: "600px"
        },
        NoticesStyle: {
            display: "flex",
            alignItems: "center",
        },
    };

    const lgStyles = {
        ContainerStyle: {
            width: "600px"
        },
        NoticesStyle: {
            display: "flex",
            alignItems: "center",
        },
    };

    const xlStyles = {
        ContainerStyle: {
            width: "600px"
        },
        NoticesStyle: {
            display: "flex",
            alignItems: "center",
        },

};

let styles;
if (isXl) {
    styles = xlStyles;
} else if (isLg) {
    styles = lgStyles;
} else if (isMd) {
    styles = mdStyles;
} else if (isSm) {
    styles = smStyles;
} else if (isXs) {
    styles = xsStyles;
} else {
    styles = xxsStyles;
}

return (

    <div style={styles.ContainerStyle}>
        <div style={BgImgStyle} data-testid={"bg_image_wrapper"}>
            {props.background ?
                <img src={props.background}  alt={props.name} style={PhotoStyle} />
                :
                false
            }
        </div>
        <div style={ProfileStyles}>
            <div style={imgStyle}>

                <Avatar alt={props.name} src={props.image ? props.image : ""} data-testid={"user_profile_photo"} sx={{ bgcolor: "rgb(29, 155, 240)", width: "140px", height: "140px", marginTop: "-15%" }}/>

                {isFollow
                    ?
                    <div style={styles.NoticesStyle}>
                        {isNotices
                            ?
                            <Button type="submit" variant="contained" sx={darkMode ? DarkNoticesButton : noticesButton} fullWidth={true} onClick={() => {
                                setIsNotices(false)
                                dispatch(fetchNotifications(searchId, false))
                            }}>
                            <SvgIcon viewBox="0 0 24 24" sx={{width: "20px", height: "20px", color: darkMode ? "#ffffff" : "#000000"}}>
                                <g>
                                    <path d="M12 2C7.93 2 4.51 5.02 4 9.05L2.87 18H7.1c.46 2.28 2.48 4 4.9 4s4.44-1.72 4.9-4h4.24l-.64-5h-2.02l.38 3H5.13l.85-6.7C6.36 6.27 8.94 4 12 4V2zm0 18c-1.31 0-2.42-.83-2.83-2h5.66c-.41 1.17-1.52 2-2.83 2zm.3-12.29l1.41-1.42 1.76 1.76 4.29-4.72 1.48 1.34-5.7 6.28-3.24-3.24z"/>
                                </g>
                            </SvgIcon>
                            </Button>
                            :
                            <Button type="submit" variant="contained" sx={darkMode ? DarkNoticesButton : noticesButton} fullWidth={true} onClick={() => {
                                setIsNotices(true)
                                dispatch(fetchNotifications(searchId, true))
                            }}>
                            <SvgIcon viewBox="0 0 24 24" sx={{width: "20px", height: "20px", color: darkMode ? "#ffffff" : "#000000"}}>
                                <g>
                                    <path d="M22 5v2h-3v3h-2V7h-3V5h3V2h2v3h3zm-.86 13h-4.241c-.464 2.281-2.482 4-4.899 4s-4.435-1.719-4.899-4H2.87L4 9.05C4.51 5.02 7.93 2 12 2v2C8.94 4 6.36 6.27 5.98 9.3L5.13 16h13.73l-.38-3h2.02l.64 5zm-6.323 0H9.183c.412 1.164 1.51 2 2.817 2s2.405-.836 2.817-2z"/>
                                </g>
                            </SvgIcon>
                            </Button>
                        }
                    <UnSubscriptionButton width="170px" height="45px" searchId={props.userId} btnClick={() => dispatch(userSearchUnfollow())}/>
                    </div>
                    :
                    <Button data-testid={"edit_profile_button"} type="submit" variant="contained" sx={editButtonStyles} fullWidth={true} onClick={() => {
                        dispatch(userSearchFollow())
                        dispatch(userFollow())
                        props.btnClick()
                    }}>{props.buttonText}</Button>
                }

            </div>
            <div>
                <div style={{ margin: "15px 0", display: "flex", flexDirection: "column", gap: "5px" }}>
                    <span style={darkMode ? DarkNameStyles : NameStyles} data-testid={"profile_name_user"}>{props.name}</span>
                    <span style={darkMode ? DarkNicknameStyles : NicknameStyles} data-testid={"profile_nik_user"}>@{props.userName}</span>
                </div>
                <div style={infoStyle}>
                    {props.address ?
                        <div style={darkMode ? DarkSvgStyles : SvgStyles}>
                            <SvgIcon viewBox="0 0 24 24" sx={{width: "18px", height: "18px"}}>
                                <g>
                                    <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path>                            </g>
                            </SvgIcon>
                            <span style={darkMode ? DarkInfoTextStyles : infoTextStyles}>{props.address}</span>
                        </div>
                        :
                        false
                    }
                    <div style={darkMode ? DarkSvgStyles : SvgStyles}>
                        <SvgIcon viewBox="0 0 24 24" sx={{width: "18px", height: "18px"}}>
                            <g>
                                <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"/>
                            </g>
                        </SvgIcon>
                        <span style={darkMode ? DarkInfoTextStyles : infoTextStyles} data-testid={"profile_registration_date"}>Registration Date: {props.date}</span>
                    </div>
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                    <Link to="/subscribe" state={{ userId: props.userId }} variant="contained" style={LinkStyles} onClick={() =>  localStorage.setItem("subscribe", JSON.stringify(1))}>
                        <Typography sx={darkMode ? DarkLinkTextStyles : LinkTextStyles} data-testid={"profile_following"}>
                            <span style={darkMode ? DarkLinkQuantityStyles : LinkQuantityStyles}>{props.followings}</span> following
                        </Typography>
                    </Link>
                    <Link to="/subscribe" state={{ userId: props.userId }} variant="contained" style={LinkStyles} onClick={() =>  localStorage.setItem("subscribe", JSON.stringify(0))}>
                        <Typography sx={darkMode ? DarkLinkTextStyles : LinkTextStyles} data-testid={"profile_followers"}>
                            <span style={darkMode ? DarkLinkQuantityStyles : LinkQuantityStyles}>{props.followers}</span> followers
                        </Typography>
                    </Link>
                </div>
            </div>
        </div>
        <ProfileSwipeableViews userId={props.userId}/>
    </div>
)
}

Profile.propTypes = {
image: PropTypes.string,
background: PropTypes.string,
buttonText: PropTypes.string.isRequired,
name: PropTypes.string.isRequired,
userName: PropTypes.string.isRequired,
date: PropTypes.string.isRequired,
address: PropTypes.string,
followings: PropTypes.number.isRequired,
followers: PropTypes.number.isRequired,
userId: PropTypes.string.isRequired,
btnClick: PropTypes.func.isRequired,
};