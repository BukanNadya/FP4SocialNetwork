import * as React from 'react';
import PropTypes from 'prop-types';
import { modalConfig } from './modalConfig';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledBox, StyledHeaderModalText, StyledBlackButton, StyledFormControl, StyledSpanElement, StyledWhiteButton } from "./style"
import BasicButton from '../common/button';
// import BasicInput from "../../input"
import InputFieldWithError from "../common/input"
import { Link } from "react-router-dom"
import { useModal } from '../../context/ModalContext';

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import Logo from "../common/icon/Logo";
import CloseIcon from '../common/icon/CloseIcon';

export const Choose = ({ id }) => {
    const { setOpenChoose, setOpenAllSet } = useModal()
    const { title,
        text,
        buttonText,
        placeholder,
        iconStatus,
        inputType,
        link,
        linkText,
        name,
        secondName,
        secondPlaceholder } = modalConfig[id]
    const handleClick = () => {
        setOpenChoose(false);
        setOpenAllSet(true)
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {text}
                </Typography>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                    <Field as={InputFieldWithError} sx={{width: "600px"}} name={name}
                        id="password"
                        label={placeholder} type="password" /></div>

                    <Field as={InputFieldWithError} sx={{ width: "600px" }} name={secondName}
                        id="confirm"
                        label={secondPlaceholder} type="password" />

                    {/* <InputFieldWithError/> */}
                    {/* <BasicInput type={inputType} iconStatus={iconStatus} placeholder={placeholder} /> */}
                </Box>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {linkText}
                    <Link path="/support">{link}</Link>
                </Typography>

                <BasicButton color="black" text={buttonText} onClick={handleClick} />
            </Box>
        </Formik>
    )
}
Choose.propTypes = {
    id: PropTypes.string
};