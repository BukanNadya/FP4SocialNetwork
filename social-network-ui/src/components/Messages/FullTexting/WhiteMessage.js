import React from "react";
import PropTypes from 'prop-types';
import { WhiteMessageContainer, TimestampStyled,
  TimestampContainer, WhiteMessageTextWrap,
  WhiteMessageTextStyled } from "./MessagesStyle";

export const GenerateWhiteMessage = ({text, timestampText}) => {
    return (
      <div style={WhiteMessageContainer}>
        <div style={WhiteMessageTextWrap}>
          <div style={{...WhiteMessageTextStyled,  fontFamily: "'Lato', sans-serif",
              fontSize: "15px",
              lineHeight: "23px",}}>{text}</div>
        </div>
        <div style={TimestampContainer}>
          <div style={{...TimestampStyled,  fontFamily: "'Lato', sans-serif",
              fontSize: "10px"}}>{timestampText}</div>
        </div>
      </div>
    );
  }

GenerateWhiteMessage.propTypes = {
    text: PropTypes.string.isRequired,
    timestampText: PropTypes.string.isRequired,
}