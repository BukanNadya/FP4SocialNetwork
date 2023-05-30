import React from "react";

import { AppBar, Avatar, Paper , Typography, Button} from "@mui/material";

import { UserSearchAppBar, UserSearchContentWrapper, UserSearchWrapper } from "../NavigationStyles";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

import { InputSearch } from "./InputSearch";
import { GetUsersSuccess } from "../../../store/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { StyledBlackButton } from "../../LoginModal/loginModalStyles";

export function UsersSearch() {

    const dispatch = useDispatch();

    return (
        <div style={UserSearchWrapper}>
            <AppBar position="sticky" style={UserSearchAppBar}>
                <Formik initialValues={{
                    userName: "",
                }} validationSchema={
                    Yup.object(
                        {
                            userName: Yup.string().required("Username is required")
                        }
                    )} validate={async (values) => {
                    const response = await fetch("http://localhost:8080/search", {
                        method: "POST",
                        body: JSON.stringify({ userSearch: values.userName }),
                        headers: { "Content-Type": "application/json" }
                    });
                    const userSearch = await response.json();
                    if (response.status === 302) {
                        dispatch(GetUsersSuccess(userSearch));
                    }
                }}>
                    <Form>

                        <Field as={InputSearch} sx={{ width: "400px" }}
                               name={"userName"} id="userName"
                               label="Username" type="text"/>

                    </Form>
                </Formik>
                <Paper elevation={3} sx={{
                    minWidth: "200px",
                    minHeight: "620px",
                    width: "250px",
                    marginTop: "20%",
                    marginLeft: "9%",
                    padding: "10px 20px",
                    overflow:"scroll"
                }}>
                    <ul style={{listStyle:"none", margin:"0", padding:"0"}}>
                        <li style={{display:"flex", flexDirection:"column", alignItems:"center", borderBottom: "1px solid rgba(0, 0, 0, 0.1)", borderTop: "1px solid rgba(0, 0, 0, 0.1)",padding: "20px 0"}}>
                            <div style={{listStyle:"none", display:"flex", justifyContent:"start", alignItems:"center", margin:"0", padding:"0"}} >
                                <Avatar alt="username" style={{width:"50px", height:"50px"}} src="#"/>
                                <div style={{display:"flex", flexDirection:"column", marginLeft: "20px"}}>
                                <Typography style={{
                                    color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                    fontSize: "13px",
                                    fontWeight: "400", marginRight: "10px",
                                }}>
                                    <Link style={{
                                        color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                    }}> name</Link>
                                </Typography>
                                <Typography style={{
                                    color: "rgb(113, 118, 123)",
                                    fontFamily: "'Lato', sans-serif",
                                    fontSize: "15px",
                                    fontWeight: "400",
                                    marginRight: "10px",
                                    textDecoration: "underline",
                                    cursor: "pointer"
                                }}>username
                                </Typography>
                                </div>
                                <Typography style={{
                                    color: "rgb(113, 118, 123)",
                                    fontFamily: "'Lato', sans-serif",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    marginRight: "10px",
                                    cursor: "pointer",

                                }}>Followers:323432
                                </Typography>
                            </div>
                            <Button href="#" sx={{...StyledBlackButton, color:"white", maxWidth:"200px", maxHeight:"30px", marginTop:"10px"}}>follow</Button>
                        </li>
                        <li style={{display:"flex", flexDirection:"column", alignItems:"center", borderBottom: "1px solid rgba(0, 0, 0, 0.1)", padding: "20px 0"}}>
                            <div style={{listStyle:"none", display:"flex", justifyContent:"start", alignItems:"center", margin:"0", padding:"0"}} >
                                <Avatar alt="username" style={{width:"50px", height:"50px"}} src="#"/>
                                <div style={{display:"flex", flexDirection:"column", marginLeft: "20px"}}>
                                    <Typography style={{
                                        color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                        fontSize: "13px",
                                        fontWeight: "400", marginRight: "10px",
                                    }}>
                                        <Link style={{
                                            color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                            fontSize: "15px",
                                            fontWeight: "400",
                                        }}> name</Link>
                                    </Typography>
                                    <Typography style={{
                                        color: "rgb(113, 118, 123)",
                                        fontFamily: "'Lato', sans-serif",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        marginRight: "10px",
                                        textDecoration: "underline",
                                        cursor: "pointer"
                                    }}>username
                                    </Typography>
                                </div>
                                <Typography style={{
                                    color: "rgb(113, 118, 123)",
                                    fontFamily: "'Lato', sans-serif",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    marginRight: "10px",
                                    cursor: "pointer",

                                }}>Followers:323432
                                </Typography>
                            </div>
                            <Button href="#" sx={{...StyledBlackButton, color:"white", maxWidth:"200px", maxHeight:"30px", marginTop:"10px"}}>follow</Button>
                        </li>
                        <li style={{display:"flex", flexDirection:"column", alignItems:"center", borderBottom: "1px solid rgba(0, 0, 0, 0.1)", padding: "20px 0"}}>
                            <div style={{listStyle:"none", display:"flex", justifyContent:"start", alignItems:"center", margin:"0", padding:"0"}} >
                                <Avatar alt="username" style={{width:"50px", height:"50px"}} src="#"/>
                                <div style={{display:"flex", flexDirection:"column", marginLeft: "20px"}}>
                                    <Typography style={{
                                        color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                        fontSize: "13px",
                                        fontWeight: "400", marginRight: "10px",
                                    }}>
                                        <Link style={{
                                            color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                            fontSize: "15px",
                                            fontWeight: "400",
                                        }}> name</Link>
                                    </Typography>
                                    <Typography style={{
                                        color: "rgb(113, 118, 123)",
                                        fontFamily: "'Lato', sans-serif",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        marginRight: "10px",
                                        textDecoration: "underline",
                                        cursor: "pointer"
                                    }}>username
                                    </Typography>
                                </div>
                                <Typography style={{
                                    color: "rgb(113, 118, 123)",
                                    fontFamily: "'Lato', sans-serif",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    marginRight: "10px",
                                    cursor: "pointer",

                                }}>Followers:323432
                                </Typography>
                            </div>
                            <Button href="#" sx={{...StyledBlackButton, color:"white", maxWidth:"200px", maxHeight:"30px", marginTop:"10px"}}>follow</Button>
                        </li>
                        <li style={{display:"flex", flexDirection:"column", alignItems:"center", borderBottom: "1px solid rgba(0, 0, 0, 0.1)", padding: "20px 0"}}>
                            <div style={{listStyle:"none", display:"flex", justifyContent:"start", alignItems:"center", margin:"0", padding:"0"}} >
                                <Avatar alt="username" style={{width:"50px", height:"50px"}} src="#"/>
                                <div style={{display:"flex", flexDirection:"column", marginLeft: "20px"}}>
                                    <Typography style={{
                                        color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                        fontSize: "13px",
                                        fontWeight: "400", marginRight: "10px",
                                    }}>
                                        <Link style={{
                                            color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                            fontSize: "15px",
                                            fontWeight: "400",
                                        }}> name</Link>
                                    </Typography>
                                    <Typography style={{
                                        color: "rgb(113, 118, 123)",
                                        fontFamily: "'Lato', sans-serif",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        marginRight: "10px",
                                        textDecoration: "underline",
                                        cursor: "pointer"
                                    }}>username
                                    </Typography>
                                </div>
                                <Typography style={{
                                    color: "rgb(113, 118, 123)",
                                    fontFamily: "'Lato', sans-serif",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    marginRight: "10px",
                                    cursor: "pointer",

                                }}>Followers:323432
                                </Typography>
                            </div>
                            <Button href="#" sx={{...StyledBlackButton, color:"white", maxWidth:"200px", maxHeight:"30px", marginTop:"10px"}}>follow</Button>
                        </li>
                        <li style={{display:"flex", flexDirection:"column", alignItems:"center", borderBottom: "1px solid rgba(0, 0, 0, 0.1)", padding: "20px 0"}}>
                            <div style={{listStyle:"none", display:"flex", justifyContent:"start", alignItems:"center", margin:"0", padding:"0"}} >
                                <Avatar alt="username" style={{width:"50px", height:"50px"}} src="#"/>
                                <div style={{display:"flex", flexDirection:"column", marginLeft: "20px"}}>
                                    <Typography style={{
                                        color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                        fontSize: "13px",
                                        fontWeight: "400", marginRight: "10px",
                                    }}>
                                        <Link style={{
                                            color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                            fontSize: "15px",
                                            fontWeight: "400",
                                        }}> name</Link>
                                    </Typography>
                                    <Typography style={{
                                        color: "rgb(113, 118, 123)",
                                        fontFamily: "'Lato', sans-serif",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        marginRight: "10px",
                                        textDecoration: "underline",
                                        cursor: "pointer"
                                    }}>username
                                    </Typography>
                                </div>
                                <Typography style={{
                                    color: "rgb(113, 118, 123)",
                                    fontFamily: "'Lato', sans-serif",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    marginRight: "10px",
                                    cursor: "pointer",

                                }}>Followers:323432
                                </Typography>
                            </div>
                            <Button href="#" sx={{...StyledBlackButton, color:"white", maxWidth:"200px", maxHeight:"30px", marginTop:"10px"}}>follow</Button>
                        </li>
                        <li style={{display:"flex", flexDirection:"column", alignItems:"center", borderBottom: "1px solid rgba(0, 0, 0, 0.1)", padding: "20px 0"}}>
                            <div style={{listStyle:"none", display:"flex", justifyContent:"start", alignItems:"center", margin:"0", padding:"0"}} >
                                <Avatar alt="username" style={{width:"50px", height:"50px"}} src="#"/>
                                <div style={{display:"flex", flexDirection:"column", marginLeft: "20px"}}>
                                    <Typography style={{
                                        color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                        fontSize: "13px",
                                        fontWeight: "400", marginRight: "10px",
                                    }}>
                                        <Link style={{
                                            color: "rgb(113, 118, 123)", fontFamily: "'Lato', sans-serif",
                                            fontSize: "15px",
                                            fontWeight: "400",
                                        }}> name</Link>
                                    </Typography>
                                    <Typography style={{
                                        color: "rgb(113, 118, 123)",
                                        fontFamily: "'Lato', sans-serif",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        marginRight: "10px",
                                        textDecoration: "underline",
                                        cursor: "pointer"
                                    }}>username
                                    </Typography>
                                </div>
                                <Typography style={{
                                    color: "rgb(113, 118, 123)",
                                    fontFamily: "'Lato', sans-serif",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    marginRight: "10px",
                                    cursor: "pointer",

                                }}>Followers:323432
                                </Typography>
                            </div>
                            <Button href="#" sx={{...StyledBlackButton, color:"white", maxWidth:"200px", maxHeight:"30px", marginTop:"10px"}}>follow</Button>
                        </li>
                    </ul>
                </Paper>
            </AppBar>
            <div style={UserSearchContentWrapper}></div>
        </div>

    );
}
