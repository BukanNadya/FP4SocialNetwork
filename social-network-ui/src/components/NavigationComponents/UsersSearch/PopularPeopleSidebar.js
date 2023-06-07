import { Avatar, Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { StyledBlackButton } from "../../LoginModal/loginModalStyles";
import React, { useEffect, useState } from "react";
import { setSearchId } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {apiUrl} from "../../../apiConfig";


export function PopularPeopleSidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mostPopularPeople, setMostPopularPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${apiUrl}/users/popular?page=0`);
                const popularPeople = await response.json();
                setMostPopularPeople(popularPeople);
                console.log(popularPeople);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    const toAnotherUserPage = (userIdWhoSendPost) => {
        dispatch(setSearchId(String(userIdWhoSendPost)));
        navigate("/view");
    };

    return (
         isLoading ? <CircularProgress sx={{ marginTop: "20%", alignSelf:"center" }}/> :
        <Paper elevation={3} sx={{
            minWidth: "200px",
            maxHeight: "620px",
            minHeight:"370px",
            width: "250px",
            marginTop: "20%",
            marginLeft: "9%",
            padding: "10px 20px",
            overflow: "scroll"
        }}>
            {mostPopularPeople.length > 0 ?
                <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                    {mostPopularPeople.map((user, index) => (
                        <li key={user.userId} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            alignItems: "center",
                            borderBottom: index !== mostPopularPeople.length - 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
                            padding: "20px 0",
                        }}>
                            <div style={{
                                width:"100%",
                                listStyle: "none",
                                display: "flex",
                                alignItems:"center",
                                justifyContent: "space-around",
                                margin: "0",
                                padding: "0",
                            }}>
                                {user.profileImageByteArray ? <img src={`data:image/png;base64,${user.profileImageByteArray}`}
                                                             style={{
                                                                 width: "50px",
                                                                 height: "50px",
                                                                 borderRadius: "50px",
                                                                 margin: "0,auto"
                                                             }}
                                                             alt=""/> : <Avatar alt={user.username} style={{ width: "50px", height: "50px" }} src={user.avatar}/>}
                                <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
                                    <Typography style={{
                                        color: "rgb(113, 118, 123)",
                                        fontFamily: "'Lato', sans-serif",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        marginRight: "10px",
                                        textDecoration: "underline",
                                        cursor: "pointer"
                                    }} onClick={()=>{toAnotherUserPage(user.userId)}}>{user.name}
                                    </Typography>
                                    <Typography style={{
                                        color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                        fontSize: "13px",
                                        fontWeight: "400", marginRight: "10px",
                                    }} onClick={()=>{toAnotherUserPage(user.userId)}}>
                                        <Link style={{
                                            color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                            fontSize: "15px",
                                            fontWeight: "400",
                                        }}>@{user.username}</Link>
                                    </Typography>

                                </div>
                                <Button href="#" sx={{
                                    ...StyledBlackButton,
                                    color: "white",
                                    maxWidth: "90px",
                                    maxHeight: "30px",
                                    marginTop: "10px",
                                    transition: "0.7s",
                                    '&:hover': {
                                        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                                        color: "black",
                                    }
                                }}>follow</Button>
                            </div>
                        </li>

                    ))}
                </ul> :
                <Typography sx={{
                    color: "rgb(113, 118, 123)",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "25px",
                    fontWeight: "700",
                    textAlign: "center",
                    marginRight: "10px",
                    cursor: "pointer",
                }}>we have no ideas to show
                </Typography>
            }
        </Paper>
);
}


