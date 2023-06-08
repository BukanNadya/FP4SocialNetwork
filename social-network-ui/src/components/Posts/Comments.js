import React from "react";
import { Formik, Field, Form, } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { StyledBlackButton } from "../LoginModal/loginModalStyles";
import { setCommentFromUser, setSearchId, sendComments } from "../../store/actions";
import CircularProgress from "@mui/material/CircularProgress";
import { apiUrl } from "../../apiConfig";
import {
    CommentBox,
    CommentTypography,
    CommentCircular,
    CommentsContentBox,
    CommentImg,
    CommentListWrapper, CommentUl, CommentLi, CommentCustomLi, CommentText, CommentCustomButton, EmptyCommentsText
} from "./PostStyles";

export function Comments({
                             comments,
                             postId,
                             userId,
                             setPostCommentCount,
                             postCommentCount,
                             photoFileByteArray,
                             isLoadingComments
                         }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        comment: Yup.string()
            .required("Please enter a comment").max(250, "Comment must be no longer than 250 characters")
    });

    const toAnotherUserPage = () => {
        dispatch(setSearchId(String(userId)));
        navigate("/view");
    };

    console.log(comments)

    console.log(photoFileByteArray);

    return (
        <Formik
            initialValues={{ comment: "" }}
            onSubmit={async (values, actions) => {
                console.log(userId, postId, values.comment,);
                await dispatch(sendComments(values, userId, postId))
                actions.resetForm();
                setPostCommentCount(postCommentCount + 1);
            }
            }
            validationSchema={validationSchema}
        >
            {() => (
                <Form>
                    <Box style={CommentBox}>
                        <Typography variant="h6" sx={CommentTypography}>Comments:</Typography>
                        {isLoadingComments ? <CircularProgress
                            sx={CommentCircular}/> : comments.length > 0 ? (comments.map((comment, index) => (
                            <Box key={index} style={CommentsContentBox}>
                                {comment.photoFileByteArray ?
                                    <img src={comment.profileImageLink} style={CommentImg}
                                         alt=""/> :
                                    <Avatar alt={comment.username} src="#"/>}
                                <div style={CommentListWrapper}>
                                    <ul style={CommentUl}>
                                        <li style={CommentLi}>
                                            <Link onClick={toAnotherUserPage} style={CommentLi}> {comment.name}</Link>
                                        </li>
                                        <li onClick={toAnotherUserPage} style={CommentCustomLi}>@{comment.username}
                                        </li>
                                        <li style={CommentLi}>{formatDistanceToNow(new Date(comment.createdDateTime), { addSuffix: true })}
                                        </li>
                                    </ul>
                                    <Typography style={CommentText}>{comment.commentText}</Typography>
                                </div>
                            </Box>
                        ))) : <Typography variant="h6" sx={EmptyCommentsText}>Add your first
                            comment!</Typography>}
                        <Field
                            as={TextField}
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "40px" }, marginTop: "10px" }}
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
                                }}>Add comment</Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

Comments.propTypes = {
    isLoadingComments: PropTypes.bool,
    comments: PropTypes.array.isRequired,
    userId: PropTypes.string,
    postId: PropTypes.number,
    postCommentCount: PropTypes.number,
    setPostCommentCount: PropTypes.func,
    photoFileByteArray: PropTypes.string,
};