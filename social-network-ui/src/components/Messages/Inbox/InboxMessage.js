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
const DarkMessageContainerStyle = {
    width: "95%",
    boxSizing: "border-box",
    display: "flex",
    padding: "20px 20px",
    borderRadius: "8px",
    backgroundColor: "rgb(39, 51, 64)",
    marginBottom: "10px",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0)",
    "&:hover": {
        backgroundColor: "rgba(247, 249, 249, 0.25)", // Более нежный оттенок серого с голубизной
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
const DarkSenderStyle = {
    marginBottom: "5px",
    fontFamily: "'Lato', sans-serif",
    color: "rgb(247, 249, 249)"
};

const messageStyle = {
    fontSize: "14px",
    fontFamily: "'Lato', sans-serif",
};
const DarkMessageStyle = {
    fontSize: "14px",
    fontFamily: "'Lato', sans-serif",
    color: "rgb(247, 249, 249)"
};

const dateStyle = {
    marginLeft: "auto",
    fontSize: "12px",
    color: "#657786",
    fontFamily: "'Lato', sans-serif",
};

export const InboxMessage = ({
                                 inboxId,
                                 image,
                                 senderName,
                                 sender,
                                 receiver,
                                 message,
                                 date,
                                 handleClick,
                                 unreadMessage,
                                 selectedMessage,
                                 clickedMessages
                             }) => {
    const darkMode = useSelector(state => state.userData.userMode.darkMode);
    const postDate = () => {
        const date2 = new Date(date);
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            timeZone: userTimezone,
            locale: "en-US", // Указываем полный идентификатор языка
        };

        const formatter = new Intl.DateTimeFormat(undefined, options);
        const parts = formatter.formatToParts(date2);
        const formattedDate = parts.map(part => {
            if (part.type === "literal") {
                return part.value;
            }
            return part.value.toLowerCase();
        }).join("");

        const currentDate = new Date();
        const timeDiffInMinutes = Math.round((currentDate - date2) / (1000 * 60));

        return formattedDate;

    };

    const formatDateWithTimezone = (date, format) => {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const options = { timeZone: userTimezone, year: "numeric", month: "2-digit", day: "2-digit" };

        const formattedDate = date.toLocaleString(undefined, options);
        return formattedDate;
    };
    return (
        <Box sx={darkMode ? DarkMessageContainerStyle : messageContainerStyle} onClick={handleClick}>
            {image

                ? <Badge color="primary" badgeContent={clickedMessages.includes(inboxId) ? 0 : unreadMessage}>
                    <img src={image} alt="Avatar" style={{ ...avatarStyle, marginRight: "0" }}/>
                </Badge>
                : <Badge color="primary" badgeContent={clickedMessages.includes(inboxId) ? 0 : unreadMessage}>
                    <Avatar alt={senderName} src="#" style={{ ...avatarStyle, marginRight: "0" }}/>
                </Badge>
            }
            <div style={{ ...contentStyle, marginLeft: "20px" }}>
                <div style={darkMode ? DarkSenderStyle : senderStyle}>{senderName}</div>
                <div style={darkMode ? DarkMessageStyle : messageStyle}>{message}</div>
            </div>
            {message && <div style={dateStyle}>{postDate()}</div>}
        </Box>
    );
};

InboxMessage.propTypes = {
    clickedMessages: PropTypes.any,
    inboxId: PropTypes.any,
    selectedMessage: PropTypes.any,
    unreadMessage: PropTypes.number,
    senderName: PropTypes.string,
    sender: PropTypes.number,
    receiver: PropTypes.number,
    message: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
    handleClick: PropTypes.func,
};

