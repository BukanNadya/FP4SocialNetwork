export const StyledModal = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
    "@media(max-width: 576px)": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        outline: "none",
        width: "100%",
        height: "100vh",
        overflow: "hidden"
    }
};

export const StyledBox = {
    width: 500,
    height: 600,
    background: "#ffff",
    outline: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "10px",
    overflow: "visible",
    position: "relative",
    "@media(max-width: 576px)": {
        width: "100% !important",
        height: "100% !important",
        overflow: "hidden"
    }
};

export const StyledTwitSvgIcon = {
    width: "45px",
    height: "45px",
    marginBottom: "20px"
};

export const StyledCloseSvgIcon = {
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor: "pointer"
};

export const StyledHeaderModalText = {
    fontFamily: "'Lato', sans-serif",
    fontSize: "22px",
    lineHeight: "23px",
    fontWeight: "700",
    fontStyle: "normal",
    marginBottom: "30px",

};

export const StyledFormControl = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
};

export const StyledBlackButton = {
    fontFamily: "'Lato', sans-serif",
    fontSize: "15px",
    lineHeight: "23px",
    fontStyle: "normal",
    height: "45px",
    marginTop: "30px", width: "400px", background: "#000000",
    transition: "0.7s",
    "&:hover": {
        transition: "0.7s",
        backgroundColor: "#ffffff",
        color: "#000000"
    },
    fontWeight: 700,
    borderRadius: "20px",
};

export const StyledCheckbox = {
    fontFamily: "'Lato', sans-serif",
    fontSize: "15px",
    lineHeight: "23px",
    "& .MuiSvgIcon-root": { fontSize: 21 },
    alignSelf: "start"
};

export const StyledWhiteButton = {
    fontFamily: "'Lato', sans-serif",
    fontSize: "15px",
    lineHeight: "23px",
    height: "45px",
    marginTop: "20px", width: "400px", background: "#ffffff", color: "#000000",
    transition: "0.7s", "&:hover": {
        transition: "0.7s",
        backgroundColor: "#000000",
        color: "#ffffff"
    },
    fontWeight: 700,
    borderRadius: "20px",
};

export const StyledSpanElement = {
    fontFamily: "'Lato', sans-serif",
    fontSize: "20px",
    lineHeight: "23px",
    position: "relative",
    marginTop: "30px",
    color: "#808080",
    marginBottom: "30px",
    "&::before": {
        content: "\"\"",
        position: "absolute",
        width: "100px",
        height: "1px",
        backgroundColor: "#808080",
        left: "30px",
        top: "50%",
        transform: "translateY(-50%)",
    },
    "&::after": {
        content: "\"\"",
        position: "absolute",
        width: "100px",
        height: "1px",
        backgroundColor: "#808080",
        right: "30px",
        top: "50%",
        transform: "translateY(-50%)",
    },
};

export const BirthDateForm = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
};
export const BirthDateParagraph = {
    fontFamily: "'Lato', sans-serif",
    fontSize: "25px",
    textAlign: "center",
    margin: "0 auto"
};
export const BirthDateBox = {
    width: "400px",
    display: "flex",
    justifyContent: "space-around",
    marginTop: "40px",
    "@media(max-width: 576px)": {
        width: "80% !important",
        overflow: "hidden"
    }
};

export const  BirthDateErrorMessage = {
    color: "red", fontFamily: "'Lato', sans-serif",
    fontSize: "13px",
    lineHeight: "15px",
}

export const EnterEmailModalLink = {
    marginTop: "0px",
    color: "white",
    textAlign: "center",
    textDecoration: "none",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "45px",
    width: "400px",
    background: "#000000",
    textTransform: "uppercase",
}

export const EnterPasswordLabel = {
    fontFamily: "'Lato', sans-serif",
    fontSize: "19px",
    lineHeight: "23px"
}

export const ErrorField = {
    fontFamily: "'Lato', sans-serif",
    fontSize: "15px",
    lineHeight: "23px"
}