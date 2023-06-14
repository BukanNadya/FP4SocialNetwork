import React, {useEffect, useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { apiUrl } from "../apiConfig";



export function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = new WebSocket(`ws://${apiUrl}/api/notifications`);

        socket.addEventListener('open', () => {
            console.log('Соединение с веб-сокетом установлено');
        });

        socket.addEventListener('message', (event) => {
            const responseData = JSON.parse(event.data);
            console.log('Получен ответ от веб-сокета:', responseData);

            // Обработка полученного ответа, например, добавление уведомления в список
            const newNotification = {
                id: responseData.userId,
                text: responseData.notificationText,
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