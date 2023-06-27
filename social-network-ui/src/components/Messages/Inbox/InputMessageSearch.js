import React, {useState, useEffect} from 'react';
import {TextField, Autocomplete, Typography, Grid, Avatar, Box} from "@mui/material";
import {UserSearchTextField} from "./SearchStyles";
import {useDispatch, useSelector} from "react-redux";
import {DeleteMessageSuccess, setSearchData} from "../../../store/actions";
import {useNavigate} from "react-router-dom";
import {apiUrl} from "../../../apiConfig";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {fetchUserInbox} from "../../../store/Thunks/fetchUserInboxThunk";

export const InputMessageSearch = ({ ...props }) => {
    const message = useSelector(state => state.messageSearch.message)
    const userId = useSelector(state => state.userData.searchData.userId);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.down("xxs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
        AdaptiveUserSearchTextField:{...UserSearchTextField, margin: "10px", width: "calc(100% - 25px)"}
    };

    const xsStyles = {
        AdaptiveUserSearchTextField:{...UserSearchTextField, margin: "10px", width: "calc(100% - 25px)"}
    };

    const smStyles = {
        AdaptiveUserSearchTextField:{...UserSearchTextField, margin: "10px", width: "calc(100% - 25px)"}
    };

    const mdStyles = {
        AdaptiveUserSearchTextField:{...UserSearchTextField, width:"350px", marginLeft:"25px"}
    };

    const lgStyles = {
        AdaptiveUserSearchTextField:{...UserSearchTextField, width:"420px", marginLeft:"15px"}
    };

    const xlStyles = {
        AdaptiveUserSearchTextField:{...UserSearchTextField, width:"420px", marginLeft:"15px"}
    };

    let styles;
    if (isXl) {
        styles = xlStyles;
    } else if (isLg) {
        styles = lgStyles;
    } else if (isMd) {
        styles = mdStyles;
    } else if (isSm) {
        styles = smStyles;
    } else if (isXs) {
        styles = xsStyles;
    } else {
        styles = xxsStyles;
    }

    const [inputValue, setInputValue] = useState('');

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
            options={message}
            autoComplete
            includeInputInList
            filterSelectedOptions
            inputValue={inputValue}
            onInputChange={(event, value) => {
                setInputValue(value);
            }}
            noOptionsText={
                inputValue === ''
                    ? "Try searching for messages"
                    : "Messages not found"
            }
            renderInput={(params) => (
                <TextField{...props} sx={styles.AdaptiveUserSearchTextField} {...params} label="Search message or people"
                          onBlur={(ev) => {
                              ev.preventDefault()
                              inputValue === ''
                                  ? dispatch(DeleteMessageSuccess())
                                  : false
                          }}
                          onFocus={(ev) => {
                              ev.preventDefault()
                              inputValue === ''
                                  ? dispatch(DeleteMessageSuccess())
                                  : false
                          }}
                />
            )}
            renderOption={(props, option) => {

                return (
                    <li {...props} key={option.userId}>
                        <Grid container alignItems="center" onClick={() => {
                            dispatch(fetchUserInbox(option.userId))
                            // dispatch(setSearchId(String(option.userId)))
                            // navigate("/view")
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
                                {option.message ?
                                    <Typography variant="body2" color="text.secondary">
                                        {option.message}
                                    </Typography>
                                    :
                                    <Typography variant="body2" color="text.secondary">
                                         @{option.username}
                                    </Typography>
                                }
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    )
}