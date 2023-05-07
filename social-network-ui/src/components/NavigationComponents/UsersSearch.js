import React from "react";

import { AppBar, TextField } from "@mui/material";

import { UserSearchAppBar, UserSearchContentWrapper, UserSearchTextField, UserSearchWrapper } from "./NavigationStyles";

export function UsersSearch() {
    return (
        <div style={UserSearchWrapper}>
            <AppBar position="sticky" style={UserSearchAppBar}>
                <TextField
                    sx={UserSearchTextField}
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                />
            </AppBar>
            <div style={UserSearchContentWrapper}>

            </div>
        </div>

    );
}