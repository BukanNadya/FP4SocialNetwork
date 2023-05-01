import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import { Layout } from "./components/Layout";
import { HomePage} from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Route>
    )
);

export function App() {
    return (
        <RouterProvider router={router}/>
    );
}