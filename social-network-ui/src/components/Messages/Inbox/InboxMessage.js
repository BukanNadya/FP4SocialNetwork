import React, { useEffect, useContext, useState } from "react";import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { apiUrl } from "../../../apiConfig";

const messageContainerStyle = {
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
    fontWeight: "bold",
    marginBottom: "5px",
  };
  
  const messageStyle = {
    fontSize: "14px",
  };

  const dateStyle = {
    marginLeft: "auto",
    fontSize: "12px",
    color: "#657786",
  };





export const InboxMessage = ({image, senderName, sender, receiver, message, date, handleClick }) => {
  return (
    <div style={messageContainerStyle} onClick={handleClick}>
     {/* <div style={messageContainerStyle}> */}
      <img src={image} alt="Avatar" style={avatarStyle} />
      <div style={contentStyle}>
        <div style={senderStyle}>{senderName}</div>
        <div style={messageStyle}>{message}</div>
      </div>
      <div style={dateStyle}>{date}</div>
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

