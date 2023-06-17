import React, {useEffect, useState, useMemo } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { apiUrl } from "../apiConfig";
import SockJS from "sockjs-client";
import {over} from 'stompjs';

import {useDispatch, useSelector} from "react-redux";
import {
    fetchData,
    fetchPostsByUserId,
    sendPost,
    setPageZero,
    setUserId,
    setUserPostsClear
} from "../store/actions";
import { differenceInDays, format, formatDistanceToNow } from "date-fns";

let stompClient = null;

export function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const userData = useSelector(state => state.userData.userData);
    const userId = useSelector(state => state.userData.userData.userId);


    useEffect(()=>{
        const onConnected = () => {
            stompClient.subscribe('/user/'+userId+'/notifications', onPrivateMessage);
        }
        const onError = (err) => {
            console.log(err);
        }
        const connect =()=>{
            let Sock = new SockJS(`${apiUrl}/websocket`);
            stompClient = over(Sock);
            stompClient.connect({},onConnected, onError);
        }
        connect();

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        }
    }, [])

    const onPrivateMessage = (payload) => {
        let payloadData = JSON.parse(payload.body);
        setNotifications(prevNotifications => [payloadData, ...prevNotifications])
        console.log(payloadData)
    }

    useEffect(()=>{
        console.log("notifications",notifications)
    }, [notifications])


    const postDate = (dataTime) => {
        const date = new Date(dataTime);
        const diffDays = differenceInDays(new Date(), date);

        if (diffDays < 1) {
            return formatDistanceToNow(date, { addSuffix: true });
        } else if (diffDays < 365) {
            return format(date, "MMM d");
        } else {
            return format(date, "MMM d, yyyy");
        }
    }

    return (
        <List sx={{width:"600px"}}>
            {notifications.map((notification) => (
                <ListItem key={notification.userId} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                    <ListItemAvatar >
                        <Avatar alt={notification.userName} src={notification.userPhoto} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={notification.userName}
                        secondary={`${notification.notificationText} · ${postDate(notification.dateTime)}`}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    />
                </ListItem>
            ))}
        </List>
    );
}