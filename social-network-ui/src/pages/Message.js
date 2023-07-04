import React, { useEffect, useCallback, useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { apiUrl } from "../apiConfig";
import { InboxMessage } from "../components/Messages/Inbox/InboxMessage";
import { Button, TextField, Typography } from "@mui/material";
import { TextingMessage } from "../components/Messages/FullTexting/TextingMessage";
import { MessageSearch } from "../components/Messages/Inbox/MessageSearch";
import { MessageInbox } from "../components/Messages/Inbox/MessageInbox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import {
    leftBlockInboxAndSearch, inboxContainerStyle,
    textingContainerWithInputStyle, leftBlockAndRightBlockContainer,
    textingContainerWithScroll, textingConatinerScrollFromBottom,
    textingConatinerScrollFromTop, DarkTextingContainerWithScroll
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
import EmojiPicker from "emoji-picker-react";

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
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    const emojiPickerRef = useRef();
    const darkMode = useSelector(state => state.userData.userMode.darkMode);

    useEffect(() => {
        console.log(selectedMessage, "selectedMessageFROMMESSAGEEL");
    }, [selectedMessage]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target) &&
                event.target !== document.getElementById("emoji-icon")
            ) {
                setIsOpenEmoji(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpenEmoji, emojiPickerRef]);

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
            border: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
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
        AdaptiveTextingContainerWithScroll: darkMode ? {...DarkTextingContainerWithScroll} : {...textingContainerWithScroll},
        AdaptiveMessageContainerStyle: {
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            padding: "0 20px 0 10px",
            height: "50px",
            backgroundColor: darkMode ? "rgb(21, 32, 43)" : "#F5F8FA",
            border: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
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
            border: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
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
        AdaptiveTextingContainerWithScroll: darkMode ? {...DarkTextingContainerWithScroll} : {...textingContainerWithScroll},
        AdaptiveMessageContainerStyle: {
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            padding: "0 20px 0 10px",
            height: "50px",
            backgroundColor: darkMode ? "rgb(21, 32, 43)" : "#F5F8FA",
            border: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
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
            maxWidth: "500px",
            border: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
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
        AdaptiveTextingContainerWithScroll: darkMode ? {...DarkTextingContainerWithScroll} : {...textingContainerWithScroll},
        AdaptiveMessageContainerStyle: {
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            padding: "0 20px 0 10px",
            height: "50px",
            backgroundColor: darkMode ? "rgb(21, 32, 43)" : "#F5F8FA",
            border: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
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
            width: "800px",
            border: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
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
        AdaptiveTextingContainerWithScroll: darkMode ? {...DarkTextingContainerWithScroll} : {...textingContainerWithScroll},
        AdaptiveMessageContainerStyle: {
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            minHeight: "80px",
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            padding: "0 20px 0 10px",
            backgroundColor: darkMode ? "rgb(21, 32, 43)" : "#F5F8FA",
            border: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
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
            width: "900px",
            border: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
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
        AdaptiveTextingContainerWithScroll: darkMode ? {...DarkTextingContainerWithScroll} : {...textingContainerWithScroll},
        AdaptiveMessageContainerStyle: {
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            minHeight: "80px",
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            padding: "0 20px 0 10px",
            backgroundColor: darkMode ? "rgb(21, 32, 43)" : "#F5F8FA",
            border: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
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
            width: "900px",
            border: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
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
        AdaptiveTextingContainerWithScroll: darkMode ? {...DarkTextingContainerWithScroll} : {...textingContainerWithScroll},
        AdaptiveMessageContainerStyle: {
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            minHeight: "80px",
            fontFamily: "'Lato', sans-serif",
            flexGrow: 1,
            padding: "0 20px 0 10px",
            backgroundColor: darkMode ? "rgb(21, 32, 43)" : "#F5F8FA",
            border: darkMode ? "1px solid rgb(56, 68, 77)" : "1px solid rgba(0, 0, 0, 0.1)",
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
            console.log(userData);
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
                if (stompClient.connected) {
                    try {
                        stompClient.disconnect();
                    } catch (e) {
                        console.warn("message - failed to disconnect the stomp client", e);
                    }
                } else {
                    console.warn("message - no websocket to disconnect from");
                }
            };
        } catch (e) {
            console.warn("message - failed to disconnect the stomp client", e);
        }

    }, []);

    const newMessage = async (payload) => {
        let payloadData = JSON.parse(payload.body);
        let messageData = {
            inboxUid: payloadData.inboxUid,
            userId: payloadData.userId,
            messageId: payloadData.messageId,
            message: payloadData.message,
            createdAt: payloadData.createdAt
        };
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
        if(payloadData.userId == userId) {
            await fetch(`${apiUrl}/api/readMessages`, {
                method: "POST",
                body: JSON.stringify({
                    userId: messageData.userId,
                    inboxUid: messageData.inboxUid,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    };

    useEffect(() => {
        console.log(messages);
    }, [messages]);

    useEffect(() => {
        if (textingContainerRef.current) {
            textingContainerRef.current.scrollTop = textingContainerRef.current.scrollHeight;
        }
    }, [selectedMessage]);

    useEffect(() => {
        console.log(clicked);
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

    const handleSend = async (event) => {
        event.preventDefault();
        await fetch(`${apiUrl}/api/addMessage`, {
            method: "POST",
            body: JSON.stringify({
                inboxUid: selectedMessage.inboxUid,
                userId: selectedMessage.userId,
                writtenMessage: inputValue,
            }),
            headers: { "Content-Type": "application/json" },
        });
        stompClient.send("/app/addMessage", {}, JSON.stringify({
            userId: selectedMessage.userId,
            inboxUid: selectedMessage.inboxUid,
            writtenMessage: inputValue,
        }));
        setInputValue("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSend(event);
        }
    };

    const handleEmojiClick = (emojiData) => {
        const emojiCodePoint = parseInt(emojiData.unified, 16);
        console.log(emojiCodePoint);
        const emojiChar = String.fromCodePoint(emojiCodePoint);
        console.log(emojiChar, "emojiChar");
        setInputValue((prevValue) => prevValue + emojiChar);
    };

    const handleClickOutside = (event) => {
        if (!isOpenEmoji) {
            return;
        }
        if (
            emojiPickerRef.current &&
            !emojiPickerRef.current.contains(event.target) &&
            event.target !== document.getElementById("emoji-icon")
        ) {
            setIsOpenEmoji(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpenEmoji, emojiPickerRef]);

    return (
        <div style={styles.AdaptiveLeftBlockAndRightBlockContainer}>
            {!clicked && (
                <div style={styles.AdaptiveLeftBlockInboxAndSearch} data-testid={"message_search_and_inbox_wrapper"}>
                    <HeaderInformation/>
                    <MessageSearch/>
                    <div style={styles.AdaptiveInboxContainerStyle}>
                        {isLoading ? (
                            <CircularProgress sx={{ marginTop: "20%", marginLeft: "40%" }}/>
                        ) : (
                            <MessageInbox inboxMessages={inboxMessages} selectedMessage={selectedMessage}
                                          stompClient={stompClient} setSelectedMessage={setSelectedMessage}/>
                        )}
                    </div>
                </div>
            )}
            {(isXl || isLg || isMd || clicked) && (
                <div style={styles.AdaptiveTextingContainerWithInputStyle}>
                    {clicked && <HeaderInformation/>}
                    {!selectedMessage ? (
                        <div style={styles.AdaptiveTextingConatinerScrollFromTop} ref={textingContainerRef}>
                            <div style={{
                                fontSize: "1.1rem",
                                fontFamily: "'Lato', sans-serif",
                                color: darkMode ? "rgb(247, 249, 249)" : "#000000"
                            }} data-testid={"start_chat_text"}>Почніть переписку
                            </div>
                        </div>
                    ) : (
                        <>
                            <div style={styles.AdaptiveMessageContainerStyle}>
                                {selectedMessage.profileImageUrl ? (
                                    <img src={selectedMessage.profileImageUrl} alt="Avatar"
                                         style={styles.AdaptiveAvatarStyle}/>
                                ) : (
                                    <Avatar src="#" style={styles.AdaptiveAvatarStyle}/>
                                )}
                                <div style={{ flex: "1", height: "40px", overflow: "hidden" }}>
                                    <div style={{ fontFamily: "'Lato', sans-serif", color: darkMode ? "rgb(247, 249, 249)" : "#000000", }}>{selectedMessage.name}</div>
                                    <div style={{ fontFamily: "'Lato', sans-serif", color: darkMode ? "rgb(139, 152, 165)" : "gray", }}>@{selectedMessage.username}</div>
                                </div>
                            </div>
                            <div onScroll={handleScroll} style={styles.AdaptiveTextingContainerScrollFromBottom}
                                 ref={textingContainerRef}>
                                <TextingMessage sender={selectedMessage.inboxUid} receiver={selectedMessage.userId}
                                                selectedMessage2={messages} key={Math.floor(Math.random() * 1000)}/>
                            </div>
                        </>
                    )}
                    <div style={{ ...styles.AdaptiveTextingContainerWithScroll, width: "100%", position: "relative" }}>
                        {selectedMessage && (
                            <>
                                <TextField
                                    id="outlined-basic"
                                    sx={
                                        darkMode ?
                                            {"& .MuiOutlinedInput-root": {
                                                    background: "rgb(39, 51, 64)",
                                                    color: "rgb(247, 249, 249)",
                                                }
                                            }
                                            :
                                            {backgroundColor: "white"}
                                    }
                                    type="search"
                                    variant="outlined"
                                    placeholder="Input message"
                                    size="small"
                                    value={inputValue}
                                    onChange={(event) => {
                                        event.preventDefault();
                                        console.log("Data from input: " + event.target.value.toString());
                                        setInputValue(event.target.value.toString());
                                    }}
                                    onKeyPress={handleKeyPress}
                                    InputProps={{
                                        endAdornment: (
                                            <>
                                                <EmojiEmotionsIcon
                                                    id="emoji-icon"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        setIsOpenEmoji(!isOpenEmoji);}}
                                                    sx={{ cursor: "pointer", marginRight: "10px", color: "#9e9e9e" }}
                                                />
                                                <Button
                                                    sx={{color: "#9e9e9e", minWidth: "35px", height: "35px", padding: "0", fontSize: "2rem"}}
                                                    onClick={handleSend}
                                                >
                                                    <SendIcon/>
                                                </Button>
                                            </>
                                        ),
                                    }}
                                    style={{ width: "100%"}}
                                />
                                {isOpenEmoji && (
                                    <div ref={emojiPickerRef} style={{ position: "absolute", bottom: "55px", right: "20px", zIndex: "1" }}>

                                        <EmojiPicker emojiStyle={"google"} onEmojiClick={handleEmojiClick} disableSearchBar disableSkinTonePicker/>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
