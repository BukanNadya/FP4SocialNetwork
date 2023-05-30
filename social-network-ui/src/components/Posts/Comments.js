import React from "react";
import { Formik, Field, Form, } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { StyledBlackButton } from "../LoginModal/loginModalStyles";
import { setCommentFromUser, setSearchId } from "../../store/actions";

export function Comments({ comments, postId, userId, setPostCommentCount, postCommentCount }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        comment: Yup.string()
            .required("Please enter a comment").max(250, "Comment must be no longer than 250 characters")
    });

    const toAnotherUserPage = ()=>{
        dispatch(setSearchId(String(userId)))
        navigate("/view")
    }

    return (
       <Formik
            initialValues={{ comment: "" }}
            onSubmit={async (values,  actions) => {
                console.log(userId, postId, values.comment,);
                let userCommentResponse = await fetch("http://localhost:8080/comments", {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userId,
                        postId: postId,
                        commentText: values.comment,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                let userCommentData = await userCommentResponse.json();
                console.log(userCommentData)
                dispatch(setCommentFromUser(userCommentData))
                actions.resetForm();
                setPostCommentCount(postCommentCount+1)
            }
            }
            validationSchema={validationSchema}
        >
           {() => (
                <Form>
                    <Box style={{
                        padding: "10px 20px",
                        borderTop: "1px solid #ddd",
                        overflow: "scroll",
                        height: "50xp"
                    }}>
                        <Typography variant="h6" sx={{ marginBottom: "10px", marginTop: "10px" }}>Comments:</Typography>
                        {comments.length > 0 ? (comments.map((comment, index) => (
                            <Box key={index} style={{
                                padding: "5px 0",
                                borderTop: "1px solid #eee",
                                display: "flex",
                                alignItems: "center",
                                minHeight: "100px"
                            }}>
                                <Avatar alt={comment.username} src="#"/>
                                <div style={{
                                    display: "flex",
                                    height: "100%",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "start",
                                    marginLeft: "30px"
                                }}>
                                    <ul style={{
                                        listStyle: "none",
                                        display: "flex",
                                        alignSelf: "start",
                                        justifyContent: "space-around",
                                        padding: "0"
                                    }}>
                                        <li style={{
                                            color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                            fontSize: "13px",
                                            fontWeight: "400", marginRight: "10px"
                                        }}>
                                            <Link onClick={toAnotherUserPage}  style={{
                                                color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                                fontSize: "13px",
                                                fontWeight: "400",
                                            }}> {comment.name}</Link>
                                        </li>
                                        <li onClick={toAnotherUserPage} style={{
                                            color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                            fontSize: "13px",
                                            fontWeight: "400", marginRight: "10px", textDecoration:"underline", cursor:"pointer"
                                        }}>@{comment.username}
                                        </li>
                                        <li style={{
                                            color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                            fontSize: "13px",
                                            fontWeight: "400", marginRight: "10px"
                                        }}>{formatDistanceToNow(new Date(comment.createdDateTime), { addSuffix: true })}
                                        </li>
                                    </ul>
                                    <Typography style={{
                                        wordWrap: "break-word",
                                        maxWidth: "450px",
                                        marginBottom: "20px"
                                    }}>{comment.commentText}</Typography>
                                </div>
                            </Box>
                        ))) : <Typography variant="h6" sx={{ marginBottom: "10px", marginTop: "10px" }}>Add your first comment!</Typography>}
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
                                    maxWidth: "140px",
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    fontSize: "12px",
                                }} >Add comment</Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    userId: PropTypes.string,
    postId: PropTypes.number,
    postCommentCount: PropTypes.number,
    setPostCommentCount:PropTypes.func,
};