import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {TabStyles} from "./ProfileSwipeableViewsStyles";
import {PostsWrapper} from "../../Posts/PostStyles";
import {PostsDisplaying} from "../../Posts/PostsDisplaying";
import {useEffect} from "react";
import {
    setProfileLikePosts,
    setProfilePosts,
    setProfileReposts,
    setUserPostsClear
} from "../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {apiUrl} from "../../../apiConfig";

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
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
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

export function ProfileSwipeableViews (props) {
    const [value, setValue] = React.useState(0);
    const userId = useSelector(state => state.userData.searchData.userId);
    const profilePosts = useSelector(state => state.Posts.profilePosts)
    const profileLikePosts = useSelector(state => state.Posts.profileLikePosts)
    const profileReposts = useSelector(state => state.Posts.profileReposts)

    const [isLoading, setIsLoading] = React.useState(false)
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                setIsLoading(true)
                // const response = await fetch(`http://localhost:8080/posts/${props.userId}?page=0`);
                const response = await fetch(`${apiUrl}/api/posts/reposts?userId=${props.userId}`);
                const userPosts = await response.json();
                dispatch(setProfilePosts(userPosts))
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }

        const fetchUserReposts = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(`${apiUrl}/api/reposts?userId=${props.userId}`);
                const userReposts = await response.json();
                dispatch(setProfileReposts(userReposts))
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        const fetchUserLikedPosts = async () => {
            try {
                setIsLoading(true)
            const response = await fetch(`${apiUrl}/api/posts/liked/${props.userId}?page=0`);
            const userLikedPosts = await response.json();
            dispatch(setProfileLikePosts(userLikedPosts))
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }

        if (value === 0) {
            dispatch(setUserPostsClear([]))
            fetchUserPosts()
        } else if (value === 1) {
            dispatch(setUserPostsClear([]))
            fetchUserReposts()
        } else if (value === 2) {
            dispatch(setUserPostsClear([]))
            fetchUserLikedPosts()
        }

    }, [value, userId]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                    <Tab label="Posts" {...a11yProps(0)} sx={TabStyles}/>
                    <Tab label="Reposts" {...a11yProps(1)} sx={TabStyles}/>
                    <Tab label="Likes" {...a11yProps(2)} sx={TabStyles}/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <div style={PostsWrapper}>
                    <PostsDisplaying userPosts={profilePosts} isLoading={isLoading}/>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div style={PostsWrapper}>
                    <PostsDisplaying userPosts={profileReposts} isLoading={isLoading}/>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div style={PostsWrapper}>
                    <PostsDisplaying userPosts={profileLikePosts} isLoading={isLoading}/>
                </div>
            </TabPanel>
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
ProfileSwipeableViews.propTypes = {
    userId: PropTypes.string,
};
