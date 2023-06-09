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

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                    <Tab label="Followers" {...a11yProps(0)} sx={TabStyles} onClick={() => localStorage.setItem("subscribe", JSON.stringify(0))}/>
                    <Tab label="Following" {...a11yProps(1)} sx={TabStyles} onClick={() => localStorage.setItem("subscribe", JSON.stringify(1))}/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <List>
                    {isLoading ? <CircularProgress sx={{ marginLeft: "calc(50% - 20px)", alignSelf:"center" }}/> :
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
                {isLoading ? <CircularProgress sx={{ marginLeft: "calc(50% - 20px)", alignSelf:"center" }}/> :
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
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};