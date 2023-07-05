import * as React from 'react';
import PropTypes from 'prop-types';
import { modalConfig } from "./modalConfig";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledBlackButton, StyledBox, StyledFormControl, StyledInput } from "./style";
import BasicButton from '../common/button';
import { useModal } from '../../context/ModalContext';
import { useDispatch } from "react-redux"
import { openLoginModal } from '../../store/actions';

import Logo from "../common/icon/Logo";
import CloseIcon from '../common/icon/CloseIcon';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const AllSet = ({ id }) => {
    const dispatch = useDispatch()
    const {setOpenAllSet, setOpenForgot} = useModal()
    const { text,
        boldText,
        buttonText } = modalConfig[id]
        const onclose = () => {
            setOpenAllSet(false),
            setOpenForgot(false)
        }
const handleClick = ()=> {
    onclose()
    dispatch(openLoginModal())
}

    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
            width:"100%"
        },
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px",  width: "70%"  },
        AdaptiveFormControl:{...StyledFormControl,  width:"200px"}
        ,
        AdaptiveInput:{
            ...StyledInput, width:"200px"
        }
    };

    const xsStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
            width:"100%"
        },
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px",  width: "70%"  },
        AdaptiveFormControl:{...StyledFormControl,  width:"300px"}
        ,
        AdaptiveInput:{
            ...StyledInput, width:"300px"
        }

    };

    const smStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
            width:"100%"
        },
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px",  width: "70%"  },
        AdaptiveFormControl:{...StyledFormControl,  width:"400px"}
        ,
        AdaptiveInput:{
            ...StyledInput, width:"400px"
        }

    };

    const mdStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
        },
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px" },
        AdaptiveFormControl:{...StyledFormControl}
        ,
        AdaptiveInput:{
            ...StyledInput
        }
    };

    const lgStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
        },
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px"  },
        AdaptiveFormControl:{...StyledFormControl}
        ,
        AdaptiveInput:{
            ...StyledInput
        }
    };

    const xlStyles = {
        AdaptiveStyledBox: {
            ...StyledBox,
        },
        AdaptiveStyledBlackButton:{ ...StyledBlackButton, marginTop: "20px" },
        AdaptiveFormControl:{...StyledFormControl},
        AdaptiveInput:{
            ...StyledInput
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
        <Box sx={styles.AdaptiveStyledBox}>
            <CloseIcon onClick={onclose}/>
            <Logo/>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {text}
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {boldText}
            </Typography>

            <BasicButton  text={buttonText} onClick={handleClick} />
        </Box>
    )
}
AllSet.propTypes = {
    id: PropTypes.string
};