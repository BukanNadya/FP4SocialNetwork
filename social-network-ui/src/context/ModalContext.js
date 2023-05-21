import React, { useContext, useState, createContext } from "react";
import PropTypes from 'prop-types';


export const ModalContext = createContext()
export const useModal = () => useContext(ModalContext)
export const ModalProvider = ({children}) => {
    const [openForgot, setOpenForgot] = useState(false)
    const [openSendCode, setOpenSendCode] = useState(false)
    const [openWeSend, setOpenWeSend] = useState(false)
    const [openChoose, setOpenChoose] = useState(false)
    const [openAllSet, setOpenAllSet] = useState(false)
    return(
<ModalContext.Provider value={{
    openForgot, setOpenForgot,
    openSendCode, setOpenSendCode,
    openWeSend, setOpenWeSend,
    openChoose, setOpenChoose,
    openAllSet, setOpenAllSet
}}>
{children}
</ModalContext.Provider>
    )
}
ModalProvider.propTypes = {
  children: PropTypes.node.isRequired
};