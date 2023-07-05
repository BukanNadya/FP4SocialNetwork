import React, { useState } from "react";
import { Formik, Field, Form, } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import {
    Avatar,
    Box,
    Button,
    TextField,
    Typography,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import { StyledBlackButton } from "../LoginModal/loginModalStyles";
import { setCommentFromUser, setSearchId, sendComments, setComments } from "../../store/actions";
import CircularProgress from "@mui/material/CircularProgress";
import { apiUrl } from "../../apiConfig";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import {
    CommentBox,
    CommentTypography,
    CommentCircular,
    CommentsContentBox,
    CommentImg,
    CommentListWrapper,
    CommentUl,
    CommentLi,
    CommentCustomLi,
    CommentText,
    CommentCustomButton,
    EmptyCommentsText,
    FieldStyles, DarkFieldStyles, DarkCommentLi, DarkCommentCustomLi, DarkCommentBox
} from "./PostStyles";

export function Comments({
                             comments,
                             postId,
                             userIdWhoSendPost,
                             setPostCommentCount,
                             postCommentCount,
                             isLoadingComments
                         }) {
    const userId = useSelector(state => state.userData.userData.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openWindow, setOpenWindow] = useState(false);
    const commentsFromRedux = useSelector(state => state.comments.comments);
    const darkMode = useSelector(state => state.userData.userMode.darkMode);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const validationSchema = Yup.object().shape({
        comment: Yup.string()
            .required("Please enter a comment").max(250, "Comment must be no longer than 250 characters")
    });

    const toAnotherUserPage = () => {
        dispatch(setSearchId(String(userIdWhoSendPost)));
        navigate("/view");
    };

    const deleteComment = async (deleteComment) => {
        let filteredComments = comments.filter((comment) => {
            return comment.postCommentId !== deleteComment.postCommentId;
        });
        dispatch(setComments(filteredComments));
        await fetch(`${apiUrl}/api/comments?postCommentId=${deleteComment.postCommentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        setPostCommentCount(postCommentCount-1)
    };


    return (
        <Formik
            initialValues={{ comment: "" }}
            onSubmit={async (values, actions) => {
                await dispatch(sendComments(values, userId, postId));
                actions.resetForm();
                setPostCommentCount(postCommentCount + 1);
            }
            }
            validationSchema={validationSchema}
        >
            {() => (
                <>
                    <Form>
                        <Box sx={darkMode ? DarkCommentBox : CommentBox} data-testid={"comments_wrapper"}>
                            <Typography variant="h6" sx={CommentTypography}>Comments:</Typography>
                            {isLoadingComments ? <CircularProgress
                                sx={CommentCircular}/> : comments.length > 0 ? (comments.map((comment, index) => (
                                <Box key={index} style={CommentsContentBox}>
                                    {comment.profileImageLink ?
                                        <img src={comment.profileImageLink} style={CommentImg}
                                             alt=""/> :
                                        <Avatar alt={comment.username} src="#"/>}
                                    <div style={CommentListWrapper}>
                                        <ul style={CommentUl}>
                                            <li style={darkMode ? DarkCommentLi : CommentLi}>
                                                <Link onClick={toAnotherUserPage}
                                                      style={darkMode ? DarkCommentLi : CommentLi}> {comment.name}</Link>
                                            </li>
                                            <li onClick={toAnotherUserPage} style={darkMode ? DarkCommentCustomLi : CommentCustomLi}>@{comment.username}
                                            </li>
                                            <li style={darkMode ? DarkCommentLi : CommentLi}>{formatDistanceToNow(new Date(comment.createdDateTime), { addSuffix: true })}
                                            </li>
                                            {comment.userId == userId ?
                                                <li style={{ position: "absolute", right: "30px" }}>
                                                    <MoreVertOutlinedIcon
                                                        aria-controls="fade-menu"
                                                        aria-haspopup="true"
                                                        onClick={handleClick}
                                                    />
                                                    <Menu
                                                        id="fade-menu"
                                                        anchorEl={anchorEl}
                                                        keepMounted
                                                        open={open}
                                                        onClose={handleClose}
                                                    >
                                                        <MenuItem onClick={() => {
                                                            setOpenWindow(true);
                                                            handleClose();
                                                        }}>Delete comment</MenuItem>
                                                    </Menu>
                                                </li> : null
                                            }
                                        </ul>
                                        <Typography style={CommentText}>{comment.commentText}</Typography>
                                    </div>
                                    <div>
                                        <Dialog
                                            open={openWindow}
                                            keepMounted
                                            onClose={() => setOpenWindow(false)}
                                            aria-labelledby="alert-dialog-slide-title"
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    Do you want to delete this comment?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => {
                                                    deleteComment(comment);
                                                    setOpenWindow(false);
                                                }} color="primary">
                                                    Yes
                                                </Button>
                                                <Button onClick={() => setOpenWindow(false)} color="primary">
                                                    No
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                </Box>
                            ))) : <Typography variant="h6" sx={EmptyCommentsText}>Add your first
                                comment!</Typography>}
                            <Field
                                as={TextField}
                                sx={darkMode ? DarkFieldStyles : FieldStyles}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Please enter your comment"
                                multiline
                                name="comment"
                            />
                            <Button color="primary" type="submit" variant="contained"
                                    style={{
                                        ...StyledBlackButton,
                                        ...CommentCustomButton
                                    }} data-testid={"send_comment_button"}>Add comment</Button>
                        </Box>
                    </Form>
                </>
            )}
        </Formik>

    );
}

Comments.propTypes = {
    isLoadingComments: PropTypes.bool,
    comments: PropTypes.array.isRequired,
    userIdWhoSendPost: PropTypes.number,
    postId: PropTypes.number,
    postCommentCount: PropTypes.number,
    setPostCommentCount: PropTypes.func,
    photoFileByteArray: PropTypes.string,
};