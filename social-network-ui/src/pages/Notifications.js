import React, {useEffect, useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { apiUrl } from "../apiConfig";
import SockJS from "sockjs-client";
import {over} from 'stompjs';

var stompClient = null;

export function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

    const socket = new SockJS(`${apiUrl}/websocket`);
    stompClient = over(socket);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

        socket.addEventListener('message', (event) => {
            const responseData = event.data;
            console.log('Получен ответ от веб-сокета:', responseData);
           const  response = responseData.json()


            // Обработка полученного ответа, например, добавление уведомления в список
            const newNotification = {
                id: response.userId,
                text: response.notificationText,
            };

            setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
        });

        socket.addEventListener('close', () => {
            console.log('Соединение с веб-сокетом закрыто');
        });

        return () => {
            socket.close(); // Закрываем соединение при размонтировании компонента
        };
    }, []);

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