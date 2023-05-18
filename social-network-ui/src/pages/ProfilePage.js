import React from 'react';
import {Avatar, SvgIcon, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {
    DateStyles, LinkQuantityStyles,
    LinkStyles, LinkTextStyles,
    NameStyles,
    NicknameStyles,
    ProfilePageStyles,
    SvgDateStyles
} from "./pagesStyles/ProfilePageStyles"
import {SwipeableViews} from "../components/ProfilePageSwipeableViews/SwipeableViews";

export function ProfilePage () {
    return (
        <div>
            <div style={ProfilePageStyles}>
                <div>
                    <Avatar sx={{ bgcolor: "rgb(29, 155, 240)", width: "140px", height: "140px" }}>N</Avatar>
                </div>
                <div style={{ margin: "15px 0", display: "flex", flexDirection: "column" }}>
                    <span style={NameStyles}>Name</span>
                    <span style={NicknameStyles}>@_Nick_</span>
                </div>
                <div style={SvgDateStyles}>
                    <SvgIcon viewBox="0 0 24 24" sx={{width: "18px", height: "18px"}}>
                        <g>
                            <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"/>
                        </g>
                    </SvgIcon>
                    <span style={DateStyles}>Date: 10.12.2022</span>
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                    <Link to="/following" variant="contained" style={LinkStyles}>
                        <Typography sx={LinkTextStyles}>
                             <span style={LinkQuantityStyles}>0</span> in readable
                        </Typography>
                    </Link>
                    <Link to="/followers" variant="contained" style={LinkStyles}>
                        <Typography sx={LinkTextStyles}>
                            <span style={LinkQuantityStyles}>0</span> readers
                        </Typography>
                    </Link>
                </div>
            </div>
            <SwipeableViews/>
        </div>
    )
}

