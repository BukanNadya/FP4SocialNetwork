import React, { useState, useCallback, useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Dialog, Fab, Modal, Tooltip } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SockJS from "sockjs-client";
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LinearProgress from '@mui/material/LinearProgress';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import {
    fetchData,
    fetchPostsByUserId,
    sendPost,
    setPageZero,
    setUserId,
    setUserPostsClear
} from "../store/actions";
import { SidebarLogOutButton } from "../components/NavigationComponents/NavigationStyles";
import { CapybaraSvgPhoto } from "../components/SvgIcons/CapybaraSvgPhoto";
import {
    NameOfUser,
    SvgWrapper,
    WrittenPostWrapper,
    HomeScreenWrapper,
    PostWrapper,
    SendingPostButtonsContainer, imgStyles, textWrapper
} from "./pagesStyles/HomeScreenStyles";
import { PostsDisplaying } from "../components/Posts/PostsDisplaying";
import { SendPostInput } from "../components/Posts/SendPostInput";
import { CharactersTextWrapper, PostImgWrapper, PostsWrapper, SendPostField } from "../components/Posts/PostStyles";
import { decodeToken } from "../components/Posts/decodeToken";
import { apiUrl } from "../apiConfig";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import PostAddIcon from "@mui/icons-material/PostAdd";

import { ScrollContext } from "../components/Layout.js";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import EmojiPicker from 'emoji-picker-react';
import { maxWidth } from "@mui/system";

let stompClient = null;

