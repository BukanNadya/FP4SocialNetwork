import React, {useEffect} from 'react';
import {TextField, Autocomplete, Typography, Grid, Avatar, Box} from "@mui/material";
import {UserSearchTextField} from "../NavigationStyles";
import {useDispatch, useSelector} from "react-redux";
import {DeleteUsersSuccess, setSearchData, setSearchId} from "../../../store/actions";
import {useNavigate} from "react-router-dom";
import {apiUrl} from "../../../apiConfig";

export const InputSearch = ({ ...props }) => {

    const users = useSelector(state => state.usersSearch.users)
    const userId = useSelector(state => state.userData.searchData.userId);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(`${apiUrl}/api/profile/${userId}`);
            const userData = await response.json();
            dispatch(setSearchData(userData));
        };
        if (userId) {
            fetchData();
        }
    }, [userId]);


    return (
            <Autocomplete
                getOptionLabel={(option) => option.username}
                filterOptions={(x) => x}
                options={users}
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
                    renderOption={(props, option) => {

                    return (
                        <li {...props} key={option.userId}>
                            <Grid container alignItems="center" onClick={() => {
                                dispatch(setSearchId(String(option.userId)))
                                navigate("/view")
                            }}>
                                <Grid item sx={{ display: 'flex', width: 44 }}>
                                    <Avatar alt={option.username} src={option.profileImageUrl}/>
                                </Grid>
                                <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                        <Box
                                            component="span"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            {option.name}
                                        </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        @{option.username}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </li>
                    );
                }}
            />
    )
}
