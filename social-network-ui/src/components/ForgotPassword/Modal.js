import * as React from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import { ForgotModal } from './ForgotModal';
import { SendCodeModal } from './SendCodeModal';
import { WeSent } from './WeSent';
import { Choose } from './Choose';
import { AllSet } from './AllSet';
import {StyledModal} from "./style.js"
import { useModal } from '../../context/ModalContext';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PostImgWrapper } from "../Posts/PostStyles";


export const ForgotPasswordModal = ({id}) => {
  const {openForgot,
    openSendCode,
    openWeSend,
    openChoose,
    openAllSet} = useModal()
const isOpen = openForgot ||
openSendCode ||
openWeSend ||
openChoose ||
openAllSet
    let content = null
    if(id==="forgot"){
    content = <ForgotModal id={id}/>
    }
    if(id==="sendCode"){
        content = <SendCodeModal id={id}/>
    }
    if(id==="weSent"){
        content = <WeSent id={id}/>
    }
    if(id==="choose"){
        content = <Choose id={id}/>
    }
    if(id==="allSet"){
        content = <AllSet id={id}/>
    }

    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {

    };

    const xsStyles = {

    };

    const smStyles = {


    };

    const mdStyles = {

    };

    const lgStyles = {

    };

    const xlStyles = {

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
    <div>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={StyledModal}>
        {content}
      </Modal>
    </div>
  );
}

ForgotPasswordModal.propTypes = {
    id: PropTypes.string
}