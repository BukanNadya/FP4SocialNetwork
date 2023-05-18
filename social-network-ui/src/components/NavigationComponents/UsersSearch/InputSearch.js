import React from 'react';
import {TextField, Autocomplete} from "@mui/material";
import {UserSearchTextField} from "../NavigationStyles";
import {useDispatch, useSelector} from "react-redux";
import {DeleteUsersSuccess} from "../../../store/actions";

export const InputSearch = ({ ...props }) => {

    const users = useSelector(state => state.usersSearch.users)
    const dispatch = useDispatch()

    return (
            <Autocomplete
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.description
                }
                filterOptions={(x) => x}
                options={users.map((option) => option.name)}
                autoComplete
                includeInputInList
                filterSelectedOptions
                noOptionsText="User not found"
                renderInput={(params) => (
                    <TextField{...props} sx={UserSearchTextField} {...params} label="Search in Capitweet"
                              onBlur={(ev) => {
                                  ev.preventDefault()
                                  dispatch(DeleteUsersSuccess())
                              }}
                    />
                )}
            />
    )
}
