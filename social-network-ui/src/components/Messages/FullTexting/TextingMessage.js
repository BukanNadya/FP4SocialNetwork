import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl } from "../../../apiConfig";
import { GenerateBlueMessage } from "./BlueMessage";
import { GenerateWhiteMessage } from "./WhiteMessage";
import PropTypes from "prop-types";

export function TextingMessage({ sender, receiver, selectedMessage }) {
  const [inboxMessagesClick, setInboxMessagesClick] = useState(null);

  const fetchTexting = async () => {
    const response = await fetch(`${apiUrl}/api/getMessages`, {
      method: "POST",
      body: JSON.stringify({
        inboxUid: sender,
        userId: receiver,
      }),
      headers: { "Content-Type": "application/json" }
    });
    const textingData = await response.json();
    if (textingData[0]) {
      console.log(textingData);
      let index = 0;
      const formattedMessages = textingData.map((item) => {
        console.log(item);
        const dateString = item.createdAt;
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        if (item.userId === 66) {
            index++;
            return (
              <GenerateBlueMessage
                key={index}
                text={item.message}
                timestampText={formattedDate}
              />
            );
          } else {
            index++;
            return (
              <GenerateWhiteMessage
                key={index}
                text={item.message}
                timestampText={formattedDate}
              />
            );
            
          }
      });
      setInboxMessagesClick(formattedMessages);
    } else {
      setInboxMessagesClick(null);
    }
  };

  useEffect(() => {
    fetchTexting();
    console.log("Texting message useEffect");
  }, [sender, receiver]);

  return (
    <div>
      {inboxMessagesClick != null ? (
        inboxMessagesClick
      ) : (
        <div>No texting</div>
      )}
    </div>
  );
}

TextingMessage.propTypes = {
  sender: PropTypes.number.isRequired,
  receiver: PropTypes.number.isRequired,
  selectedMessage: PropTypes.object.isRequired,
};