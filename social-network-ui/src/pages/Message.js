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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";

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
    const isL = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    // const xxsStyles = {
    //     AdaptivePostWrapper: {
    //         width: "50vw",
    //         minWidth: "200px",
    //         display: "flex",
    //         justifyContent: "space-around",
    //         alignItems: "space-around",
    //     },
    //     AdaptiveSendPostField: {
    //         fontSize: "1.3rem",
    //         fontFamily: "'Lato', sans-serif",
    //         width: "65vw",
    //         maxWidth: "300px",
    //         marginTop: "20px",
    //     },
    //     AdaptiveHomeScreenWrapper: {
    //         overflow: "hidden",
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "start",
    //         marginTop: "20px",
    //     },
    //     AdaptiveSendingPostButtonsContainer: {
    //         display: "flex",
    //         justifyContent: "space-between",
    //         width: "50vw",
    //         marginTop: "40px",
    //         marginBottom: "20px",
    //     },
    //     fab: {
    //         position: "fixed",
    //         bottom: "16px",
    //         right: "16px",
    //     },
    //     AdaptiveSvgWrapper: {
    //         display: "none",
    //     },
    //     AdaptivePostImgWrapper: {
    //         ...PostImgWrapper, marginTop: "10px"
    //     }
    // };

    // const xsStyles = {
    //     AdaptivePostWrapper: {
    //         width: "50vw",
    //         paddingBottom: "40px",
    //         minWidth: "200px",
    //         display: "flex",
    //         justifyContent: "space-around",
    //         alignItems: "space-around",
    //     },
    //     AdaptiveHomeScreenWrapper: {
    //         overflow: "hidden",
    //         display: "flex",
    //         flexDirection: "column",
    //         marginTop: "20px",
    //     },
    //     AdaptiveSendingPostButtonsContainer: {
    //         display: "flex",
    //         justifyContent: "space-between",
    //         width: "70vw",
    //         marginTop: "40px",
    //         marginBottom: "20px",
    //     },
    //     AdaptiveSendPostField: {
    //         fontSize: "1.3rem",
    //         fontFamily: "'Lato', sans-serif",
    //         width: "70vw",
    //         marginTop: "20px",
    //     },
    //     fab: {
    //         position: "fixed",
    //         bottom: "16px",
    //         right: "16px",
    //     },
    //     AdaptiveSvgWrapper: {
    //         display: "none",
    //     },
    //     AdaptivePostImgWrapper: {
    //         ...PostImgWrapper, marginTop: "10px"
    //     }
    // };

    // const smStyles = {
    //     AdaptivePostWrapper: {
    //         width: "470px",
    //         paddingBottom: "40px",
    //         display: "flex",
    //         justifyContent: "space-around",
    //         alignItems: "space-around",
    //         borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    //     },
    //     AdaptiveHomeScreenWrapper: {
    //         width: "470px",
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "start",
    //         marginTop: "20px",
    //     },
    //     AdaptiveSendingPostButtonsContainer: {
    //         display: "flex",
    //         justifyContent: "space-between",
    //         maxWidth: "400px",
    //         width: "350px",
    //         marginTop: "40px",
    //         marginBottom: "20px",
    //     },
    //     AdaptiveSendPostField: {
    //         fontSize: "1.3rem",
    //         fontFamily: "'Lato', sans-serif",
    //         width: "350px",
    //         maxWidth: "600px",
    //         marginTop: "20px",
    //     },
    //     fab: {
    //         position: "fixed",
    //         bottom: "16px",
    //         right: "16px",
    //     },

    // };

    // const mdStyles = {
    //     AdaptivePostWrapper: {
    //         width: "600px",
    //         paddingBottom: "40px",
    //         display: "flex",
    //         justifyContent: "space-around",
    //         alignItems: "space-around",
    //         borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    //     },
    //     AdaptiveHomeScreenWrapper: {
    //         width: "600px",
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "center",
    //         marginTop: "20px",
    //     },
    //     AdaptiveSendingPostButtonsContainer: {
    //         display: "flex",
    //         justifyContent: "space-between",
    //         maxWidth: "400px",
    //         width: "400px",
    //         marginTop: "40px",
    //         marginBottom: "20px",
    //     },
    //     AdaptiveSendPostField: {
    //         fontSize: "1.3rem",
    //         fontFamily: "'Lato', sans-serif",
    //         width: "450px",
    //         maxWidth: "600px",
    //         marginTop: "20px",
    //     },
    //     fab: {
    //         position: "fixed",
    //         bottom: "16px",
    //         right: "16px",
    //     },
    // };

    // const lgStyles = {
    //     AdaptiveLeftBlockAndRightBlockContainer: {
    //         ...leftBlockAndRightBlockContainer,
    //     },
    //     AdaptiveLeftBlockInboxAndSearch: {
    //         ...leftBlockInboxAndSearch,
    //         borderRight: "1px solid rgba(0, 0, 0, 0.1)",
    //     },
    //     AdaptiveInboxContainerStyle: {
    //         ...inboxContainerStyle,
    //     },
    //     AdaptiveTextingContainerWithInputStyle: {
    //         ...textingContainerWithInputStyle,
    //         borderRight: "1px solid rgba(0, 0, 0, 0.1)",
    //         height:"100vh",
    //         maxHeight:"100vh",
    //     },
    //     AdaptiveTextingConatinerScrollFromTop: {
    //         ...textingConatinerScrollFromTop,
    //         display:"flex",
    //         justifyContent:"center",
    //         alignItems:"center",
    //         height:"100vh",
    //     },
    //     AdaptiveTextingContainerScrollFromBottom: {
    //         ...textingConatinerScrollFromBottom
    //     },
    //     AdaptiveTextingContainerWithScroll: {
    //         ...textingContainerWithScroll
    //     }
    // };

    const lStyles = {
        AdaptiveLeftBlockAndRightBlockContainer: {
            ...leftBlockAndRightBlockContainer,
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
            ...textingContainerWithScroll
        }
    };

    const xlStyles = {
        AdaptiveLeftBlockAndRightBlockContainer: {
            ...leftBlockAndRightBlockContainer,
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
            ...textingContainerWithScroll
        }
    };

    let styles;
    if (isXl) {
        styles = xlStyles;
    } else if (isL) {
        styles = lStyles;
    }
    // else if (isLg) {
    //     styles = lgStyles;
    // }
    // else if (isMd) {
    //     styles = mdStyles;
    // } else if (isSm) {
    //     styles = smStyles;
    // } else if (isXs) {
    //     styles = xsStyles;
    // } else {
    //     styles = xxsStyles;
    // }






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
        const connect = () => {
            let Sock = new SockJS(`${apiUrl}/websocket`);
            stompClient = over(Sock);
            stompClient.connect({}, onConnected, onError);
        };
        const onConnected = () => {
            stompClient.subscribe(`/user/66/inbox`, newMessage);
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

                <div style={styles.AdaptiveTextingContainerWithScroll}>
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
                                            event.preventDefault();
                                            stompClient.send("/app/addMessage", {}, JSON.stringify({
                                                userId: selectedMessage.userId,
                                                inboxUid: selectedMessage.inboxUid,
                                                writtenMessage: inputValue,
                                            }));
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
