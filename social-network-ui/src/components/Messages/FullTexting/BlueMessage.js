import React from "react";
import PropTypes from 'prop-types';
import { BlueMessageContainer, TimestampStyled,
  TimestampContainer, BlueMessageTextWrap,
  BlueMessageTextStyled } from "./MessagesStyle";

export const GenerateBlueMessage = ({text, timestampText}) => {
    return (
      <div style={BlueMessageContainer}>
        <div style={BlueMessageTextWrap}>
          <div style={{...BlueMessageTextStyled,  fontFamily: "'Lato', sans-serif",
              fontSize: "15px",
              lineHeight: "23px",}}>{text}</div>
        </div>
        <div style={TimestampContainer}>
          <div style={{...TimestampStyled, fontFamily: "'Lato', sans-serif",
              fontSize: "10px"}}>{timestampText}</div>
        </div>
      </div>
    );
  }


GenerateBlueMessage.propTypes = {
  text: PropTypes.string.isRequired,
  timestampText: PropTypes.string.isRequired,
}