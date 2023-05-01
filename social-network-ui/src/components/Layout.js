import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import { LoginModal } from "./LoginModal/LoginModal";

export function Layout() {

    return (
        <>
            <Outlet/>
            {/*<LoginModal/>*/}
            {/*<CreateAccountModal/>*/}
            <Link to="*" variant="contained">To not found page 404</Link>
        </>
    );
}