import React, { useEffect, useState  } from "react";
import { AppBar, Box, Card, CardContent, Toolbar, Typography, Grid } from "@mui/material";
import { RightSideMenu } from "./RightSideMenu";
import { PostsDisplaying } from "../Posts/PostsDisplaying";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByPage } from "../../store/actions";

export function Newsfeed() {
    const registrationPageUsersPosts = useSelector(state => state.Posts.registrationPagePosts);
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

    return (
        <Grid item xs={9}>
            <Box display="grid" gridTemplateColumns="600px 350px" gap={2}
                 sx={{ height: "100vh", position: "relative", width: "970px" }}>

                <Card sx={{
                    minWidth: 275,
                    position: "relative",
                    width: "600px",
                    paddingTop: "72px",
                    overflow: "unset",
                    paddingBottom: "90px"
                }}>
                    <CardContent sx={{ padding: "0" }}>
                        <AppBar position="fixed" color="primary" sx={{
                            top: "0",
                            right: "auto",
                            backgroundColor: "rgba(255, 255, 255, 0.85)",
                            boxShadow: "none",
                            maxWidth: "600px"
                        }}>
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
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <PostsDisplaying userPosts={registrationPageUsersPosts} isLoading={isLoading}/>
                    </div>
                </Card>
                <RightSideMenu/>
            </Box>
        </Grid>
    );
}

