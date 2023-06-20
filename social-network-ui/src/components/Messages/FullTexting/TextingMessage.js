import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl } from "../../../apiConfig";
import { GenerateBlueMessage } from "./BlueMessage";
import { GenerateWhiteMessage } from "./WhiteMessage";
import PropTypes from "prop-types";

export function TextingMessage({ sender, receiver, selectedMessage }) {
  const userId = useSelector((state) => state.userData.userData.userId);

  const formattedMessages = selectedMessage.map((item) => {
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

    if (parseInt(item.userId) === parseInt(userId)) {
      return (
        <GenerateBlueMessage
          key={Math.floor(Math.random() * 10000)}
          text={item.message}
          timestampText={formattedDate}
        />
      );
    } else {
      return (
        <GenerateWhiteMessage
          key={Math.floor(Math.random() * 100)}
          text={item.message}
          timestampText={formattedDate}
        />
      );
    }
  });

  return (
    <div>
      {formattedMessages.length > 0 ? (
        formattedMessages
      ) : (
        <div>No texting</div>
      )}
    </div>
  );
}


TextingMessage.propTypes = {
  sender: PropTypes.number.isRequired,
  receiver: PropTypes.number.isRequired,
  selectedMessage: PropTypes.array.isRequired,
};