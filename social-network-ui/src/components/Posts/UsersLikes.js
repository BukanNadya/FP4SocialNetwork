import { Box, Paper, Typography } from "@mui/material";
import { EmptyLikesUserArrParagraph, LikeBox, LikesCircular, PostPaper } from "./PostStyles";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import PropTypes from "prop-types";
import { Post } from "./Post";

export function UsersLikes({likesIsLoading, showLike, usersWhoLike, toAnotherUserPage}) {
    return (
        <Paper elevation={3} sx={PostPaper}>
            {likesIsLoading ?
                <CircularProgress sx={LikesCircular}/>
                :
                showLike ?
                    usersWhoLike.length > 0 ?
                        usersWhoLike.map(user => (
                            <Box key={user.userId} onClick={() => toAnotherUserPage(user.userId)} sx={LikeBox}>
                                <Typography>@{user.username}</Typography>
                                <Typography sx={{ marginLeft: "10px" }}>{user.name}</Typography>
                            </Box>
                        ))
                        :
                        <Typography sx={EmptyLikesUserArrParagraph}>Лайків ще немає!Будь першим</Typography>
                    :
                    null}
        </Paper>);
}

UsersLikes.propTypes = {
    likesIsLoading: PropTypes.bool,
    showLike: PropTypes.bool,
    usersWhoLike: PropTypes.array,
    toAnotherUserPage: PropTypes.func,
};