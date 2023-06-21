import React from "react";
import PropTypes from "prop-types";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    ListItem,
    ListItemText,
    Drawer,
    List,
    SwipeableDrawer, SvgIcon, Fab
} from "@mui/material";
import {InboxMessage} from "./InboxMessage";
import { Post } from "../../Posts/Post";
import { useDispatch, useSelector } from "react-redux";
import { useTransition, animated } from 'react-spring';
import { setMessages, setPageForMessage, setPageZeroForMessaging, fetchTextsByPage } from "../../../store/actions";


export function MessageInbox({inboxMessages, handleSelectMessage, selectedMessage }){
    const transitions = useTransition(inboxMessages, {
        from: { opacity: 0, transform: 'translate3d(0,50%,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0%,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,50%,0)' },
        keys: item => item.createdAt, // Предполагается, что timestamp уникален. Если нет, используйте другое уникальное свойство.
        config: { duration: 600, delay: 200 },
    });

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userData.userData.userId);



    return(
        <div style={{height:"100vh", marginLeft:"20px"}}>
            {inboxMessages.length > 0 ? (
                <div style={{height:"100vh", marginLeft:"20px"}}>
                    {transitions((style, item) => (
                        <animated.div style={style} key={item.createdAt}>
                            <InboxMessage
                                image={item.profileImageUrl}
                                senderName={item.name}
                                sender={item.inboxUid}
                                receiver={item.userId}
                                message={item.message}
                                date={item.createdAt}
                                handleClick={(event) => {
                                    event.preventDefault()
                                    console.log(item.inboxUid)
                                    if (selectedMessage !== item) {
                                        handleSelectMessage(item);
                                        dispatch(setPageZeroForMessaging());
                                        console.log(item.inboxUid);
                                        dispatch(fetchTextsByPage(item.userId, userId, 0));
                                    }
                                }}
                            />
                        </animated.div>
                    ))}
                </div>
            ) : (
                <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:"70vh"}}>
                    <div style={{  fontSize: "1.1rem",
                        fontFamily: "'Lato', sans-serif",}}>Немає повідомлень, почніть переписку</div>
                    <Button variant="contained" sx={{marginTop:"20px"}}>Написати повідомлення</Button>
                </div>
            )}
        </div>
    )
}

MessageInbox.propTypes = {
    selectedMessage:PropTypes.any,
    inboxMessages: PropTypes.any,
    handleSelectMessage:PropTypes.func
};