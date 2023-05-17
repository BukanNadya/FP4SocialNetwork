import React from 'react';
import {TextField, Autocomplete} from "@mui/material";
import {UserSearchTextField} from "../NavigationStyles";
import {useSelector} from "react-redux";

export const InputSearch = ({ ...props }) => {

    const users = useSelector(state => state.usersSearch.users)

    return (
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                noOptionsText="Try searching for people, topics, or keywords"
                options={users.map((option) => option.name)}
                renderInput={(params) => (
                    <TextField
                        {...props}
                        sx={UserSearchTextField}
                        {...params}
                        label="Search in Capitweet"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
    )
}
