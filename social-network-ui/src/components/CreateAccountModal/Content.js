import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Modal, Typography, Box, FormControl, InputLabel, Input, Button,
    SvgIcon, OutlinedInput, MenuItem, Select
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { ContentFirstStep } from "./ContentFirstStep";
import { ContentSecondStep } from "./ContentSecondStep";
import { ContentThirdStep } from "./ContentThirdStep";
import { ContentFourthStep } from "./ContentFourthStep";
import { SET_STEP_MODAL, SET_VALUE_MODAL } from "../../store/types";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { StyledContentModal, StyledContentBox, StyledContentTypography } from "./CreateAccountModalStyles";
import { closeLoginModal, closeSignUpModal, openSignUpModal } from "../../store/actions";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StyledBox } from "../LoginModal/loginModalStyles";

export function Content() {
  const dispatch = useDispatch();
  const stepInModal = useSelector((state) => state.stepModal.stepModal.step);
  const [open, setOpen] = useState(true);
  const [arrowBackDisplay, showArrowBackDisplay] = useState(true);
  const theme = useTheme();
  const savedStepInModal = localStorage.getItem("stepInModal");

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  useEffect(() => {
    const savedStepInModal = localStorage.getItem("stepInModal");
    if (savedStepInModal) {
      dispatch({ type: SET_STEP_MODAL, step: JSON.parse(savedStepInModal) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stepInModal", JSON.stringify(stepInModal));
  }, [stepInModal]);

    useEffect(() => {
    if (savedStepInModal === 1) {
      showArrowBackDisplay(true);
    }
    else {
      showArrowBackDisplay(false);
    }
  }, [stepInModal]);

  const renderModalContent = () => {
    switch (stepInModal) {
      case 1:
        return <ContentFirstStep />;
      case 2:
        return <ContentSecondStep />;
      case 3:
        return <ContentThirdStep />;
      case 4:
        return <ContentFourthStep />;
      default:
        return null;
    }
  };

    const xxsStyles = {
        AdaptiveStyledContentBox:{
            ...StyledContentBox,
            width:"100%",
            height:"100%",
            overflow:"hidden",
        },
        ContentStyles: {
            position:"relative",
            width: "80%",
            maxWidth: "400px",

        }
    };

    const xsStyles = {
        AdaptiveStyledContentBox:{
            ...StyledContentBox,
            width:"100%",
            height:"100%",
            overflow:"hidden",
        },
        ContentStyles: {
            position:"relative",
            width: "80%",
            maxWidth: "400px",

        }
    };

    const smStyles = {
        AdaptiveStyledContentBox:{
            ...StyledContentBox,
            width:"100%",
            height:"100%",
            overflow:"hidden",
        },
        ContentStyles: {
            position:"relative",
            maxWidth: "400px",
            minWidth: "400px"
        }
    };

    const mdStyles = {
        AdaptiveStyledContentBox:{
            ...StyledContentBox
        },
        ContentStyles: {
            position:"relative"
        }
    };

    const lgStyles = {
        AdaptiveStyledContentBox:{
            ...StyledContentBox
        },
        ContentStyles: {
            position:"relative"
        }
    };

    const xlStyles = {
        AdaptiveStyledContentBox:{
            ...StyledContentBox
        },
        ContentStyles: {
            position:"relative"
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
    <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={() => {dispatch(closeSignUpModal())}}
            sx={ StyledContentModal }>
            <Box sx={styles.AdaptiveStyledContentBox}>
                <div style={styles.ContentStyles}>
              {
                stepInModal > 1 && (
                  <ArrowBackOutlinedIcon
                      sx={{
                        position: "absolute",
                        top: "-50px",
                        left: "0px",
                      }}
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        dispatch({ type: SET_STEP_MODAL, step: stepInModal - 1 });
                      }}
                    />
                )
              }
                <SvgIcon sx={{
                    position: "absolute", top: "-50px",
                    right: "0px", cursor: "pointer"
                }} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{dispatch(closeSignUpModal())}}>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                          fill="#000000"/>
                </SvgIcon>
                <Typography component="span" sx={ StyledContentTypography }>Step {stepInModal} of 4</Typography>
                {renderModalContent()}
                </div>
                </Box>
        </Modal>
  );
}