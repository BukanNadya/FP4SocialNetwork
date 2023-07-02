import React, { useEffect, useCallback, useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { apiUrl } from "../apiConfig";
import { InboxMessage } from "../components/Messages/Inbox/InboxMessage";
import { Button, TextField, Typography } from "@mui/material";
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
import { addMessageFromWebsocket, fetchTextsByPage } from "../store/actions";
import { setMessages, setPageForMessage, setPageZeroForMessaging } from "../store/actions";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { HeaderInformation } from "../components/NavigationComponents/HeaderInformation";
import CircularProgress from "@mui/material/CircularProgress";
import { height, padding } from "@mui/system";
import { setClickedInboxFalse, setClickedInboxTrue } from "../store/actions";
import { Avatar } from "@mui/material";

let stompClient = null;

export function Message() {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages.messages);
    const inbox = useSelector((state) => state.messages.inbox);
    const page = useSelector(state => state.pageCountMessage.page);
    const maxAmountOfPages = useSelector(state => state.pageCountMessage.maxAmountOfPages);
    const userId = useSelector((state) => state.userData.userData.userId);
    const [selectedMessage, setSelectedMessage] = useState(false);
    const [isFetchingTexts, setIsFetchingTexts] = useState(false);
    const [allTextsLoaded, setAllTextsLoaded] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const textingContainerRef = useRef(null);
    const [inboxMessages, setInboxMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const clicked = useSelector((state) => state.inboxOrTexting.click);

    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    const xxsStyles = {
        AdaptiveLeftBlockAndRightBlockContainer: {
            ...leftBlockAndRightBlockContainer,
            width: "100vw",
        },
        AdaptiveLeftBlockInboxAndSearch: {
            ...leftBlockInboxAndSearch,
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            width: "100%"
        },
        AdaptiveInboxContainerStyle: {
            ...inboxContainerStyle,
        },
        AdaptiveTextingContainerWithInputStyle: {
            ...textingContainerWithInputStyle,
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            height: "100vh",
            width: "100vw",
            maxHeight: "100vh",
        },
        AdaptiveTextingConatinerScrollFromTop: {
            ...textingConatinerScrollFromTop,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        },
        AdaptiveTextingContainerScrollFromBottom: {
            ...textingConatinerScrollFromBottom
        },
        AdaptiveTextingContainerWithScroll: {
            ...textingContainerWithScroll,
        },
        AdaptiveMessageContainerStyle: {
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            backgroundColor: "#F5F8FA",
            alignItems: "center",
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            padding: "0 20px 0 10px",
            height: "50px",
        },
        AdaptiveAvatarStyle: {
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            marginRight: "10px",
        }
    };

    const xsStyles = {
        AdaptiveLeftBlockAndRightBlockContainer: {
            ...leftBlockAndRightBlockContainer,
            width: "100vw",
        },
        AdaptiveLeftBlockInboxAndSearch: {
            ...leftBlockInboxAndSearch,
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            width: "100%",
        },
        AdaptiveInboxContainerStyle: {
            ...inboxContainerStyle,
        },
        AdaptiveTextingContainerWithInputStyle: {
            ...textingContainerWithInputStyle,
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            height: "100vh",
            width: "100vw",
            maxHeight: "100vh",
        },
        AdaptiveTextingConatinerScrollFromTop: {
            ...textingConatinerScrollFromTop,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        },
        AdaptiveTextingContainerScrollFromBottom: {
            ...textingConatinerScrollFromBottom
        },
        AdaptiveTextingContainerWithScroll: {
            ...textingContainerWithScroll,
        },
        AdaptiveMessageContainerStyle: {
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            backgroundColor: "#F5F8FA",
            alignItems: "center",
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            padding: "0 20px 0 10px",
            height: "50px",
        },
        AdaptiveAvatarStyle: {
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            marginRight: "10px",
        }
    };

    const smStyles = {
        AdaptiveLeftBlockAndRightBlockContainer: {
            ...leftBlockAndRightBlockContainer,
            maxWidth: "500px"
        },
        AdaptiveLeftBlockInboxAndSearch: {
            ...leftBlockInboxAndSearch,
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            width: "100%"
        },
        AdaptiveInboxContainerStyle: {
            ...inboxContainerStyle,
        },
        AdaptiveTextingContainerWithInputStyle: {
            ...textingContainerWithInputStyle,
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            height: "100vh",
            width: "100vw",
            maxHeight: "100vh",
        },
        AdaptiveTextingConatinerScrollFromTop: {
            ...textingConatinerScrollFromTop,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        },
        AdaptiveTextingContainerScrollFromBottom: {
            ...textingConatinerScrollFromBottom
        },
        AdaptiveTextingContainerWithScroll: {
            ...textingContainerWithScroll
        },
        AdaptiveMessageContainerStyle: {
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            backgroundColor: "#F5F8FA",
            alignItems: "center",
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            padding: "0 20px 0 10px",
            height: "50px",
        },
        AdaptiveAvatarStyle: {
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            marginRight: "10px",
        }
    };

    const mdStyles = {
        AdaptiveLeftBlockAndRightBlockContainer: {
            ...leftBlockAndRightBlockContainer,
            width: "800px"
        },
        AdaptiveLeftBlockInboxAndSearch: {
            ...leftBlockInboxAndSearch,
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
        },
        AdaptiveInboxContainerStyle: {
            ...inboxContainerStyle,
        },
        AdaptiveTextingContainerWithInputStyle: {
            ...textingContainerWithInputStyle,
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            height: "100vh",
            maxHeight: "100vh",
        },
        AdaptiveTextingConatinerScrollFromTop: {
            ...textingConatinerScrollFromTop,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        },
        AdaptiveTextingContainerScrollFromBottom: {
            ...textingConatinerScrollFromBottom
        },
        AdaptiveTextingContainerWithScroll: {
            ...textingContainerWithScroll,
        },
        AdaptiveMessageContainerStyle: {
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            backgroundColor: "#F5F8FA",
            alignItems: "center",
            minHeight: "80px",
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            padding: "0 20px 0 10px",
        },
        AdaptiveAvatarStyle: {
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "10px",
        }
    };

    const lgStyles = {
        AdaptiveLeftBlockAndRightBlockContainer: {
            ...leftBlockAndRightBlockContainer,
            width: "900px"
        },
        AdaptiveLeftBlockInboxAndSearch: {
            ...leftBlockInboxAndSearch,
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
        },
        AdaptiveInboxContainerStyle: {
            ...inboxContainerStyle,
        },
        AdaptiveTextingContainerWithInputStyle: {
            ...textingContainerWithInputStyle,
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            height: "100vh",
            maxHeight: "100vh",
        },
        AdaptiveTextingConatinerScrollFromTop: {
            ...textingConatinerScrollFromTop,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        },
        AdaptiveTextingContainerScrollFromBottom: {
            ...textingConatinerScrollFromBottom
        },
        AdaptiveTextingContainerWithScroll: {
            ...textingContainerWithScroll,
        },
        AdaptiveMessageContainerStyle: {
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            backgroundColor: "#F5F8FA",
            alignItems: "center",
            minHeight: "80px",
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            padding: "0 20px 0 10px",
        },
        AdaptiveAvatarStyle: {
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "10px",
        }
    };

    const xlStyles = {
        AdaptiveLeftBlockAndRightBlockContainer: {
            ...leftBlockAndRightBlockContainer,
            width: "900px"
        },
        AdaptiveLeftBlockInboxAndSearch: {
            ...leftBlockInboxAndSearch,
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
        },
        AdaptiveInboxContainerStyle: {
            ...inboxContainerStyle,
        },
        AdaptiveTextingContainerWithInputStyle: {
            ...textingContainerWithInputStyle,
            borderRight: "1px solid rgba(0, 0, 0, 0.1)",
            height: "100vh",
            maxHeight: "100vh",
        },
        AdaptiveTextingConatinerScrollFromTop: {
            ...textingConatinerScrollFromTop,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        },
        AdaptiveTextingContainerScrollFromBottom: {
            ...textingConatinerScrollFromBottom
        },
        AdaptiveTextingContainerWithScroll: {
            ...textingContainerWithScroll,
        },
        AdaptiveMessageContainerStyle: {
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            backgroundColor: "#F5F8FA",
            alignItems: "center",
            minHeight: "80px",
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            padding: "0 20px 0 10px",
        },
        AdaptiveAvatarStyle: {
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "10px",
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

    const fetchMessages = async () => {
        try {
            setIsLoading(true);
            const response1 = await fetch(`${apiUrl}/api/${userId}/inbox`);
            const userData = await response1.json();
            setInboxMessages(userData);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [inbox]);

    useEffect(() => {
        console.log(selectedMessage, "selectedMessage");
    }, [selectedMessage]);

    useEffect(() => {
        try {
            const onConnected = () => {
                stompClient.subscribe(`/user/${userId}/inbox`, newMessage);
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
                        console.warn("message - failed to disconnect the stomp client", e);
                    }
                }else{
                    console.warn("message - no websocket to disconnect from");
                }
            };
        } catch (e) {
            console.warn("message - failed to disconnect the stomp client", e);
        }

    }, []);

    async function sendDataReadMessage(inboxUid) {
        await fetch(`${apiUrl}/api/readMessages`, {
            method: "POST",
            body: JSON.stringify({
                inboxUid: inboxUid,
                userId: userId,
            }),
            headers: { "Content-Type": "application/json" }
        });
    }

    const newMessage = async (payload) => {
        let payloadData = JSON.parse(payload.body);
        let messageData = {
            inboxUid: payloadData.inboxUid,
            userId: payloadData.userId,
            messageId: payloadData.messageId,
            message: payloadData.message,
            createdAt: payloadData.createdAt
        };
        if (selectedMessage.inboxId === payloadData.inboxId) {
            await sendDataReadMessage(payloadData.inboxUid);
        }
        setInboxMessages((prevInboxMessages) => {
            if (prevInboxMessages.some(message => message.inboxId === payloadData.inboxId)) {
                return prevInboxMessages.map(message =>
                    message.inboxId === payloadData.inboxId ? payloadData : message
                );
            } else {
                return [...prevInboxMessages, payloadData];
            }
        });
        dispatch(addMessageFromWebsocket(messageData));
    };

    useEffect(() => {
        if (textingContainerRef.current) {
            textingContainerRef.current.scrollTop = textingContainerRef.current.scrollHeight;
        }
    }, [selectedMessage]);

    useEffect(() => {
        if (isXl && clicked) {
            dispatch(setClickedInboxFalse());
        } else if (isLg && clicked) {
            dispatch(setClickedInboxFalse());
        } else if (isMd && clicked) {
            dispatch(setClickedInboxFalse());
        }
    }, [isXl, isLg, isMd, clicked]);


    const handleScroll = async (event) => {
        if (isFetchingTexts || allTextsLoaded) {
            return;
        }
        setIsFetchingTexts(true);
        try {
            const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
            if (clientHeight - scrollHeight >= scrollTop - 2) {
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
        <div style={styles.AdaptiveLeftBlockAndRightBlockContainer}>
            {!clicked &&
                <div style={styles.AdaptiveLeftBlockInboxAndSearch} data-testid={"message_search_and_inbox_wrapper"}>
                    <HeaderInformation/>
                    <MessageSearch/>
                    <div style={styles.AdaptiveInboxContainerStyle}>
                        {isLoading ? <CircularProgress sx={{ marginTop: "20%", marginLeft: "40%" }}/> :
                            <MessageInbox inboxMessages={inboxMessages} selectedMessage={selectedMessage}
                                          setSelectedMessage={setSelectedMessage}/>}
                    </div>
                </div>
            }
            {isXl || isLg || isMd || clicked ?
                <div style={styles.AdaptiveTextingContainerWithInputStyle}>
                    {clicked && <HeaderInformation/>}
                    {!selectedMessage ? (
                        <div style={styles.AdaptiveTextingConatinerScrollFromTop} ref={textingContainerRef}>
                            <div style={{
                                fontSize: "1.1rem",
                                fontFamily: "'Lato', sans-serif"
                            }} data-testid={"start_chat_text"}>Почніть переписку
                            </div>
                        </div>
                    ) : (
                        <>
                            <div style={styles.AdaptiveMessageContainerStyle}>
                                {selectedMessage.profileImageUrl ?
                                    <img src={selectedMessage.profileImageUrl} alt="Avatar"
                                         style={styles.AdaptiveAvatarStyle}/> :
                                    <Avatar src="#" style={styles.AdaptiveAvatarStyle}/>
                                }
                                <div style={{ flex: "1", height: "40px", overflow: "hidden", }}>
                                    <div style={{ fontFamily: "'Lato', sans-serif" }}>{selectedMessage.name}</div>
                                    <div style={{
                                        fontFamily: "'Lato', sans-serif",
                                        color: "gray",
                                    }}>@{selectedMessage.username}</div>
                                </div>
                            </div>
                            <div onScroll={handleScroll} style={styles.AdaptiveTextingContainerScrollFromBottom}
                                 ref={textingContainerRef}>
                                <TextingMessage
                                    sender={selectedMessage.inboxUid}
                                    receiver={selectedMessage.userId}
                                    selectedMessage2={messages}
                                    key={Math.floor(Math.random() * 1000)}
                                />
                            </div>
                        </>
                    )}
                    <div style={{ ...styles.AdaptiveTextingContainerWithScroll, width: "100%", marginBottom: "20px" }}>
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
                                            onClick={async (event) => {
                                                await fetch(`${apiUrl}/api/addMessage`, {
                                                    method: "POST",
                                                    body: JSON.stringify({
                                                        inboxUid: selectedMessage.inboxUid,
                                                        userId: selectedMessage.userId,
                                                        writtenMessage: inputValue,
                                                    }),
                                                    headers: { "Content-Type": "application/json" },
                                                });
                                                stompClient.send("/app/getMessages", {}, JSON.stringify({
                                                    userId: selectedMessage.userId,
                                                    inboxUid: selectedMessage.inboxUid,
                                                }));
                                                event.preventDefault();
                                                stompClient.send("/app/addMessage", {}, JSON.stringify({
                                                    userId: selectedMessage.userId,
                                                    inboxUid: selectedMessage.inboxUid,
                                                    writtenMessage: inputValue,
                                                }));
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
                </div> : null}
        </div>
    );
}
