import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab,       Box, List, ListItem, ListItemAvatar, Avatar, ListItemText} from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import {TabStyles} from "./SubscriptionSwipeableViewsStyles";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setSearchId, userFollowing} from "../../../store/actions";
import {ToggleButton} from "../../Buttons/ToggleButton/ToggleButton";
import { apiUrl } from "../../../apiConfig";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>{children}</div>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function SubscriptionSwipeableViews () {
    const [value, setValue] = React.useState(Number(localStorage.getItem("subscribe")));
    const idUser = useSelector(state => state.userData.userData.userId);
    const [isLoading, setIsLoading] = useState(false)
    const [followings, setFollowings] = useState([])
    const [followers, setFollowers] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()


    useEffect(() => {
        const followingsData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${apiUrl}/api/following/${state.userId}`)
                const followData = await response.json()
                setFollowings(followData)
                console.log(followData)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        const followersData = async () => {
            try {
                setIsLoading(true);
            const response = await fetch(`${apiUrl}/api/followers/${state.userId}`)
            const followData = await response.json()
            setFollowers(followData)
            console.log(followData)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        const userFollowingData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${apiUrl}/api/following/${idUser}`)
                const followData = await response.json()
                const followArr = followData.map(el => String(el.userId))
                dispatch(userFollowing(followArr))
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }


        if (state.userId) {
            userFollowingData()
            followingsData()
            followersData()
        }
    }, [value])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const toUserPage = (userId) => {
        dispatch(setSearchId(String(userId)));
        navigate("/view");
    };

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
    };

    const xsStyles = {
        ContainerStyle: {
            width: "100vw"
        },
    };

    const smStyles = {
        ContainerStyle: {
            width: "470px"
        },

    };

    const mdStyles = {
        ContainerStyle: {
            width: "600px"
        },
    };

    const lgStyles = {
        ContainerStyle: {
            width: "600px"
        },
    };

    const xlStyles = {
        ContainerStyle: {
            width: "600px"
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
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                    <Tab label="Followers" {...a11yProps(0)} sx={TabStyles} onClick={() => localStorage.setItem("subscribe", JSON.stringify(0))}/>
                    <Tab label="Following" {...a11yProps(1)} sx={TabStyles} onClick={() => localStorage.setItem("subscribe", JSON.stringify(1))}/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <List>
                    {isLoading ? <CircularProgress sx={{ marginLeft: "calc(50% - 20px)", alignSelf:"center", marginTop: "30px" }}/> :
                        followers.map(el =>  (
                        <ListItem key={el.userId} sx={{cursor: "pointer", fontFamily: "'Lato', sans-serif", height: "90px", "&:hover": {
                                transition: "0.7s",
                                backgroundColor: "rgba(0, 0, 0, 0.05)",
                            }}}>
                            <ListItemAvatar>
                                <Avatar alt="" src={el.profileImageLink ? el.profileImageLink : ""} onClick={() => toUserPage(el.userId)}/>
                            </ListItemAvatar>
                            <ListItemText primary={el.name} secondary={`@${el.username}`} onClick={() => toUserPage(el.userId)}/>
                            <ToggleButton width="140px" height="40px" searchId={String(el.userId)}/>
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <List>
                {isLoading ? <CircularProgress sx={{ marginLeft: "calc(50% - 20px)", alignSelf:"center", marginTop: "30px" }}/> :
                    followings.map(el =>  (
                    <ListItem key={el.userId} sx={{cursor: "pointer", fontFamily: "'Lato', sans-serif", height: "90px", "&:hover": {
                            transition: "0.7s",
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                        }}}>
                        <ListItemAvatar>
                            <Avatar alt="" src={el.profileImageLink ? el.profileImageLink : ""} onClick={() => toUserPage(el.userId)}/>
                        </ListItemAvatar>
                        <ListItemText primary={el.name} secondary={`@${el.username}`} onClick={() => toUserPage(el.userId)}/>
                        <ToggleButton width="140px" height="40px" searchId={String(el.userId)}/>
                    </ListItem>
                ))}
                </List>
            </TabPanel>
        </Box>
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};