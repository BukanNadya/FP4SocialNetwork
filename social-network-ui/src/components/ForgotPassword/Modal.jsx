import * as React from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import { ForgotModal } from './ForgotModal';
import { SendCodeModal } from './SendCodeModal';
import { WeSent } from './WeSent';
import { Choose } from './Choose';
import { AllSet } from './AllSet';
import {StyledModal} from "./style.js"


const BasicModal = ({handleClose, open, id}) => {
    let content = null
    if(id==="forgot"){
    content = <ForgotModal handleClose={handleClose} id={id}/>
    }
    if(id==="sendCode"){
        content = <SendCodeModal handleClose={handleClose} id={id}/>
    }
    if(id==="weSent"){
        content = <WeSent handleClose={handleClose} id={id}/>
    }
    if(id==="choose"){
        content = <Choose handleClose={handleClose} id={id}/>
    }
    if(id==="allSet"){
        content = <AllSet handleClose={handleClose} id={id}/>
    }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={StyledModal}>
        {content}
      </Modal>
    </div>
  );
}

BasicModal.propTypes = {
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    id: PropTypes.string
};

export default BasicModal