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
import { setMessages, setPageForMessage, setPageZeroForMessaging, fetchTextsByPage } from "../../../store/actions";


export function MessageInbox({inboxMessages, handleSelectMessage }){
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userData.userData.userId);



    return(
        <div style={{height:"100vh", marginLeft:"20px"}}>
            {inboxMessages.length > 0 ? (
                inboxMessages.map((item)=>(
                    <InboxMessage
                        key={item.userId}
                        image={item.profileImageUrl}
                        senderName={item.name}
                        sender={item.inboxUid}
                        receiver={item.userId}
                        message={item.message}
                        date={item.createdAt}
                        handleClick={(event) => {
                            event.preventDefault();
                            handleSelectMessage(item);
                            dispatch(setPageZeroForMessaging());
                            console.log(item.inboxUid);
                            dispatch(fetchTextsByPage(item.userId, userId, 0));
                        }}
                    />
                ))
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
    inboxMessages: PropTypes.any,
    handleSelectMessage:PropTypes.func
};