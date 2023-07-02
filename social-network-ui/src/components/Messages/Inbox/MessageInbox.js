import React, { useState, useEffect } from "react";
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
import { InboxMessage } from "./InboxMessage";
import { Post } from "../../Posts/Post";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTransition, animated } from "react-spring";
import {
    setMessages,
    setPageForMessage,
    setPageZeroForMessaging,
    fetchTextsByPage,
    clearMessages
} from "../../../store/actions";
import { setClickedInboxTrue } from "../../../store/actions";
import { apiUrl } from "../../../apiConfig";


export function MessageInbox({ inboxMessages, selectedMessage, setSelectedMessage }) {

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userData.userData.userId);
    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    return (
        <div style={{ height: "100vh", marginTop: "10px" }}>
            {inboxMessages.length > 0 ? (
                inboxMessages.map((item) => (
                    <div key={item.inboxId} style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        flexDirection: "column"
                    }}>
                        <InboxMessage
                            inboxId={item.inboxId}
                            image={item.profileImageUrl}
                            senderName={item.name}
                            sender={item.inboxUid}
                            receiver={item.userId}
                            message={item.message}
                            date={item.createdAt}
                            selectedMessage={selectedMessage}
                            unreadMessage={item.unreadByUser}
                            handleClick={(event) => {
                                event.preventDefault();
                                if (selectedMessage !== item) {
                                    fetch(`${apiUrl}/api/getMessages`, {
                                        method: "POST",
                                        body: JSON.stringify({
                                            inboxUid: item.inboxUid,
                                            userId: item.userId,
                                        }),
                                        headers: { "Content-Type": "application/json" }
                                    });
                                    dispatch(clearMessages());
                                    setSelectedMessage(item);
                                    dispatch(setPageZeroForMessaging());
                                    dispatch(fetchTextsByPage(item.userId, userId, 0));
                                }
                                if (!isXl && !isLg && !isMd) {
                                    dispatch(setClickedInboxTrue());
                                }
                            }}
                        />
                    </div>
                ))
            ) : (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "70vh"
                }}>
                    <div style={{
                        fontSize: "1.1rem",
                        fontFamily: "'Lato', sans-serif",
                    }}>Немає повідомлень, почніть переписку
                    </div>
                    <Button variant="contained" sx={{ marginTop: "20px" }}>Написати повідомлення</Button>
                </div>
            )}
        </div>
    );
}

MessageInbox.propTypes = {
    setSelectedMessage: PropTypes.any,
    selectedMessage: PropTypes.any,
    inboxMessages: PropTypes.any,
    handleSelectMessage: PropTypes.func
};