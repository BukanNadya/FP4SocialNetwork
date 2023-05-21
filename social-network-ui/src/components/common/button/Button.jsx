import * as React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { StyledWhiteButton, StyledBlackButton } from './styled';

const BasicButton = ({text, onClick, type, color}) => {
    const className = (color === "black") ? StyledBlackButton: StyledWhiteButton
    return (
        <Button sx={className} variant="contained" type={type} onClick={onClick}>{text}</Button>
    )
}

BasicButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
    color: PropTypes.string
  };
export default BasicButton