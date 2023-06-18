import React from 'react';
import {UsersSearch} from "../components/NavigationComponents/UsersSearch/UsersSearch";
import {Search} from "../components/NavigationComponents/UsersSearch/Search/Search";

export function SearchPage () {
    return (
        <div style={{width: "580px", paddingRight: "40px"}}>
            <Search/>
        </div>
    )
}