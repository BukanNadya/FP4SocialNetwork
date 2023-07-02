import React, { useEffect, useState, useMemo } from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { apiUrl } from "../apiConfig";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useTransition, animated } from "react-spring";

let stompClient = null;

export function Notifications() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const userId = useSelector(state => state.userData.userData.userId);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();

    const transitions = useTransition(notifications, {
        from: { opacity: 0, transform: "translate3d(0,50%,0)" },
        enter: { opacity: 1, transform: "translate3d(0%,0%,0)" },
        leave: { opacity: 0, transform: "translate3d(0,50%,0)" },
        config: { duration: 600, delay: 200 },
    });

    const isXxs = useMediaQuery(theme.breakpoints.down("xxs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    useEffect(() => {
        async function getNotification() {
            try {
                setIsLoading(true);
                let notificationInformation = await fetch(`${apiUrl}/api/notifications`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userId,
                    }),
                    headers: { "Content-Type": "application/json" }
                });
                let notificationData = await notificationInformation.json();
                setNotifications(notificationData.reverse());
            } finally {
                setIsLoading(false);
            }
        }

        getNotification();
    }, []);

    useEffect(() => {
        console.log(notifications);
    }, [notifications]);

    const xxsStyles = {
        AdaptiveListStyles: {
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    };

    const xsStyles = {
        AdaptiveListStyles: {
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    };

    const smStyles = {

        AdaptiveListStyles: {
            width: "470px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    };

    const mdStyles = {
        AdaptiveListStyles: {
            width: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    };

    const lgStyles = {
        AdaptiveListStyles: {
            width: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    };

    const xlStyles = {
        AdaptiveListStyles: {
            width: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }

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

    useEffect(() => {
        try{
            const onConnected = () => {
                stompClient.subscribe("/user/" + userId + "/notifications", onPrivateMessage);
            };
            const onError = (err) => {
                console.log(err);
            };
            let Sock = new SockJS(`${apiUrl}/websocket`);
            stompClient = over(Sock);
            stompClient.connect({}, onConnected, onError);

            return () => {
                if (stompClient && stompClient.connected) {
                    try {
                        stompClient.disconnect();
                    } catch (e) {
                        console.warn('home - failed to disconnect the stomp client', e);
                    }
                }
            };
        }catch (e){
            console.warn('notifications - failed to create the stomp client', e);
        }

    }, []);

    const onPrivateMessage = async (payload) => {
        let payloadData = JSON.parse(payload.body);
        console.log(payloadData);
        setNotifications(prevNotifications => [payloadData, ...prevNotifications]);
        await fetch(`${apiUrl}/api/read_notifications`, {
            method: "POST",
            body: JSON.stringify({
                userId: userId,
            }),
            headers: { "Content-Type": "application/json" }
        });
    };

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
    };

    return (
        <List sx={styles.AdaptiveListStyles} data-testid={"notifications_list"}>
            {isLoading ? <CircularProgress sx={{ marginTop: "20%" }}/> :
                notifications.length > 0 ?
                    transitions((style, item) => (
                        <animated.div style={{ ...style, width: "100%" }} key={item.eventId}>
                            <ListItem
                                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
                                onClick={() => {
                                    navigate(`/post/${item.eventId}`);
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar alt={item.userName} src={item.userPhoto}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.userName}
                                    secondary={`${item.notificationText} · ${postDate(item.dateTime)}`}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        wordWrap: "break-word",
                                        overflowWrap: "anywhere",
                                    }}
                                />
                            </ListItem>
                        </animated.div>
                    )) : <ListItemText
                        primary={"Here will be your notifications"}
                    />}
        </List>
    );
}