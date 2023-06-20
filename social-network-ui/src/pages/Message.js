import React, { useEffect, useCallback, useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { apiUrl } from "../apiConfig";
import { InboxMessage } from "../components/Messages/Inbox/InboxMessage";
import { Button, TextField } from "@mui/material";
import { TextingMessage } from "../components/Messages/FullTexting/TextingMessage";
import { MessageSearch } from "../components/Messages/Inbox/MessageSearch";
import { MessageInbox } from "../components/Messages/Inbox/MessageInbox";
import {
    leftBlockInboxAndSearch, inboxContainerStyle,
    textingContainerWithInputStyle, leftBlockAndRightBlockContainer,
    textingContainerWithScroll, textingConatinerScrollFromBottom,
    textingConatinerScrollFromTop
} from "./pagesStyles/MessageStyles";
import PropTypes from "prop-types";
import { fetchTextsByPage } from "../store/actions";
import { setMessages, setPageForMessage, setPageZeroForMessaging } from "../store/actions";
import SockJS from "sockjs-client";
import { over } from "stompjs";

let stompClient = null;

export function Message() {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages.messages);
    const page = useSelector(state => state.pageCountMessage.page);
    const maxAmountOfPages = useSelector(state => state.pageCountMessage.maxAmountOfPages);
    const userId = useSelector((state) => state.userData.userData.userId);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isFetchingTexts, setIsFetchingTexts] = useState(false);
    const [allTextsLoaded, setAllTextsLoaded] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const textingContainerRef = useRef(null);
    const [inboxMessages, setInboxMessages] = useState([]);

    const fetchMessages = async () => {
        const response1 = await fetch(`${apiUrl}/api/${userId}/inbox`);
        const userData = await response1.json();
        setInboxMessages(userData)
        console.log(userData);
    };



    useEffect(() => {
        console.log(selectedMessage,"selectedMessage");
    }, [selectedMessage]);


    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        const connect = () => {
            let Sock = new SockJS(`${apiUrl}/websocket`);
            stompClient = over(Sock);
            stompClient.connect({}, onConnected, onError);
        };
        const onConnected = () => {
            stompClient.subscribe(`/user/${userId}/inbox`, newMessage);
        };
        const onError = (err) => {
            console.log(err);
        };
        connect();
        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    const newMessage = (payload) => {
        let payloadData = JSON.parse(payload.body);
        setInboxMessages(prevNotifications => [payloadData, ...prevNotifications]);
    };

    useEffect(() => {
        if (textingContainerRef.current) {
            textingContainerRef.current.scrollTop = textingContainerRef.current.scrollHeight;
        }
    }, [selectedMessage]);

    function handleSelectMessage(message) {
        setSelectedMessage(message);
    }

    const handleScroll = async (event) => {
        if (isFetchingTexts || allTextsLoaded) {
            return;
        }
        setIsFetchingTexts(true);
        try {
            const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
            if (clientHeight - scrollHeight >= scrollTop - 2) {
                console.log("page:" + page);
                console.log("maxAmountOfPages" + maxAmountOfPages);
                if (page < maxAmountOfPages - 1) {
                    await dispatch(fetchTextsByPage(selectedMessage.userId, userId, page + 1));
                    dispatch(setPageForMessage(page + 1));
                } else {
                    setAllTextsLoaded(true);
                }
            }
        } finally {
            setIsFetchingTexts(false);
        }
    };

    return (
        <div style={leftBlockAndRightBlockContainer}>
            <div style={leftBlockInboxAndSearch}>
                <MessageSearch/>
                <div style={inboxContainerStyle}>
                    <MessageInbox inboxMessages={inboxMessages} handleSelectMessage={handleSelectMessage}></MessageInbox>
                    {/*<LoadAllMessages userId={userId} handleSelectMessage={handleSelectMessage}/>*/}
                </div>
            </div>
            <div style={textingContainerWithInputStyle}>
                {selectedMessage === null ? (
                    <div style={textingConatinerScrollFromTop} ref={textingContainerRef}>
                        <div>No texting</div>
                    </div>
                ) : (
                    <div onScroll={handleScroll} style={textingConatinerScrollFromBottom} ref={textingContainerRef}>
                        <TextingMessage
                            sender={selectedMessage.inboxUid}
                            receiver={selectedMessage.userId}
                            selectedMessage={messages}
                            key={Math.floor(Math.random() * 1000)}
                        />
                    </div>
                )}

                <div style={textingContainerWithScroll}>
                    {selectedMessage && (
                        <TextField
                            id="outlined-basic"
                            type="search"
                            variant="outlined"
                            placeholder="Input message"
                            size="small"
                            value={inputValue}
                            onChange={(event) => {
                                event.preventDefault();
                                setInputValue(event.target.value.toString());
                            }}
                            InputProps={{
                                endAdornment: (
                                    <SendIcon
                                        style={{ cursor: "pointer", }}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            const fetchPostTexting = async () => {
                                                const response = await fetch(`${apiUrl}/api/addMessage`, {
                                                    method: "POST",
                                                    body: JSON.stringify({
                                                        inboxUid: selectedMessage.userId,
                                                        userId: selectedMessage.inboxUid,
                                                        writtenMessage: inputValue,
                                                    }),
                                                    headers: { "Content-Type": "application/json" }
                                                });
                                            };
                                            fetchPostTexting();
                                            setInputValue("");
                                        }}
                                    />
                                )
                            }}
                            style={{
                                flex: "1",
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
