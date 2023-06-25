import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import { Layout } from "./components/Layout";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomeScreen } from "./pages/HomeScreen";
import { ProfilePage } from "./pages/ProfilePage";
import { SubscriptionPage } from "./pages/SubscriptionPage";
import { Explore } from "./pages/Explore";
import { BrowsePage } from "./pages/BrowsePage";
import { Notifications } from "./pages/Notifications";
import { PostPage } from "./pages/PostPage";
import { Message } from "./pages/Message";
import { SearchPage } from "./pages/SearchPage";
import { PostLikesPage } from "./pages/PostLikesPage";
import { Settings } from "./pages/Settings";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/home" element={<HomeScreen/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/subscribe" element={<SubscriptionPage/>}/>
            <Route path="/view" element={<BrowsePage/>}/>
            <Route path="/messages" element={<Message/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/notifications" element={<Notifications/>}/>
            <Route path="/post/:postId" element={<PostPage/>}/>
            <Route path="/likes/:postId" element={<PostLikesPage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/settings" element={<Settings/>}/>

        </Route>
    )
);

export function App() {
    return (
        <RouterProvider router={router}/>
    );
}