import React from 'react';

import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import { Box, Chip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ToolBarMovies = ({ title, slug }) => {
    return (
        <>
            <Box component="div" display="flex" alignItems="center" flexGrow={1}>
                <MovieCreationOutlinedIcon sx={{ ml: 1 }} />
                <Typography component="h5" color="#9e9e9e" variant='h5' fontWeight={700}>{title}</Typography>
            </Box>
            <Box component="div" display="flex">
                <Link style={{ marginRight: "16px" }} to={`/${slug}`} ><Chip label="مشاهده همه" variant="outlined" size='small' color="primary" sx={{ cursor: "pointer" }} /></Link>
            </Box>
        </>
    );
};

export default ToolBarMovies;