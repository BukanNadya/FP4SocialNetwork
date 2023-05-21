import React from 'react'
import { AppBar, Box, Button, Typography, Container } from "@mui/material"

export function Footer() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, backgroundColor: "rgb(29, 155, 240)" }}>
                <Container sx={{ minWidth: "1300px" }} >
                    <Box display="grid" gridTemplateColumns=" 1fr 2fr 1fr" gap={2} sx={{ height: "72px", alignItems: "center" }}>

                        <div />
                        <Typography variant="h6" component="div" sx={{
                            flexGrow: 1,
                            fontWeight: "400",
                            fontSize: "15px",
                            lineHeight: "1.3",

                        }}>
                            <span style={{ fontWeight: "700", fontSize: "23px", }}>Don&rsquo;t miss what&rsquo;s happening</span>
                            <br />
                            People on Twitter are the first to know.
                        </Typography>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="outlined" color="inherit" sx={{
                                borderRadius: "20px",
                                fontWeight: "700",
                                margin: "10px",
                                textTransform: "inherit",
                                "&:hover": {
                                    transition: "0.7s",
                                    backgroundColor: "#000000",
                                    color: "#ffffff",
                                    borderColor: "#000000"
                                },
                            }}>Log in</Button>
                            <Button variant="contained" sx={{
                                background: "#ffffff",
                                color: "#000000",
                                borderRadius: "20px",
                                fontWeight: "700",
                                margin: "10px",
                                textTransform: "inherit",
                                "&:hover": {
                                    transition: "0.7s",
                                    backgroundColor: "#000000",
                                    color: "#ffffff"
                                },
                            }}>Sing up</Button>
                        </div>
                    </Box>
                </Container>
            </AppBar>
        </Box>
    )
}

