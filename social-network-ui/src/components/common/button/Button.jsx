import * as React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { StyledWhiteButton, StyledBlackButton } from './styled';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StyledBox, StyledFormControl, StyledInput } from "../../ForgotPassword/style";

const BasicButton = ({text, onClick, type, color}) => {
    const className = (color === "black") ? StyledBlackButton: StyledWhiteButton
    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
        AdaptiveButton:{
            ...className
            ,
            width:"70%"
        }
    };

    const xsStyles = {
        AdaptiveButton:{
            ...className
            ,
            width:"70%"
        }
    };

    const smStyles = {
        AdaptiveButton:{
            ...className,
            width:"70%"
        }
    };

    const mdStyles = {
        AdaptiveButton:{
            ...className
        }
    };

    const lgStyles = {
        AdaptiveButton:{
            ...className
        }
    };

    const xlStyles = {
        AdaptiveButton:{
            ...className
        }
    };

    let styles;
    if (isXl) {
        styles = xlStyles;
    } else if (isLg) {
        styles = lgStyles;
    } else if (isMd) {
        styles = mdStyles;
    } else if (isSm) {
        styles = smStyles;
    } else if (isXs) {
        styles = xsStyles;
    } else {
        styles = xxsStyles;
    }

    return (
        <Button sx={styles.AdaptiveButton} variant="contained" type={type} onClick={onClick}>{text}</Button>
    )
}

BasicButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
    color: PropTypes.string
  };
export default BasicButton