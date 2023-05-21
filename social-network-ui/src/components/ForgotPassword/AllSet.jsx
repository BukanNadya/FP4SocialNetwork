import * as React from 'react';
import PropTypes from 'prop-types';
import { modalConfig } from "./modalConfig";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledBox, StyledHeaderModalText, StyledBlackButton, StyledFormControl, StyledSpanElement, StyledWhiteButton  } from "./style"
import BasicButton from '../common/button';
import { useModal } from '../../context/ModalContext';

import Logo from "../common/icon/Logo";
import CloseIcon from '../common/icon/CloseIcon';

export const AllSet = ({ id }) => {
    const {setOpenAllSet} = useModal()
    const { text,
        boldText,
        buttonText } = modalConfig[id]
        const handleClick = () => {
            setOpenAllSet(false)
        }
    return (
        <Box sx={StyledBox}>
            <CloseIcon onClick={() => setOpenForgot(false)}/>
            <Logo/>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {text}
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {boldText}
            </Typography>

            <BasicButton text={buttonText} onClick={handleClick} />
        </Box>
    )
}
AllSet.propTypes = {
    id: PropTypes.string
};