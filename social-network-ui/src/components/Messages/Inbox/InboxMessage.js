import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl } from "../../../apiConfig";
import { Avatar, Box, Badge } from "@mui/material";
import { differenceInDays, format, formatDistanceToNow } from "date-fns";

const messageContainerStyle = {
    width: "95%",
    boxSizing: "border-box",
    display: "flex",
    padding: "20px 20px",
    borderRadius: "8px",
    backgroundColor: "rgb(245, 248, 250)",
    marginBottom: "10px",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0)",
    "&:hover": {
        backgroundColor: "rgb(237, 239, 242)", // Более нежный оттенок серого с голубизной
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Сделаем тень более мягкой
        transform: "translateY(-2px)",
    }
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

export const InboxMessage = ({ image, senderName, sender, receiver, message, date, handleClick, unreadMessage }) => {
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
        <Box sx={messageContainerStyle} onClick={handleClick}>
            {image

                ? <Badge color="primary" badgeContent={unreadMessage}>
                    <img src={image} alt="Avatar" style={{...avatarStyle, marginRight:"0"}}/>
                </Badge>
                : <Badge color="primary" badgeContent={unreadMessage}>
                    <Avatar alt={senderName} src="#" style={{...avatarStyle, marginRight:"0"}}/>
                </Badge>
            }
            <div style={{...contentStyle, marginLeft:"20px"}}>
                <div style={senderStyle}>{senderName}</div>
                <div style={messageStyle}>{message}</div>
            </div>
            {message && <div style={dateStyle}>{postDate()}</div>}
        </Box>
    );
};

InboxMessage.propTypes = {
    unreadMessage: PropTypes.number,
    senderName: PropTypes.string,
    sender: PropTypes.number,
    receiver: PropTypes.number,
    message: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
    handleClick: PropTypes.func,
};

