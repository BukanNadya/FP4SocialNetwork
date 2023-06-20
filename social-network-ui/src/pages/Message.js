import React, { useEffect, useCallback, useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from '@mui/icons-material/Send';
import { apiUrl } from "../apiConfig";
import { InboxMessage } from "../components/Messages/Inbox/InboxMessage";
import { Button, TextField } from "@mui/material";
import { TextingMessage } from "../components/Messages/FullTexting/TextingMessage";
import {MessageSearch} from "../components/Messages/Inbox/MessageSearch";
import { leftBlockInboxAndSearch, inboxContainerStyle,
  textingContainerWithInputStyle, leftBlockAndRightBlockContainer,
  textingContainerWithScroll, textingConatinerScrollFromBottom,
  textingConatinerScrollFromTop } from "./pagesStyles/MessageStyles";
import PropTypes from 'prop-types';
import { fetchTextsByPage } from "../store/actions";
import { setMessages, setPageForMessage, setPageZeroForMessaging } from "../store/actions";
import SockJS from "sockjs-client";
import {over} from 'stompjs';

function LoadAllMessages({ userId, handleSelectMessage }) {
  LoadAllMessages.propTypes = {
    userId: PropTypes.string.isRequired,
    handleSelectMessage: PropTypes.func.isRequired,
  };
  const [inboxMessages, setInboxMessages] = useState([]);
  const page = useSelector(state => state.pageCountMessage.page);
  const dispatch = useDispatch();
  var stompClient = null;
  
  const fetchMessages = async () => {
    const response1 = await fetch(`${apiUrl}/api/inbox/${userId}`);
    const userData = await response1.json();

    const connect =()=>{
      let Sock = new SockJS(`${apiUrl}/websocket`);
      stompClient = over(Sock);
      stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
      stompClient.subscribe(`/user/inbox/${userId}`, newMessage);
    }

    const onError = (err) => {
      console.log(err);
    }

    const newMessage = (payload)=>{
      console.log(payload);
      var payloadData = JSON.parse(payload.body);
      let list =[];
      list.push(payloadData);
      inboxMessages.set(payloadData.inboxUid,list);
      inboxMessages.set(payloadData.userId,list);
      inboxMessages.set(payloadData.body,list);
      inboxMessages.set(payloadData.day,list);
      setInboxMessages(new Map(inboxMessages));
    }
    connect();
    
    if (userData[0]) {
      const formattedMessages = userData.map((item) => {
        console.log(item);
        const dateString = item.createdAt;
        const date = new Date(dateString);
        const options = {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return (
          <InboxMessage
            key={item.userId}
            image={item.profileImageUrl}
            senderName={item.name}
            sender={item.inboxUid}
            receiver={item.userId}
            message={item.message}
            date={formattedDate}
            handleClick={(event) => {
              event.preventDefault();
              handleSelectMessage(item);
              dispatch(setPageZeroForMessaging());
              console.log(item.inboxUid);
              dispatch(fetchTextsByPage(item.userId, userId, 0))
            }}
          />
        );
      });
      setInboxMessages(formattedMessages);
    } else {
      setInboxMessages([]);
    }
  };

  useEffect(() => {
    fetchMessages();
    console.log("Message useEffect");
  }, []); // Зміна тут: передавання порожнього масиву залежностей

  return (
    <div>
      {inboxMessages.length > 0 ? (
        inboxMessages
      ) : (
        <>
          <div>Немає повідомлень</div>
          <Button variant="contained">Написати повідомлення</Button>
        </>
      )}
    </div>
  );
}

export function Message() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const page = useSelector(state => state.pageCountMessage.page);
  const maxAmountOfPages = useSelector(state => state.pageCountMessage.maxAmountOfPages);
  var stompClient = null;
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isFetchingTexts, setIsFetchingTexts] = useState(false);
  const [allTextsLoaded, setAllTextsLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  // const loadingPostsRef = useRef(false);
  // const allPostsLoadedRef = useRef(false);

  const textingContainerRef = useRef(null);

  useEffect(() => {
    if (textingContainerRef.current) {
      textingContainerRef.current.scrollTop = textingContainerRef.current.scrollHeight;
    }
    console.log("Message useEffect REF");
  }, [selectedMessage]);

  function handleSelectMessage(message) {
    setSelectedMessage(message);
  }

  const userId = useSelector((state) => state.userData.userData.userId);

  const handleScroll = async (event) => {
    if (isFetchingTexts || allTextsLoaded) {
        return;
    }
    setIsFetchingTexts(true);
    try {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (clientHeight - scrollHeight >= scrollTop - 2) {
          console.log("page:" + page)
          console.log("maxAmountOfPages" + maxAmountOfPages)
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
  }


  return (
    <div style={leftBlockAndRightBlockContainer}>
      <div style={leftBlockInboxAndSearch}>
        <MessageSearch />
        <div style={inboxContainerStyle}>
          <LoadAllMessages userId={userId} handleSelectMessage={handleSelectMessage}/>
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
                    style = {{ cursor: "pointer", }}
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
                      }
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
