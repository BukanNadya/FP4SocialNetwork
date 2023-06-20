import React from "react";
import PropTypes from 'prop-types';
import { BlueMessageContainer, TimestampStyled,
  TimestampContainer, BlueMessageTextWrap,
  BlueMessageTextStyled } from "./MessagesStyle";

export const GenerateBlueMessage = ({text, timestampText}) => {
    return (
      <div style={BlueMessageContainer}>
        <div style={BlueMessageTextWrap}>
          <div style={BlueMessageTextStyled}>{text}</div>
        </div>
        <div style={TimestampContainer}>
          <div style={TimestampStyled}>{timestampText}</div>
        </div>
      </div>
    );
  }


GenerateBlueMessage.propTypes = {
  text: PropTypes.string.isRequired,
  timestampText: PropTypes.string.isRequired,
}