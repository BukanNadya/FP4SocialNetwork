import React from "react";

import { Button, TextField } from "@mui/material";

import { SidebarLogOutButton } from "../components/NavigationComponents/NavigationStyles";
import { CapybaraSvgPhoto } from "../components/SvgIcons/CapybaraSvgPhoto";
import {
    NameOfUser,
    PostWrittenInput,
    SvgWrapper,
    WrittenPostWrapper,
    HomeScreenWrapper,
    PostWrapper
} from "./pagesStyles/HomeScreenStyles";
import { Post } from "../components/Posts/Post";

export function HomeScreen() {

    return (
        <>
        <div style={HomeScreenWrapper}>
            <div style={PostWrapper}>
                <div style={SvgWrapper}>
                    <CapybaraSvgPhoto/>
                </div>
                <div style={WrittenPostWrapper}>
                    <h2 style={NameOfUser}>Capybara name</h2>
                    <TextField multiline sx={PostWrittenInput}
                               InputLabelProps={{
                                   sx: {
                                       fontSize: "1.3rem",
                                       fontFamily: "'Lato', sans-serif",
                                   },
                               }} id="standard-basic" label="What`s happening?" variant="standard"/>
                </div>
            </div>
            <Button type="submit"
                    variant="contained" sx={{
                ...SidebarLogOutButton,
                alignSelf: "end",
                marginTop: "30px",
                fontFamily: "'Lato', sans-serif",
            }}
                    fullWidth={true}>Post</Button>
        </div>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", maxWidth:"100%"}}>
    <Post/>
            <Post/>
            </div>
   </>
    );
}