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
import { addMessageFromWebsocket, fetchTextsByPage } from "../store/actions";
import { setMessages, setPageForMessage, setPageZeroForMessaging } from "../store/actions";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


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
    const [isLoading, setIsLoading] = useState(false)



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
            height:"100vh",
            maxHeight:"100vh",
            display: "none"
        },
        AdaptiveTextingConatinerScrollFromTop: {
            ...textingConatinerScrollFromTop,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh",
        },
        AdaptiveTextingContainerScrollFromBottom: {
            ...textingConatinerScrollFromBottom
        },
        AdaptiveTextingContainerWithScroll: {
            ...textingContainerWithScroll,
            width: "100vw"
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
            height:"100vh",
            maxHeight:"100vh",
            display: "none"
        },
        AdaptiveTextingConatinerScrollFromTop: {
            ...textingConatinerScrollFromTop,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh",
        },
        AdaptiveTextingContainerScrollFromBottom: {
            ...textingConatinerScrollFromBottom
        },
        AdaptiveTextingContainerWithScroll: {
            ...textingContainerWithScroll,
            width: "100vw",
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
            height:"100vh",
            maxHeight:"100vh",
            display: "none"
        },
        AdaptiveTextingConatinerScrollFromTop: {
            ...textingConatinerScrollFromTop,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh",
        },
        AdaptiveTextingContainerScrollFromBottom: {
            ...textingConatinerScrollFromBottom
        },
        AdaptiveTextingContainerWithScroll: {
            ...textingContainerWithScroll
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
            height:"100vh",
            maxHeight:"100vh",
        },
        AdaptiveTextingConatinerScrollFromTop: {
            ...textingConatinerScrollFromTop,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh",
        },
        AdaptiveTextingContainerScrollFromBottom: {
            ...textingConatinerScrollFromBottom
        },
        AdaptiveTextingContainerWithScroll: {
            ...textingContainerWithScroll,
            width: "800px"
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
            height:"100vh",
            maxHeight:"100vh",
        },
        AdaptiveTextingConatinerScrollFromTop: {
            ...textingConatinerScrollFromTop,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh",
        },
        AdaptiveTextingContainerScrollFromBottom: {
            ...textingConatinerScrollFromBottom
        },
        AdaptiveTextingContainerWithScroll: {
            ...textingContainerWithScroll,
            width: "900px"
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
            height:"100vh",
            maxHeight:"100vh",
        },
        AdaptiveTextingConatinerScrollFromTop: {
            ...textingConatinerScrollFromTop,
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh",
        },
        AdaptiveTextingContainerScrollFromBottom: {
            ...textingConatinerScrollFromBottom
        },
        AdaptiveTextingContainerWithScroll: {
            ...textingContainerWithScroll,
            width: "900px"
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
        try{
            setIsLoading(true)
            const response1 = await fetch(`${apiUrl}/api/inbox/${userId}`);
            const userData = await response1.json();
            console.log(userData);
            setInboxMessages(userData);
        }finally {
            setIsLoading(false)
        }

    };

    useEffect(() => {
        console.log(selectedMessage, "selectedMessage");
    }, [selectedMessage]);

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
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
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    const newMessage = (payload) => {
        let payloadData = JSON.parse(payload.body);
        setInboxMessages(prevNotifications => {
            const filteredNotifications = prevNotifications.filter(notification => notification.inboxId !== payloadData.inboxId);
            console.log(payloadData)
            dispatch(addMessageFromWebsocket(payloadData));
            return [payloadData, ...filteredNotifications];
        });
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
        <div style={styles.AdaptiveLeftBlockAndRightBlockContainer}>
            <div style={styles.AdaptiveLeftBlockInboxAndSearch}>
                <MessageSearch/>
                <div style={styles.AdaptiveInboxContainerStyle}>
                    <MessageInbox inboxMessages={inboxMessages} handleSelectMessage={handleSelectMessage}/>
                </div>
            </div>
            <div style={styles.AdaptiveTextingContainerWithInputStyle}>
                {selectedMessage === null ? (
                    <div style={styles.AdaptiveTextingConatinerScrollFromTop} ref={textingContainerRef}>
                        <div style={{fontSize: "1.1rem",
                            fontFamily: "'Lato', sans-serif"}}>Почніть переписку</div>
                    </div>
                ) : (
                    <div onScroll={handleScroll} style={styles.AdaptiveTextingContainerScrollFromBottom} ref={textingContainerRef}>
                        <TextingMessage
                            sender={selectedMessage.inboxUid}
                            receiver={selectedMessage.userId}
                            selectedMessage={messages}
                            key={Math.floor(Math.random() * 1000)}
                        />
                    </div>
                )}

                <div style={{...styles.AdaptiveTextingContainerWithScroll, width:"440px"}}>
                    {selectedMessage && (
                        <TextField
                            id="outlined-basic"
                            type="search"
                            sx={{width:"100px"}}
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
                                            event.preventDefault();
                                            stompClient.send("/app/addMessage", {}, JSON.stringify({
                                                userId: selectedMessage.userId,
                                                inboxUid: selectedMessage.inboxUid,
                                                writtenMessage: inputValue,
                                            }));
                                            console.log(selectedMessage.userId,selectedMessage.inboxUid,inputValue)
                                            await fetch(`${apiUrl}/api/addMessage`, {
                                                method: "POST",
                                                body: JSON.stringify({
                                                    inboxUid: selectedMessage.inboxUid,
                                                    userId: selectedMessage.userId,
                                                    writtenMessage: inputValue
                                                }),
                                                headers: { "Content-Type": "application/json" },
                                            });
                                            console.log(selectedMessage.userId, selectedMessage.inboxUid, inputValue);
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
