import * as React from 'react';
import PropTypes from 'prop-types';
import { modalConfig } from './modalConfig';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledBox, StyledHeaderModalText, StyledModalText, StyledBlackButton, StyledFormControl, StyledSpanElement, StyledWhiteButton } from "./style"
import BasicButton from '../common/button';
// import BasicInput from "../../input"
import InputFieldWithError from "../common/input"
import { useModal } from '../../context/ModalContext';

import Logo from "../common/icon/Logo";
import CloseIcon from '../common/icon/CloseIcon';

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

export const WeSent = ({ id }) => {
    const { setOpenWeSend, setOpenChoose } = useModal()
    const { text,
        title,
        buttonText,
        placeholder,
        iconStatus,
        inputType } = modalConfig[id]
    const handleClick = () => {
        setOpenWeSend(false);
        setOpenChoose(true)
    }
    return (
        <Formik validate={async (values) => {
            // const url = new URL("http://localhost:8080/login");
            // url.searchParams.append("username", values.userName);
            // url.searchParams.append("password", values.password);
            // url.searchParams.append("rememberMe", userDataState.rememberMe);
            // const userPassword = await fetch(url.toString());
            // const userToken = await userExist.json();
            const userToken = true;
            if (!userToken) {
                return { password: "wrong password" };
            } else {
                localStorage.setItem('userToken', JSON.stringify(userToken));
            }
        }}
            initialValues={{
                // userName: userDataState.userName || "",
                // password: "",
            }} validationSchema={
                Yup.object(
                    {
                        password: Yup.string().required("Password is required")
                    }
                )} onSubmit={(values) => {
                    // dispatch(setUserPassword(values));
                }}>
            <Box sx={StyledBox}>
                <CloseIcon onClick={() => setOpenForgot(false)} />
                <Logo />
                <Typography sx={StyledHeaderModalText} variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={StyledModalText}>
                    {text}
                </Typography>

                <Box
                    component="form"
                    sx={StyledFormControl}
                    noValidate
                    autoComplete="off"
                >
                    {/* <InputFieldWithError /> */}
                    <Field as={InputFieldWithError} sx={{ width: "400px" }} name={placeholder}
                        id="userName"
                        label={placeholder} type="text" />
                    {/* <BasicInput type={inputType} iconStatus={iconStatus} placeholder={placeholder} /> */}
                </Box>

                <BasicButton text={buttonText} onClick={handleClick} />
            </Box>
        </Formik>
    )
}
WeSent.propTypes = {
    id: PropTypes.string
};