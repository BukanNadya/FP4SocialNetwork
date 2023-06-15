import React, { useEffect, useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from '@mui/icons-material/Send';
import { apiUrl } from "../apiConfig";
import { InboxMessage } from "../components/Messages/Inbox/InboxMessage";
import { Button, TextField } from "@mui/material";
import { TextingMessage } from "../components/Messages/FullTexting/TextingMessage";
import { Search } from "../components/Messages/Inbox/Search";
import { leftBlockInboxAndSearch, inboxContainerStyle,
  textingContainerWithInputStyle, leftBlockAndRightBlockContainer,
  textingContainerWithScroll, textingConatinerScroll } from "./pagesStyles/MessageStyles";
import { setMessages } from "../store/actions";

export function Message() {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages.message);
  const [selectedMessage, setSelectedMessage] = useState(null);
  
  const [inputValue, setInputValue] = useState('');
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

  function LoadAllMessages() {
    const userId = useSelector(state => state.userData.userData.userId);
    const [inboxMessages, setInboxMessages] = useState([]);

    const fetchMessages = async () => {
      const response1 = await fetch(`${apiUrl}/api/inbox/66`);
      const userData = await response1.json();

      if (userData[0]) {
        const formattedMessages = userData.map((item) => {
          const dateString = item.createdAt;
          const date = new Date(dateString);
          const options = { month: 'long', day: 'numeric', year: 'numeric' };
          const formattedDate = date.toLocaleDateString('en-US', options);
          return (
            <InboxMessage
              key={item.userId}
              senderName={item.name}
              sender={item.inboxUid}
              receiver={item.userId}
              message={item.message}
              date={formattedDate}
              handleClick={(event) => {
                event.preventDefault();
                handleSelectMessage(item)}
              }
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
    }, []);

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

  return (
    <div style={leftBlockAndRightBlockContainer}>
      <div style={leftBlockInboxAndSearch}>
        <Search />
        <div style={inboxContainerStyle}>
          <LoadAllMessages />
        </div>
      </div>
      <div style={textingContainerWithInputStyle}>
        <div style={textingConatinerScroll} ref={textingContainerRef}>
          {selectedMessage === null ? (
            <div>No texting</div>
          ) : (
            <>
              <TextingMessage
                sender={selectedMessage.inboxUid}
                receiver={selectedMessage.userId}
                selectedMessage={selectedMessage}
                key={selectedMessage.inboxUid}
              />
            </>
          )}
        </div>
        <div style={textingContainerWithScroll}>
          {selectedMessage && (
            <TextField
              id="outlined-basic"
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
                      };
                      fetchPostTexting();
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
