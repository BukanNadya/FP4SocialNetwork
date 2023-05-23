import React, { useEffect } from "react";
import { PostsDisplaying } from "../components/Posts/PostsDisplaying";

export function Explore() {
    useEffect(()=>{

    })

    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <PostsDisplaying/>
        </div>
    );
}