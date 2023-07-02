import React, {useState, useEffect} from 'react';
import {TextField, Autocomplete, Typography, Grid, Avatar, Box} from "@mui/material";
import {DarkPopper, DarkUserSearchTextField, UserSearchTextField} from "../../NavigationStyles";
import {useDispatch, useSelector} from "react-redux";
import {DeleteUsersSuccess, setSearchData, setSearchId} from "../../../../store/actions";
import {useNavigate} from "react-router-dom";
import {apiUrl} from "../../../../apiConfig";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {DarkPaperStyles, PaperStyles} from "../popularPeopleSidebarStyles";

export const InputSearch = ({ ...props }) => {
    const users = useSelector(state => state.usersSearch.users)
    const userId = useSelector(state => state.userData.searchData.userId);
    const darkMode = useSelector(state => state.userData.userMode.darkMode);
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
          AdaptiveUserSearchTextField: darkMode ? {...DarkUserSearchTextField, width:"92vw"} : {...UserSearchTextField, width:"92vw"}
    };

    const xsStyles = {
        AdaptiveUserSearchTextField: darkMode ? {...DarkUserSearchTextField, width:"92vw"} : {...UserSearchTextField, width:"92vw"}
    };

    const smStyles = {
        AdaptiveUserSearchTextField: darkMode ? {...DarkUserSearchTextField, width:"45%",marginLeft:"80px"} : {...UserSearchTextField, width:"45%",marginLeft:"80px"}
    };

    const mdStyles = {
        AdaptiveUserSearchTextField: darkMode ? {...DarkUserSearchTextField, width:"58%"} : {...UserSearchTextField, width:"58%"},
    };

    const lgStyles = {
        AdaptiveUserSearchTextField: darkMode ? {...DarkUserSearchTextField} : {...UserSearchTextField},
    };

    const xlStyles = {
        AdaptiveUserSearchTextField: darkMode ? {...DarkUserSearchTextField} : {...UserSearchTextField},
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
                options={users}
                autoComplete
                includeInputInList
                filterSelectedOptions
                inputValue={inputValue}
                onInputChange={(event, value) => {
                    setInputValue(value);
                }}
                noOptionsText={
                    inputValue === ''
                        ? "Try searching for people"
                        : "User not found"
                }
                renderInput={(params) => (
                    <TextField{...props} sx={styles.AdaptiveUserSearchTextField} {...params} label="Search in Capitweet"
                              onBlur={(ev) => {
                                  ev.preventDefault()
                                  inputValue === ''
                                      ? dispatch(DeleteUsersSuccess())
                                      : false
                              }}
                              onFocus={(ev) => {
                                  ev.preventDefault()
                                  inputValue === ''
                                      ? dispatch(DeleteUsersSuccess())
                                      : false
                              }}
                    />
                )}
                    renderOption={(props, option) => {

                    return (
                        <li {...props} key={option.userId} style={DarkPopper}>
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