export function HomeScreen() {
    const userData = useSelector(state => state.userData.userData);
    const [postText, setPostText] = useState("");
    const [postImage, setPostImage] = useState(null);
    const handleParentScroll = useContext(ScrollContext);
    const userId = useSelector(state => state.userData.userData.userId);
    const [isLoading, setIsLoading] = useState(false);
    const userPosts = useSelector(state => state.Posts.posts);
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [isFetchingPosts, setIsFetchingPosts] = useState(false);
    const [allPostsLoaded, setAllPostsLoaded] = useState(false);
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    const [open, setOpen] = useState(false);
    const emojiPickerRef = useRef();

    const theme = useTheme();

    const isXxs = useMediaQuery(theme.breakpoints.between("xxs", "xs"));
    const isXs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
    const isXl = useMediaQuery(theme.breakpoints.up("xl"));

    useEffect(() => {
        function handleClickOutside(event) {
            if(!isOpenEmoji){
                return
            }
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setIsOpenEmoji(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpenEmoji,emojiPickerRef]);


    const xxsStyles = {
        AdaptivePostWrapper: {
            width: "50vw",
            minWidth: "200px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "space-around",
        },
        AdaptiveSendPostField: {
            fontSize: "1.3rem",
            fontFamily: "'Lato', sans-serif",
            width: "65vw",
            maxWidth: "300px",
            marginTop: "20px",
        },
        AdaptiveHomeScreenWrapper: {
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            marginTop: "20px",
        },
        AdaptiveSendingPostButtonsContainer: {
            display: "flex",
            justifyContent: "space-between",
            width: "50vw",
            marginTop: "40px",
            marginBottom: "20px",
        },
        fab: {
            position: "fixed",
            bottom: "16px",
            right: "16px",
        },
        AdaptiveSvgWrapper: {
            display: "none",
        },
        AdaptivePostImgWrapper: {
            ...PostImgWrapper, marginTop: "10px"
        },
        AdaptiveContainerForProgress:{
        },
    };

    const xsStyles = {
        AdaptivePostWrapper: {
            width: "50vw",
            paddingBottom: "40px",
            minWidth: "200px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "space-around",
        },
        AdaptiveHomeScreenWrapper: {
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
        },
        AdaptiveSendingPostButtonsContainer: {
            display: "flex",
            justifyContent: "space-between",
            width: "70vw",
            marginTop: "40px",
            marginBottom: "20px",
        },
        AdaptiveSendPostField: {
            fontSize: "1.3rem",
            fontFamily: "'Lato', sans-serif",
            width: "70vw",
            marginTop: "20px",
        },
        fab: {
            position: "fixed",
            bottom: "16px",
            right: "16px",
        },
        AdaptiveSvgWrapper: {
            display: "none",
        },
        AdaptivePostImgWrapper: {
            ...PostImgWrapper, marginTop: "10px"
        },
        AdaptiveContainerForProgress:{
        },
    };

    const smStyles = {
        AdaptivePostWrapper: {
            width: "470px",
            paddingBottom: "40px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "space-around",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        },
        AdaptiveHomeScreenWrapper: {
            width: "470px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            marginTop: "20px",
        },
        AdaptiveSendingPostButtonsContainer: {
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "400px",
            width: "350px",
            marginTop: "40px",
            marginBottom: "20px",
        },
        AdaptiveSendPostField: {
            fontSize: "1.3rem",
            fontFamily: "'Lato', sans-serif",
            width: "350px",
            maxWidth: "600px",
            marginTop: "20px",
        },
        fab: {
            position: "fixed",
            bottom: "16px",
            right: "16px",
        },
        AdaptiveContainerForProgress:{
        },

    };

    const mdStyles = {
        AdaptivePostWrapper: {
            width: "600px",
            paddingBottom: "40px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "space-around",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        },
        AdaptiveHomeScreenWrapper: {
            width: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "20px",
        },
        AdaptiveSendingPostButtonsContainer: {
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "400px",
            width: "400px",
            marginTop: "40px",
            marginBottom: "20px",
        },
        AdaptiveSendPostField: {
            fontSize: "1.3rem",
            fontFamily: "'Lato', sans-serif",
            width: "450px",
            maxWidth: "600px",
            marginTop: "20px",
        },
        fab: {
            position: "fixed",
            bottom: "16px",
            right: "16px",
        },
        AdaptiveContainerForProgress:{
        },
    };

    const lgStyles = {
        AdaptivePostWrapper: {
            width: "600px",
            paddingBottom: "40px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "space-around",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        },
        AdaptiveHomeScreenWrapper: {
            width: "92%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 30px",
            marginTop: "20px",
        }
        ,
        AdaptiveSendingPostButtonsContainer: {
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "400px",
            width: "400px",
            marginTop: "40px",
            marginBottom: "20px",
        },
        AdaptiveSendPostField: {
            fontSize: "1.3rem",
            fontFamily: "'Lato', sans-serif",
            width: "400px",
            maxWidth: "600px",
            marginTop: "20px",
        },
        fab: {
            position: "fixed",
            bottom: "16px",
            right: "16px",
        },
        AdaptiveContainerForProgress:{
            maxWidth:"600px", marginLeft:"30px"
        },
    };

    const xlStyles = {
        AdaptivePostWrapper: {
            width: "600px",
            paddingBottom: "40px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "space-around",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        },
        AdaptiveHomeScreenWrapper: {
            width: "92%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 30px",
            marginTop: "20px",
        }
        ,
        AdaptiveSendingPostButtonsContainer: {
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "400px",
            width: "400px",
            marginTop: "40px",
            marginBottom: "20px",
        },
        AdaptiveSendPostField: {
            fontSize: "1.3rem",
            fontFamily: "'Lato', sans-serif",
            width: "400px",
            maxWidth: "600px",
            marginTop: "20px",
        },
        fab: {
            position: "fixed",
            bottom: "16px",
            right: "16px",
        },
        AdaptiveContainerForProgress:{
            maxWidth:"600px", marginLeft:"30px"
        },
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

    const handlePostImageChange = useCallback((event) => {
        const file = event.target.files[0];
        setPostImage(file);
    }, []);

    useEffect(() => {
        const socket = new SockJS(`${apiUrl}/websocket`);
        stompClient = Stomp.over(socket);

        return () => {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
        };
    }, []);

    const handleClick = () => {
        if (stompClient) {
            stompClient.send("/app/post", {}, JSON.stringify({ userId: userId }));
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const decodedToken = decodeToken();
                if (decodedToken) {
                    const userId = decodedToken.sub;
                    dispatch(setUserId(userId));
                    dispatch(fetchData(userId));
                    // it's initial loading, we're always starting from the first (0) page
                    await dispatch(fetchPostsByUserId(userId, 0));
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        const initHomeScreen = () => {
            dispatch(setUserPostsClear([]));
            dispatch(setPageZero());
            fetchPosts();
        };
        initHomeScreen();
    }, []);

    const handlePostSubmit = async (values, setSubmitting) => {
        if (values.postText.trim() !== "" || postImage) {
            setSubmitting(true);
    console.log(values)
            let photoFileByteArray = [];
            if (postImage) {
                const reader = new FileReader();
                reader.readAsArrayBuffer(postImage);
                reader.onloadend = async () => {
                    const imageArrayBuffer = new Uint8Array(reader.result);
                    photoFileByteArray = Array.from(imageArrayBuffer);

                    const postObject = {
                        writtenText: values.postText,
                        photoFileByteArray: photoFileByteArray,
                        userId: userId
                    };

                    await dispatch(sendPost(postObject, setSubmitting));
                };
            } else {
                const postObject = {
                    writtenText: values.postText,
                    photoFileByteArray: [],
                    userId: userId
                };
                await dispatch(sendPost(postObject, setSubmitting));
            }

            setPostImage(null);
            setPostText("");
            if (isXs || isXxs) {
                setOpen(false);
            }
        }
    };


    const handleScroll = async (event) => {
        if (isFetchingPosts || allPostsLoaded) {
            return;
        }
        setIsFetchingPosts(true);
        try {
            const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
            if (scrollHeight - scrollTop <= clientHeight + 20) {
                let newPosts = [...userPosts];
                if (newPosts.length > 0) {
                    setPosts([...posts, ...newPosts]);
                } else {
                    setAllPostsLoaded(true);
                }
            }
            handleParentScroll(scrollTop, clientHeight, scrollHeight);
        } finally {
            setIsFetchingPosts(false);
        }
    };

    const onEmojiClick = (event, emojiObject) => {
        setPostText(postText + emojiObject.emoji);
    };

    return (
        <div onScroll={handleScroll} style={styles.AdaptiveHomeScreenWrapper}>
            {isXs || isXxs ? <>
                    <Modal open={open} onClose={() => setOpen(false)}
                           sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ backgroundColor: "white", width: "80vw", padding: "15px 15px" }}>
                            <Formik
                                initialValues={{ postText: "" }}
                                validationSchema={
                                    Yup.object({
                                        postText: Yup.string().max(280, "Must be 280 characters or less"),
                                    })}
                                onSubmit={(values, { resetForm, setSubmitting }) => {
                                    setSubmitting(true);
                                    handlePostSubmit(values, setSubmitting);
                                    resetForm();
                                }}
                            >
                                {({ values, errors, touched, isSubmitting, setFieldValue }) => {
                                    const onEmojiClick2 = (emojiData, event) => {
                                        const emojiCodePoint = parseInt(emojiData.unified, 16); // Преобразование из шестнадцатеричного в десятичный формат
                                        const emojiChar = String.fromCodePoint(emojiCodePoint);
                                        setFieldValue('postText', values.postText + emojiChar);
                                    };

                                    return(
                                        <Form>
                                            <div style={styles.AdaptiveHomeScreenWrapper}>
                                                <div style={styles.AdaptivePostWrapper}>
                                                    <div style={styles.AdaptiveSvgWrapper}>
                                                        {userData.image ? <img src={userData.image}
                                                                               style={imgStyles}
                                                                               alt=""/> : <CapybaraSvgPhoto/>}
                                                    </div>
                                                    <div style={WrittenPostWrapper}>
                                                        <div
                                                            style={textWrapper}>
                                                            <h2 style={NameOfUser}>{userData.name}</h2>
                                                            <h2 style={{
                                                                ...NameOfUser,
                                                                color: "grey",
                                                                marginLeft: "10px"
                                                            }}>@ {userData.userName}</h2>

                                                        </div>
                                                        <Field
                                                            values={postText}
                                                            component={SendPostInput}
                                                            name="postText"
                                                            className={errors.postText && touched.postText ? "error" : ""}
                                                            style={styles.AdaptiveSendPostField}
                                                            id="postText"
                                                            placeholder="What's happening?"
                                                        />
                                                        <div style={CharactersTextWrapper}>
                                                            {
                                                                280 - values.postText.length >= 0 ? (
                                                                    <LinearProgress
                                                                        variant="determinate"
                                                                        value={(values.postText.length / 280) * 100}
                                                                    />
                                                                ) : (
                                                                    <p>Maximum number of characters 280</p>
                                                                )
                                                            }
                                                        </div>
                                                        <Box sx={styles.AdaptivePostImgWrapper}>
                                                            {postImage && (
                                                                <img
                                                                    src={URL.createObjectURL(postImage)}
                                                                    alt="Post Image"
                                                                    style={{ maxWidth: "100%", height: "auto" }}
                                                                />
                                                            )}
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                id="post-image-input"
                                                                onChange={handlePostImageChange}
                                                                style={{ display: "none" }}
                                                            />
                                                            <div style={styles.AdaptiveSendingPostButtonsContainer}>
                                                                <div>
                                                                    <label htmlFor="post-image-input"
                                                                           style={{ height: "30px", borderRadius: "20px", }}>
                                                                        <Tooltip title={"Add image"}>
                                                                            <Button
                                                                                component="span"
                                                                                variant="contained"
                                                                                color="primary"
                                                                                sx={{ ...SidebarLogOutButton, marginTop: 0, padding:0, width:"40px", maxWidth:"40px", minWidth:"0px", height:"40px" }}
                                                                                disabled={!!postImage}
                                                                            ><ImageIcon/></Button>
                                                                        </Tooltip>
                                                                    </label>
                                                                    <label
                                                                        style={{ height: "30px", borderRadius: "20px", }}>
                                                                        <Tooltip title={"Add emoji"}>
                                                                            <Button
                                                                                component="span"
                                                                                variant="contained"
                                                                                color="primary"
                                                                                sx={{ ...SidebarLogOutButton, marginTop: 0, padding:0, width:"40px", maxWidth:"40px", minWidth:"0px", height:"40px", marginLeft:"10px", alignSelf:"start" }}
                                                                                onClick={(event) => {
                                                                                    event.stopPropagation();
                                                                                    setIsOpenEmoji(!isOpenEmoji);
                                                                                }}
                                                                            ><EmojiEmotionsIcon/></Button>
                                                                        </Tooltip>
                                                                        { isOpenEmoji &&  <div ref={emojiPickerRef} style={{marginTop:"10px", position:"absolute", zIndex:"10"}}>
                                                                            <EmojiPicker width={"300px"} height={"300px"} emojiStyle={"google"}  onEmojiClick={onEmojiClick2}/>
                                                                        </div>}

                                                                    </label>
                                                                </div>
                                                                <label htmlFor="post-image-input"
                                                                       style={{ height: "30px", borderRadius: "20px", }}>
                                                                    <Button
                                                                        type="submit"
                                                                        variant="contained"
                                                                        sx={{
                                                                            ...SidebarLogOutButton,
                                                                            marginTop: 0,
                                                                            width: "100px"
                                                                        }}
                                                                        fullWidth={true}
                                                                        disabled={isSubmitting}
                                                                        onClick={handleClick}
                                                                    >
                                                                        {isXxs ?
                                                                            <PostAddIcon/> : (isSubmitting ? "Posting..." : "Post")}
                                                                        <SendOutlinedIcon sx={{marginLeft:"10px", height:"20px", width:"20px"}}/>
                                                                    </Button>
                                                                </label>
                                                            </div>
                                                        </Box>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={styles.AdaptiveContainerForProgress}>
                                                {280 - values.postText.length >= 0 ? (
                                                    <LinearProgress variant="determinate" value={(values.postText.length / 280) * 100} />
                                                ) : (
                                                    <p>Maximum number of characters 280</p>
                                                )}
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </Modal>
                    <Fab color="primary" aria-label="add" style={styles.fab} onClick={() => {
                        setOpen(!open);
                    }}>
                        <AddIcon/>
                    </Fab>
                </>
                : <Formik
                    initialValues={{ postText: "" }}
                    validationSchema={
                        Yup.object({
                            postText: Yup.string().max(280, "Must be 280 characters or less"),
                        })}
                    onSubmit={(values, { resetForm, setSubmitting }) => {
                        setSubmitting(true);
                        handlePostSubmit(values, setSubmitting);
                        resetForm();
                    }}
                >
                    {({ values, errors, touched, isSubmitting, setFieldValue }) => {
                        const onEmojiClick2 = (emojiData, event) => {
                            const emojiCodePoint = parseInt(emojiData.unified, 16); // Преобразование из шестнадцатеричного в десятичный формат
                            const emojiChar = String.fromCodePoint(emojiCodePoint);
                            setFieldValue('postText', values.postText + emojiChar);
                        };

                        return (
                            <Form>
                                <div style={styles.AdaptiveHomeScreenWrapper}>
                                    <div style={styles.AdaptivePostWrapper}>
                                        <div style={SvgWrapper}>
                                            {userData.image ? <img src={userData.image}
                                                                   style={imgStyles}
                                                                   alt=""/> : <CapybaraSvgPhoto/>}
                                        </div>
                                        <div style={WrittenPostWrapper}>
                                            <div
                                                style={textWrapper}>
                                                <h2 style={NameOfUser}>{userData.name}</h2>
                                                <h2 style={{
                                                    ...NameOfUser,
                                                    color: "grey",
                                                    marginLeft: "10px"
                                                }}>@ {userData.userName}</h2>

                                            </div>
                                            <Field
                                                values={postText}
                                                component={SendPostInput}
                                                name="postText"
                                                className={errors.postText && touched.postText ? "error" : ""}
                                                style={styles.AdaptiveSendPostField}
                                                id="postText"
                                                placeholder="What's happening?"
                                            />
                                            <Box sx={PostImgWrapper}>
                                                {postImage && (
                                                    <img
                                                        src={URL.createObjectURL(postImage)}
                                                        alt="Post Image"
                                                        style={{ maxWidth: "100%", height: "auto" }}
                                                    />
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    id="post-image-input"
                                                    onChange={handlePostImageChange}
                                                    style={{ display: "none" }}
                                                />
                                                <div style={styles.AdaptiveSendingPostButtonsContainer}>
                                                    <div>
                                                        <label htmlFor="post-image-input"
                                                               style={{ height: "30px", borderRadius: "20px", }}>
                                                            <Tooltip title={"Add image"}>
                                                            <Button
                                                                component="span"
                                                                variant="contained"
                                                                color="primary"
                                                                sx={{ ...SidebarLogOutButton, marginTop: 0, padding:0, width:"40px", maxWidth:"40px", minWidth:"0px", height:"40px" }}
                                                                disabled={!!postImage}
                                                            ><ImageIcon/></Button>
                                                            </Tooltip>
                                                        </label>
                                                        <label
                                                            style={{ height: "30px", borderRadius: "20px", }}>
                                                            <Tooltip title={"Add emoji"}>
                                                            <Button
                                                                component="span"
                                                                variant="contained"
                                                                color="primary"
                                                                sx={{ ...SidebarLogOutButton, marginTop: 0, padding:0, width:"40px", maxWidth:"40px", minWidth:"0px", height:"40px", marginLeft:"10px", alignSelf:"start" }}
                                                                onClick={(event) => {
                                                                    event.stopPropagation();
                                                                    setIsOpenEmoji(!isOpenEmoji);
                                                                }}
                                                            ><EmojiEmotionsIcon/></Button>
                                                            </Tooltip>
                                                            { isOpenEmoji &&  <div ref={emojiPickerRef} style={{marginTop:"10px", position:"absolute", zIndex:"10"}}>
                                                                <EmojiPicker width={"300px"} height={"350px"} emojiStyle={"google"}  onEmojiClick={onEmojiClick2}/>
                                                            </div>}

                                                        </label>
                                                    </div>
                                                    <label htmlFor="post-image-input"
                                                           style={{ height: "30px", borderRadius: "20px", }}>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            sx={{ ...SidebarLogOutButton, marginTop: 0, width: "100px", height:"40px" }}
                                                            fullWidth={true}
                                                            disabled={isSubmitting}
                                                            onClick={handleClick}
                                                        >
                                                            {isSubmitting ?"Posting..." : "Post"}
                                                            <SendOutlinedIcon sx={{marginLeft:"10px", height:"20px", width:"20px"}}/>
                                                        </Button>
                                                    </label>


                                                </div>
                                            </Box>
                                        </div>
                                    </div>
                                </div>
                                <div style={styles.AdaptiveContainerForProgress}>
                                    {280 - values.postText.length >= 0 ? (
                                        <LinearProgress variant="determinate" value={(values.postText.length / 280) * 100} />
                                    ) : (
                                        <p>Maximum number of characters 280</p>
                                    )}
                                </div>
                            </Form>
                        );
                    }}
                </Formik>}

            <div style={PostsWrapper}>
                <PostsDisplaying userPosts={userPosts} isLoading={isLoading}/>
            </div>
        </div>
    );
}



