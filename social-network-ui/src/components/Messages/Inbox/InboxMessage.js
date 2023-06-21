import React, { useEffect, useContext, useState } from "react";import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { apiUrl } from "../../../apiConfig";
import { Avatar } from "@mui/material";
import { differenceInDays, format, formatDistanceToNow } from "date-fns";

const messageContainerStyle = {
    width: "95%",
    boxSizing: "border-box",
    display: "flex",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#F5F8FA",
    marginBottom: "10px",
    alignItems: "center"
  };
  
  const avatarStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  };
  
  const contentStyle = {
    flex: "1",
    height: "40px",
    overflow: "hidden",
  };
  
  const senderStyle = {
    marginBottom: "5px",
      fontFamily: "'Lato', sans-serif",
  };
  
  const messageStyle = {
    fontSize: "14px",
      fontFamily: "'Lato', sans-serif",
  };

  const dateStyle = {
    marginLeft: "auto",
    fontSize: "12px",
    color: "#657786",
      fontFamily: "'Lato', sans-serif",
  };





export const InboxMessage = ({image, senderName, sender, receiver, message, date, handleClick }) => {
    const postDate = () => {
        const date2 = new Date(date);
        const diffDays = differenceInDays(new Date(), date2);

        if (diffDays < 1) {
            return formatDistanceToNow(date2, { addSuffix: true });
        } else if (diffDays < 365) {
            return format(date2, "MMM d");
        } else {
            return format(date2, "MMM d, yyyy");
        }
    };

  return (
    <div style={messageContainerStyle} onClick={handleClick}>
     {/* <div style={messageContainerStyle}> */}
        {image?
      <img src={image} alt="Avatar" style={avatarStyle} /> : <Avatar alt={senderName} src="#" style={avatarStyle}/>}
      <div style={contentStyle}>
        <div style={senderStyle}>{senderName}</div>
        <div style={messageStyle}>{message}</div>
      </div>
      <div style={dateStyle}>{postDate()}</div>
    </div>
  );
}

InboxMessage.propTypes = {
  senderName: PropTypes.string.isRequired,
  sender: PropTypes.number.isRequired,
  receiver: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

