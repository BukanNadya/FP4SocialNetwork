import React from "react";
import { Outlet } from "react-router-dom";

import { Container, } from "@mui/material";

import { HeaderInformation } from "./NavigationComponents/HeaderInformation";
import { UsersSearch } from "./NavigationComponents/UsersSearch";
import { SideBar } from "./NavigationComponents/SideBar";
import { ContainerStyled, ContentContainer, OutletContainer, OutletWrapper } from "./LayoutStyles";
import { EnterUserNameModal } from "./LoginModal/EnterUserNameModal";
import { LoginModal } from "./LoginModal/LoginModal";
import { Content } from "./CreateAccountModal/Content";

export function Layout() {

    return (
        <Container maxWidth="false" sx={ContainerStyled}>
            <div style={ContentContainer}>
                <SideBar/>
                <div style={{ display: "flex", flexDirection: "column", width: "600px" }}>
                    <HeaderInformation/>
                    <div style={OutletContainer}>
                        <div style={OutletWrapper}>
                            <Outlet/>
                        </div>
                    </div>
                </div>
                <UsersSearch/>
            </div>
            <Content></Content>
        </Container>
    );
}

