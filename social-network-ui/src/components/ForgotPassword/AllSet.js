import * as React from 'react';
import PropTypes from 'prop-types';
import { modalConfig } from "./modalConfig";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledBox} from "./style"
import BasicButton from '../common/button';
import { useModal } from '../../context/ModalContext';
import { useDispatch } from "react-redux"
import { openLoginModal } from '../../store/actions';

import Logo from "../common/icon/Logo";
import CloseIcon from '../common/icon/CloseIcon';

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
    return (
        <Box sx={StyledBox}>
            <CloseIcon onClick={onclose}/>
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