import React from "react";
import PropTypes from 'prop-types';
import { WhiteMessageContainer, TimestampStyled,
  TimestampContainer, WhiteMessageTextWrap,
  WhiteMessageTextStyled } from "./MessagesStyle";

export const GenerateWhiteMessage = ({text, timestampText}) => {
    return (
      <div style={WhiteMessageContainer}>
        <div style={WhiteMessageTextWrap}>
          <div style={WhiteMessageTextStyled}>{text}</div>
        </div>
        <div style={TimestampContainer}>
          <div style={TimestampStyled}>{timestampText}</div>
        </div>
      </div>
    );
  }

GenerateWhiteMessage.propTypes = {
    text: PropTypes.string.isRequired,
    timestampText: PropTypes.string.isRequired,
}