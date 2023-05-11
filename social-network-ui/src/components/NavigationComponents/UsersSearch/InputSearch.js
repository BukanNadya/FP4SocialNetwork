import React from 'react';
import {TextField, Autocomplete} from "@mui/material";
import {UserSearchTextField} from "../NavigationStyles";

export const InputSearch = ({ ...props }) => {
    return (
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={top100Films.map((option) => option.title)}
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

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }
]