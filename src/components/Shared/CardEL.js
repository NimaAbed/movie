import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardEL = ({ coverPhoto, name, slug }) => {
    const navigate = useNavigate()

    const slugHandler = () => {
        navigate(`/movie/${slug}`)
    }
    return (
        <Box component="div" sx={{ borderRadius: 4, boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px", margin: 1, width: { xs: 155, sm: 175 }, cursor: "pointer" }} onClick={slugHandler}>
            <Card sx={{ boxShadow: "rgba(0,0,0,0.1) 0px 0px", borderRadius: 4 }}>
                <CardMedia
                    sx={{ height: 250, borderRadius: 4, width: { xs: 154, sm: 174 } }}
                    image={coverPhoto.url}
                    title={name}
                />
                <CardContent sx={{ direction: "ltr" }} >
                    <Typography component="h3" variant='h6' sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "1.25rem", textAlign: "start" }}>{name}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CardEL;