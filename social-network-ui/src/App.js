import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import { Layout } from "./components/Layout";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomeScreen } from "./pages/HomeScreen";
import {ProfilePage} from "./pages/ProfilePage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/home" element={<HomeScreen/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
        </Route>
    )
);

export function App() {
    return (
        <RouterProvider router={router}/>
    );
}