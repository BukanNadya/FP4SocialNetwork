import { Avatar, Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { StyledBlackButton } from "../../LoginModal/loginModalStyles";
import React, { useEffect, useState } from "react";
import { PopularPeopleFetch, setSearchId } from "../../../store/actions";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {
    PaperStyles,
    ElementLi,
    ElementUl,
    Wrapper,
    imgStyles,
    TextWrapper,
    userNameParagraph,
    userNickParagraph,
    userNickLink, customButton, emptyArrParagraph,
} from "./popularPeopleSidebarStyles";
import {apiUrl} from "../../../apiConfig";


export function PopularPeopleSidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mostPopularPeople, setMostPopularPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(PopularPeopleFetch(setIsLoading, setMostPopularPeople))

        };
        fetchData();
        console.log(mostPopularPeople)
    }, []);

    useEffect(() => {
        console.log(mostPopularPeople)
    }, [mostPopularPeople]);

    const toAnotherUserPage = (userIdWhoSendPost) => {
        dispatch(setSearchId(String(userIdWhoSendPost)));
        navigate("/view");
    };



    return (
        isLoading ? <CircularProgress sx={{ marginTop: "20%", alignSelf: "center" }}/> :
            <Paper elevation={3} sx={PaperStyles}>
                {mostPopularPeople.length > 0 ?
                    <ul style={ElementUl}>
                        {mostPopularPeople.map((user, index) => (
                            <li key={user.userId} style={{
                                ...ElementLi,
                                borderBottom: index !== mostPopularPeople.length - 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none"
                            }}>
                                <div style={Wrapper}>
                                    {user.profileImageByteArray ?
                                        <img src={user.profileImageLink}
                                             style={imgStyles}
                                             alt=""/> :
                                        <Avatar alt={user.username} style={{ width: "50px", height: "50px" }}
                                                src={user.avatar}/>}
                                    <div style={TextWrapper}>
                                        <Typography style={userNameParagraph} onClick={() => {
                                            toAnotherUserPage(user.userId);
                                        }}>{user.name}
                                        </Typography>
                                        <Typography style={userNickParagraph} onClick={() => {
                                            toAnotherUserPage(user.userId);
                                        }}>
                                            <Link style={userNickLink}>@{user.username}</Link>
                                        </Typography>
                                    </div>
                                    <Button href="#" sx={{ ...StyledBlackButton, ...customButton }}>follow</Button>
                                </div>
                            </li>
                        ))}
                    </ul> : <Typography sx={emptyArrParagraph}>we have no ideas to show</Typography>
                }
            </Paper>
    );
}


