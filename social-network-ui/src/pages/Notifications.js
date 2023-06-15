import React, {useEffect, useState } from 'react';
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

var stompClient = null;

export function Notifications() {
    const [notifications, setNotifications] = useState([]);

    const [privateChats, setPrivateChats] = useState(new Map());
    const userData = useSelector(state => state.userData.userData);
    const userId = useSelector(state => state.userData.userData.userId);

    const connect =()=>{
            let Sock = new SockJS(`${apiUrl}/websocket`);
            stompClient = over(Sock);
            stompClient.connect({},onConnected, onError);
        }

    const onConnected = () => {
            stompClient.subscribe('/user/'+userId+'/notifications', onPrivateMessage);
        }
    const onError = (err) => {
            console.log(err);
        }

    const onPrivateMessage = (payload)=>{
                  console.log(payload);
                  var payloadData = JSON.parse(payload.body);
                      let list =[];
                      list.push(payloadData);
                      privateChats.set(payloadData.notificationText,list);
                      setPrivateChats(new Map(privateChats));
              }
     connect();

    return (
        <List>
            {notifications.map((notification) => (
                <ListItem key={notification.id} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                    <ListItemAvatar>
                        <Avatar alt={notification.user} src={notification.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={notification.user}
                        secondary={`${notification.text} · ${notification.time}`}
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