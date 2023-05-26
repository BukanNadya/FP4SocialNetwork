import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {TabStyles} from "./ProfileSwipeableViewsStyles";
import {PostsWrapper} from "../Posts/PostStyles";
import {PostsDisplaying} from "../Posts/PostsDisplaying";
import {useEffect} from "react";
import {setPosts, setUserData, setUserPostsClear} from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";

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

export function ProfileSwipeableViews () {
    const [value, setValue] = React.useState(0);
    const userId = useSelector(state => state.userData.userData.userId);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchUserPosts = async () => {
            const response = await fetch(`http://localhost:8080/posts/${userId}?page=0`);
            const userPosts = await response.json();
            dispatch(setPosts(userPosts))
        }
        const fetchUserLikedPosts = async () => {
            const response = await fetch(`http://localhost:8080/posts/liked/${userId}?page=0`);
            const userLikedPosts = await response.json();
            dispatch(setPosts(userLikedPosts))
        }

        if (value === 0) {
            dispatch(setUserPostsClear([]))
            fetchUserPosts()
        } else if (value === 2) {
            dispatch(setUserPostsClear([]))
            fetchUserLikedPosts()
        }

    }, [value]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                    <Tab label="Posts" {...a11yProps(0)} sx={TabStyles}/>
                    <Tab label="Answers" {...a11yProps(1)} sx={TabStyles}/>
                    <Tab label="Likes" {...a11yProps(2)} sx={TabStyles}/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Posts
                <div style={PostsWrapper}>
                    <PostsDisplaying/>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Answers
            </TabPanel>
            <TabPanel value={value} index={2}>
                Likes
                <div style={PostsWrapper}>
                    <PostsDisplaying/>
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
