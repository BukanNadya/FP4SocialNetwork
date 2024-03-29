export const SendPostField = {
    fontSize: "1.3rem",
    fontFamily: "'Lato', sans-serif",
    width: "400px",
    maxWidth: "600px",
    marginTop: "20px",
};
export const CharactersTextWrapper = {
    marginTop: "10px",
    fontSize: "1rem",
    fontFamily: "'Lato', sans-serif",

};
export const PostImgWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "0px",
};

export const PostsWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:"center",
    maxWidth: "100%",
};
export const PostCard = {
    width: "600px",
    maxWidth: "100%",
    borderRadius: 0,
    mb: 1,
    margin: "0",
    padding: "0",
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)", position: "relative",
    overflowAnchor: "none"
};

export const PostText = {
    overflowY: "hidden",
    padding: "0, 20px",
    wordWrap: "break-word",
    maxWidth: "500px",
    marginBottom: "12px"
};

export const ShowMoreLinkStyles = {
    fontFamily: "'Lato', sans-serif",
    fontSize: "12px",
    fontWeight: "700",
    color: "blue"
};

export const CommentBox = {
    padding: "10px 20px",
    borderTop: "1px solid #ddd",
    overflowY: "scroll",
    overflowX: "none",
    height: "50xp",
};
export const DarkCommentBox = {
    padding: "10px 20px",
    borderTop: "1px solid #ddd",
    overflowY: "scroll",
    overflowX: "none",
    height: "50xp",
    // maxHeight: "300px",
    "&::-webkit-scrollbar": {
        width: "10px",
    },
    "&::-webkit-scrollbar-track": {
        background: "rgb(30, 39, 50)"
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgb(39, 51, 64)",
        borderRadius: "20px",
    },
};
export const CommentTypography = {
    marginBottom: "10px",
    marginTop: "10px"
};
export const CommentCircular = {
    marginLeft: "45%",
    width: "5px",
    height: "5px"
};

export const CommentsContentBox = {
    padding: "5px 0",
    borderTop: "1px solid #eee",
    display: "flex",
    alignItems: "center",
    minHeight: "100px"
};

export const CommentImg = {
    width: "50px",
    height: "50px",
    borderRadius: "30px",
};

export const CommentListWrapper = {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",
    marginLeft: "30px"
};

export const CommentUl = {
    listStyle: "none",
    display: "flex",
    alignSelf: "start",
    justifyContent: "space-around",
    padding: "0"
};

export const CommentLi = {
    color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
    fontSize: "13px",
    fontWeight: "400", marginRight: "10px"
};
export const DarkCommentLi = {
    color: "rgb(139, 152, 165)", fontFamily: "'Lato', sans-serif",
    fontSize: "13px",
    fontWeight: "400", marginRight: "10px"
};

export const CommentCustomLi = {
    color: "rgb(113, 118, 123)",
    fontFamily: "'Lato', sans-serif",
    fontSize: "13px",
    fontWeight: "400",
    marginRight: "10px",
    textDecoration: "underline",
    cursor: "pointer"
};
export const DarkCommentCustomLi = {
    color: "rgb(139, 152, 165)",
    fontFamily: "'Lato', sans-serif",
    fontSize: "13px",
    fontWeight: "400",
    marginRight: "10px",
    textDecoration: "underline",
    cursor: "pointer"
};
export const CommentText = {
    wordWrap: "break-word",
    maxWidth: "450px",
    marginBottom: "20px"
};

export const CommentCustomButton = {
    maxWidth: "140px",
    marginTop: "10px",
    marginBottom: "10px",
    fontSize: "12px",
};

export const EmptyCommentsText = {
    marginBottom: "10px",
    marginTop: "10px"
};
export const FieldStyles = {
    "& .MuiOutlinedInput-root": { borderRadius: "40px" },
    marginTop: "10px"
}
export const DarkFieldStyles = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "40px",
        background: "rgb(39, 51, 64)",
        color: "rgb(247, 249, 249)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: "40px",
    },
    "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
        color: "rgb(247, 249, 249)",
    },
    "& .MuiInputLabel-root": {
        color: "rgb(247, 249, 249)",
    },
    "& .MuiAutocomplete-popupIndicator": {
        color: "rgb(247, 249, 249)",
    },
    "& .MuiAutocomplete-clearIndicator": {
        color: "rgb(247, 249, 249)",
    },
}

export const PostDisplayingEmptyPostsText = {
    marginTop: "20%",
    fontWeight: "400",
    lineHeight: "20px",
    fontSize: "22px",
    fontFamily: "'Lato', sans-serif",
};
export const DarkPostDisplayingEmptyPostsText = {
    marginTop: "20%",
    fontWeight: "400",
    lineHeight: "20px",
    fontSize: "22px",
    fontFamily: "'Lato', sans-serif",
    color: "rgb(247, 249, 249)",
};

export const ProfileImgStyles = {
    width: "50px",
    height: "50px",
    borderRadius: "50px"
};

export const PostTextWrapper = {
    marginLeft: 16,
    flex: 1
};

export const userNameParagraph = {
    textDecoration: "underline",
    cursor: "pointer"
};
export const DarkUserNameParagraph = {
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
        transition: "0.7s",
        textDecoration: "underline rgb(139, 152, 165)",
    },
};
export const UserPhotoWrapper = {
    maxWidth: "600px",
    width: "600px",
    margin: "10px auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

export const UserPhoto = {
    width: "450px",
    margin: "0 auto"
};
export const userLikeCount = {
    marginLeft: "0px",
    textDecoration: "underline",
    cursor: "pointer"
};

export const PostPaper = {
    width: "12vw",
    marginLeft: "70px",
    maxHeight: "70px",
    position: "absolute",
    left: "170px",
    overflowY: "scroll",
    overflowX: "hidden",
};

export const LikesCircular = {
    marginLeft: "40%",
    width: "5px",
    height: "5px"
};

export const LikeBox = {
    display: "flex",
    cursor: "pointer",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    padding: "5px 10px",
    "&:hover": {
        backgroundColor: "rgba(128, 128, 128, 0.1)",
    },
};

export const CardContentPost = {
    display: "flex",
    paddingBottom: 0
};

export const EmptyLikesUserArrParagraph = {
    fontSize: "0.9rem",
    fontFamily: "'Lato', sans-serif",
};





