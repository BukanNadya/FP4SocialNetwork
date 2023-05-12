import React, { useState } from "react";
import { Card, CardContent, Avatar, Typography, CardActions, IconButton } from "@mui/material";
import { FavoriteBorder, ChatBubbleOutline, Repeat, Publish } from "@mui/icons-material";

export const Post = () => {

    const text= "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci beatae blanditiis debitis dignissimos harum ipsam labore laboriosam laborum libero officiis omnis perspiciatis quisquam sapiente similique suscipit vel veniam, voluptatum. Accusamus accusantium ad alias aliquid amet animi atque autem deleniti dicta dignissimos distinctio dolor ducimus earum esse, eum excepturi hic, illum impedit, ipsam laborum maiores minima minus molestiae mollitia nam necessitatibus neque obcaecati officiis porro quas quia quidem rem repudiandae tempore tenetur velit voluptatum. Asperiores aspernatur, assumenda commodi dolorem dolorum enim est eum expedita fugit inventore mollitia neque omnis perspiciatis quisquam repudiandae tempora temporibus voluptas. Ab, adipisci alias aliquid amet asperiores consectetur cumque cupiditate delectus eligendi eos ex explicabo fugit illum impedit incidunt ipsum itaque laborum nesciunt optio perspiciatis qui, quisquam saepe similique sunt suscipit vel voluptates! Consequuntur cupiditate distinctio earum error exercitationem, in inventore itaque molestias obcaecati omnis possimus quae quisquam sint totam voluptatum? Accusamus accusantium asperiores illum repudiandae.";
    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    const renderText = () => {
        if (showMore) {
            return text;
        } else {
            const words = text.split(" ");
            const truncatedWords = words.slice(0, 25);
            return truncatedWords.join(" ") + "...";
        }
    };

    return (
        <Card sx={{
            width: "100%",
            maxWidth: "100%",
            borderRadius: 0,
            mb: 1,
            margin: "0",
            padding: "0",
            boxShadow: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)"
        }}>
            <CardContent sx={{ display: "flex", paddingBottom: 0 }}>
                <Avatar alt={"asy"} src="#"/>
                <div style={{ marginLeft: 16, flex: 1 }}>
                    <Typography variant="subtitle1" component="div">
                        Asy <span style={{ color: "#5b7083" }}>@slonotop2103@gmail.com</span> · 24.11.2000
                    </Typography>
                    <Typography variant="body1" component="div" mt={1} sx={{
                        maxHeight: showMore ? 'none' : '90px',
                        overflowY:"hidden",
                        padding: "0, 20px",
                        wordWrap: "break-word", maxWidth: "500px",
                        marginBottom: "12px"
                    }}>{renderText()}
                    </Typography>
                    <a style={{   fontFamily: "'Lato', sans-serif",
                        fontSize: "15px",fontWeight: "700", textDecoration:"none", color:"blue"}} onClick={handleShowMore} href="#">{showMore? "hight text" : "see more"}</a>
                </div>
            </CardContent>
            <CardActions sx={{ padding: "20px 20px" }}>
                <IconButton>
                    <ChatBubbleOutline fontSize="small"/>
                </IconButton>
                <IconButton>
                    <Repeat fontSize="small"/>
                </IconButton>
                <IconButton>
                    <FavoriteBorder fontSize="small"/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

