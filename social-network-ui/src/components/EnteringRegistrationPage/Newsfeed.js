import React, { useEffect, useState  } from "react";
import { AppBar, Box, Card, CardContent, Toolbar, Typography, Grid, SvgIcon } from "@mui/material";
import { RightSideMenu } from "./RightSideMenu";
import { PostsDisplaying } from "../Posts/PostsDisplaying";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByPage } from "../../store/actions";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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

    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));


    const xxsStyles = {
        GridItem: { item: 7, width: "300px" },
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
            maxWidth: "100%",
            width:"100vw",
        }
    };

    const xsStyles = {
        GridItem: { item: 7, width: "100vw" },
        NewsBox: {
            height: "100vh",
            position: "relative",
            width: "200px"
        },
        AppBar: {
            top: "0",
            right: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "none",
            width:"100vw",
            maxWidth: "100%"
        }
    };

    const smStyles = {
        GridItem: { item: 7, width: "470px" },
        NewsBox: {
            height: "100vh",
            position: "relative",
            width: "200px"
        },
        AppBar: {
            top: "0",
            right: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "none",
            maxWidth: "470px"
        }
    };

    const mdStyles = {
        GridItem: { item: 7, width: "600px 282px" },
        NewsBox: {
            height: "100vh",
            position: "relative",
            width: "200px"
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
        GridItem: { item: 8, width: "600px 350px" },
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
        GridItem: { item: 9, width: "600px 350px" },
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
                    minWidth: "200px",
                    position: "relative",
                    paddingTop: "72px",
                    overflow: "unset",
                    paddingBottom: "90px"
                }}>
                    <CardContent sx={{ padding: "0" }}>
                        <AppBar position="fixed" color="primary" sx={styles.AppBar}>
                            <Toolbar sx={{
                                height: "72px",
                                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                                width: isXxs ? "100vw" : null,
                            }}>
                                <Typography variant="h5" component="div"
                                            sx={{ color: "#000000", fontFamily: "'Lato', sans-serif", display:"flex", alignItems:"center", justifyContent:"center" }}>

                                    {isXxs || isXs ? <SvgIcon sx={{ width: "40px", height: "40px", marginRight:"20px"}}  version="1.1" id="Layer_1"
                                             viewBox="0 0 512 512">
                                        <g>
                                            <path  d="M512,136.249v30.012c0,19.695-26.352,29.681-78.326,29.681c-4.025,0-7.697-0.133-11.058-0.365
		c-15.327,28.077-33.075,51.521-52.815,69.701c-20.248,18.644-36.647,26.286-44.609,29.172c-5.452,1.979-9.322,6.923-10.107,12.883
		c-2.444,18.622-6.558,52.638-6.558,71.249c0,21.873,12.463,27.679,12.584,27.734c3.649,1.526,5.728,5.408,4.943,9.289
		c-0.774,3.87-4.169,6.657-8.128,6.657h-19.739c-13.104,0-24.516-8.836-27.734-21.508c-5.54-21.763-12.363-51.941-13.801-73.405
		l-2.3-5.739c-13.602,4.744-31.295,6.215-49.796,6.215c-16.278,0-33.164-1.139-48.435-2.156c-17.14-1.15-33.33-2.234-40.02-0.885
		c-0.354,0.077-0.708,0.122-1.062,0.144c-19.927,18.434-43.581,30.366-57.249,37.244c-2.178,1.106-4.545,2.289-6.226,3.196
		c-2.908,30.864,2.344,44.421,5.043,49.154h4.766c4.578,0,8.294,3.716,8.294,8.294c0,4.589-3.716,8.294-8.294,8.294H43.68
		c-1.637,0-3.24-0.475-4.6-1.393l-26.54-17.693c-1.968-1.305-3.273-3.384-3.605-5.717l-8.847-61.927
		c-0.387-2.72,0.586-5.441,2.599-7.287c9.223-8.482,23.853-26.33,23.853-38.129c0-6.237-4.335-13.204-9.344-21.276
		C9.532,265.355,0,250.017,0,228.188c0-46.666,44.587-114.454,114.454-114.454c34.347,0,73.858,8.316,108.714,15.636
		c26.595,5.596,51.709,10.87,68.064,10.904c7.376-1.039,45.328-24.693,62.844-39.843c-0.177-1.681-0.254-3.406-0.21-5.153
		c0.177-6.79,4.058-11.91,10.373-13.701c7.907-2.245,17.505,1.537,22.515,3.992c2.333,1.15,6.812,3.55,11.014,7
		c46.556-5.374,89.34,17.848,105.729,28.221C508.815,124.152,512,129.935,512,136.249z M495.413,166.262v-30.012
		c0-0.608-0.276-1.128-0.785-1.449c-11.169-7.055-49.287-28.84-89.97-26.208c-0.619,1.051-1.482,1.968-2.566,2.687
		c-3.826,2.51-8.968,1.438-11.479-2.4c-3.561-5.43-14.94-10.915-20.137-11.423c0.509,10.273,7.144,19.562,7.21,19.662
		c2.72,3.693,1.924,8.88-1.769,11.6c-1.482,1.084-3.196,1.603-4.899,1.603c-2.554,0-5.065-1.161-6.69-3.373
		c-0.221-0.299-2.754-3.793-5.275-9.201c-8.106,6.359-18.888,13.978-29.681,20.878c-28.508,18.235-35.398,18.235-37.985,18.235
		c-18.08,0-42.895-5.208-71.625-11.257c-34.071-7.155-72.686-15.283-105.308-15.283c-26.617,0-51.863,12.175-71.083,34.27
		c-16.521,18.998-26.783,43.371-26.783,63.596c0,17.096,7.464,29.117,14.697,40.739c6.093,9.809,11.843,19.065,11.843,30.034
		c0,19.087-18.224,39.423-26.02,47.263l7.719,54.053l11.899,7.94c-2.477-10.572-3.738-25.987-1.294-48.225
		c0.597-5.43,4.202-7.243,14.896-12.629c18.644-9.388,57.426-28.929,74.489-61.13c2.145-4.047,7.166-5.584,11.213-3.439
		c4.047,2.145,5.596,7.166,3.45,11.213c-2.554,4.81-5.496,9.344-8.714,13.635c7.542,0.199,16.477,0.796,26.463,1.471
		c29.26,1.968,68.584,4.589,90.955-2.93l-8.725-21.829c-1.703-4.257,0.365-9.079,4.611-10.782c4.257-1.703,9.09,0.365,10.782,4.622
		l17.693,44.233c0.332,0.829,0.531,1.714,0.586,2.61c1.216,21.265,8.913,54.009,13.403,71.625c1.349,5.308,6.137,9.013,11.655,9.013
		h0.144c-3.616-6.458-6.392-15.272-6.392-27.093c0-18.578,3.638-50.172,6.701-73.405c1.592-12.131,9.599-22.216,20.889-26.308
		c7.951-2.897,48.203-20.259,85.636-86.045c-9.588-2.621-15.648-6.646-21.508-11.125c-3.638-2.776-4.324-7.984-1.548-11.622
		c2.787-3.638,7.995-4.335,11.633-1.548c8.548,6.535,15.946,10.826,39.932,10.826C480.318,179.355,495.413,170.541,495.413,166.262z
		"/>
                                            <path  d="M424.086,122.581c4.578,0,8.294,3.716,8.294,8.294c0,4.589-3.716,8.294-8.294,8.294h-8.847
		c-4.578,0-8.294-3.705-8.294-8.294c0-4.578,3.716-8.294,8.294-8.294H424.086z"/>
                                        </g>
                                    </SvgIcon> : null} Review
                                </Typography>
                            </Toolbar>

                        </AppBar>
                    </CardContent>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", }}   data-testid={"news_feed_registration_page_and_right_side_menu"}>
                        <PostsDisplaying userPosts={registrationPageUsersPosts} isLoading={isLoading}/>
                    </div>
                </Card>
                {isXs || isXxs || isSm  ? null :<RightSideMenu/>}
            </Box>
        </Grid>
    );
}

