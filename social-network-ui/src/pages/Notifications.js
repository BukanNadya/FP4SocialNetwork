import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";

// Это просто пример данных. В реальном приложении они, скорее всего, будут приходить с сервера.
const notifications = [
    {
        id: 1,
        user: 'User1',
        avatar: 'url_to_avatar1',
        text: 'liked your tweet',
        time: '1h'
    },
    {
        id: 2,
        user: 'User2',
        avatar: 'url_to_avatar2',
        text: 'retweeted your tweet',
        time: '2h'
    },
];

export  function Notifications() {
    return (
        <List>
            {notifications.map(notification => (
                <ListItem key={notification.id} sx={{borderBottom: "1px solid rgba(0, 0, 0, 0.1)"}}>
                    <ListItemAvatar>
                        <Avatar alt={notification.user} src={notification.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={notification.user}
                        secondary={`${notification.text} · ${notification.time}`}
                        sx={{
                                display: "flex",
                                flexDirection: "row",
                             justifyContent:"space-between"
                        }}
                    />
                </ListItem>
            ))}
        </List>
    );
}