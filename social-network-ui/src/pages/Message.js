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
    const page = useSelector(state => state.pageCountMessage.page);
    const maxAmountOfPages = useSelector(state => state.pageCountMessage.maxAmountOfPages);
    const userId = useSelector((state) => state.userData.userData.userId);
    const [selectedMessage, setSelectedMessage] = useState(null);
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
            height:"100vh",
            width:"100vw",
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
            height:"100vh",
            width:"100vw",
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
            height:"100vh",
            width:"100vw",
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
        dispatch(setClickedInboxFalse());
    } else if (isLg) {
        styles = lgStyles;
        dispatch(setClickedInboxFalse());
    } else if (isMd) {
        styles = mdStyles;
        dispatch(setClickedInboxFalse());
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
            const response1 = await fetch(`${apiUrl}/api/${userId}/inbox`);
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
            console.log(userId)
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
            console.log(payloadData, "PayloadData")
    };

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
            {!clicked &&
                <div style={styles.AdaptiveLeftBlockInboxAndSearch}>
                    <HeaderInformation />
                    <MessageSearch/>
                    <div style={styles.AdaptiveInboxContainerStyle}>
                        <MessageInbox inboxMessages={inboxMessages} handleSelectMessage={handleSelectMessage}/>
                    </div>
                </div>
            }
            {isXl || isLg || isMd || clicked ?
            <div style={styles.AdaptiveTextingContainerWithInputStyle}>
                {clicked && <HeaderInformation />}
                {selectedMessage === null ? (
                    <div style={styles.AdaptiveTextingConatinerScrollFromTop} ref={textingContainerRef}>
                        <div style={{fontSize: "1.1rem",
                            fontFamily: "'Lato', sans-serif"}}>Почніть переписку</div>
                    </div>
                ) : (
                    <>
                        <div style={styles.AdaptiveMessageContainerStyle}>
                            {selectedMessage.profileImageUrl ?
                                <img src={selectedMessage.profileImageUrl} alt="Avatar" style={styles.AdaptiveAvatarStyle} /> :
                                <Avatar alt={sender} src="#" style={styles.AdaptiveAvatarStyle}/>
                            }
                            <div style={{flex: "1", height: "40px", overflow: "hidden",}}>
                                <div style={{fontFamily: "'Lato', sans-serif"}}>{selectedMessage.name}</div>
                                <div style={{fontFamily: "'Lato', sans-serif", color: "gray",}}>@{selectedMessage.username}</div>
                            </div>
                        </div>
                        <div onScroll={handleScroll} style={styles.AdaptiveTextingContainerScrollFromBottom} ref={textingContainerRef}>
                            <TextingMessage
                                sender={selectedMessage.inboxUid}
                                receiver={selectedMessage.userId}
                                selectedMessage={messages}
                                key={Math.floor(Math.random() * 1000)}
                            />
                        </div>
                    </>
                )}

                <div style={{...styles.AdaptiveTextingContainerWithScroll, width:"100%"}}>
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
            </div>: null}
        </div>
    );
}
