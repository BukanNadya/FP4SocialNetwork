import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import { Layout } from "./components/Layout";
import { RegistrationPage} from "./pages/RegistrationPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomeScreen } from "./pages/HomeScreen";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route path="*" element={<NotFoundPage/>}/>
            {/*<Route path="/explore" element={<RegistrationPage/>}/>*/}
            <Route path="/home" element={<HomeScreen/>}/>
        </Route>
    )
);

export function App() {
    return (
        <RouterProvider router={router}/>
    );
}