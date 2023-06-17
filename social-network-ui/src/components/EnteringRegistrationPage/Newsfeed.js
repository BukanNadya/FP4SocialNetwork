import React, { useEffect, useState  } from "react";
import { AppBar, Box, Card, CardContent, Toolbar, Typography, Grid } from "@mui/material";
import { RightSideMenu } from "./RightSideMenu";
import { PostsDisplaying } from "../Posts/PostsDisplaying";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByPage } from "../../store/actions";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function Newsfeed() {
    const registrationPageUsersPosts = useSelector(state => state.Posts.registrationPagePosts);
    console.log("registrationPageUsersPosts", registrationPageUsersPosts)
    const page = useSelector(state => state.pageCount.page);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            setIsLoading(true);
            try {
                await dispatch(fetchPostsByPage(page));
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        fetchPosts();
    }, []);

    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
        GridItem: { item: "7", width: "300px" },
        NewsBox: {
            height: "100vh",
            position: "relative",
            width: "300px"
        },
        AppBar: {
            top: "0",
            right: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "none",
            maxWidth: "300px"
        }
    };

    const xsStyles = {
        GridItem: { item: "7", width: "300px" },
        NewsBox: {
            height: "100vh",
            position: "relative",
            width: "300px"
        },
        AppBar: {
            top: "0",
            right: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "none",
            maxWidth: "300px"
        }
    };

    const smStyles = {
        GridItem: { item: "7", width: "600px" },
        NewsBox: {
            height: "100vh",
            position: "relative",
            width: "600px"
        },
        AppBar: {
            top: "0",
            right: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "none",
            maxWidth: "600px"
        }
    };

    const mdStyles = {
        GridItem: { item: "7", width: "600px 282px" },
        NewsBox: {
            height: "100vh",
            position: "relative",
            width: "600px"
        },
        AppBar: {
            top: "0",
            right: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "none",
            maxWidth: "600px"
        }
    };

    const lgStyles = {
        GridItem: { item: "8", width: "600px 350px" },
        NewsBox: {
            height: "100vh",
            position: "relative",
            width: "970px"
        },
        AppBar: {
            top: "0",
            right: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "none",
            maxWidth: "600px"
        }
    };

    const xlStyles = {
        GridItem: { item: "9", width: "600px 350px" },
        NewsBox: {
            height: "100vh",
            position: "relative",
            width: "970px"
        },
        AppBar: {
            top: "0",
            right: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "none",
            maxWidth: "600px"
        }
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

    return (
        <Grid item xs={styles.GridItem.item}>
            <Box display="grid" gridTemplateColumns={styles.GridItem.width} gap={2}
                 sx={styles.NewsBox}>

                <Card sx={{
                    minWidth: 275,
                    position: "relative",
                    paddingTop: "72px",
                    overflow: "unset",
                    paddingBottom: "90px"
                }}>
                    <CardContent sx={{ padding: "0" }}>
                        <AppBar position="fixed" color="primary" sx={styles.AppBar}>
                            <Toolbar sx={{
                                height: "72px",
                                borderBottom: "1px solid rgba(0, 0, 0, 0.1)"
                            }}>
                                <Typography variant="h5" component="div"
                                            sx={{ color: "#000000", fontFamily: "'Lato', sans-serif" }}>
                                    Review
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </CardContent>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", }}>
                        <PostsDisplaying userPosts={registrationPageUsersPosts} isLoading={isLoading}/>
                    </div>
                </Card>
                <RightSideMenu/>
            </Box>
        </Grid>
    );
}

