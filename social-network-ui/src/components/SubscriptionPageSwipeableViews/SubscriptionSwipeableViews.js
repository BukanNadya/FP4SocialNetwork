import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {TabStyles} from "./SubscriptionSwipeableViewsStyles";
import {useNavigate} from "react-router-dom";

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

export function SubscriptionSwipeableViews () {
    const [value, setValue] = React.useState(Number(localStorage.getItem("subscribe")));

    const navigate = useNavigate()

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                Followers
            </TabPanel>
            <TabPanel value={value} index={1}>
                Following
            </TabPanel>
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};