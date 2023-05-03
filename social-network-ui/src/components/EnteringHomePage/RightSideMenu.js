import React from 'react'
import {Box, Button, Card, CardContent, Typography} from "@mui/material";

export function RightSideMenu ()  {
    return (
        <div style={{position: "relative"}}>
        <Box display="grid" gridTemplateColumns="350px" gap={2} sx={{  position: "fixed" }}>
        <Card sx={{ minWidth: 275, height: '336px', maxWidth: "350px", borderRadius: "16px"}}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{fontWeight: "800", lineHeight: "24px", fontSize: "20px", color: "rgb(15, 20, 25)", padding: "12px 16px"}}>
                    Впервые в Твиттере?
                </Typography>
                <Typography sx={{fontWeight: "400", lineHeight: "16px", fontSize: "13px", color: "rgb(83, 100, 113)", padding: "0 16px"}}>
                    Зарегистрируйтесь прямо сейчас, чтобы персонализировать свою ленту!
                </Typography>
                <Button variant="contained" sx={{
                    height: "45px",
                    padding: "0 12px",
                    mb: "12px",
                    mt: "16px", width: "300px", background: "#000000",
                    transition: "0.7s", "&:hover": {
                        transition: "0.7s",
                        backgroundColor: "#ffffff",
                        color: "#000000"
                    },
                    fontWeight: 700,
                    borderRadius: "20px",
                }} fullWidth={true}>With Google!!</Button>
                <Button type="submit"
                        variant="contained" sx={{
                    height: "45px",
                    padding: "0 12px",
                    mb: "16px",
                    mt: "12px", width: "300px", background: "#000000",
                    transition: "0.7s", "&:hover": {
                        transition: "0.7s",
                        backgroundColor: "#ffffff",
                        color: "#000000"
                    },
                    fontWeight: 700,
                    borderRadius: "20px",
                }} fullWidth={true}>Create account</Button>
                <Typography sx={{fontWeight: "400", lineHeight: "16px", fontSize: "13px", color: "rgb(83, 100, 113)", padding: "0 12px", mb: "16px"}}>
                    Регистрируясь, вы соглашаетесь с Условиями предоставления услуг и Политикой конфиденциальности, а также с Политикой использования файлов cookie.
                </Typography>
            </CardContent>
        </Card>
            <Typography  sx={{fontWeight: "400", lineHeight: "16px", fontSize: "13px", color: "rgb(83, 100, 113)", padding: "0 16px", margin: "16px 0"}}>
                Условия предоставления услуг
                Политика конфиденциальности
                Политика в отношении файлов cookie
                Специальные возможности
                Информация о рекламе
                Еще
                © 2023 X Corp.
            </Typography>
        </Box>
        </div>
    )
}