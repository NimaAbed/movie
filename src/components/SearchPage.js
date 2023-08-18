import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SEARCH_MOVIES } from '../GraphQL/queries';
import { searchCoustomer } from '../helper/helper';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Triangle } from 'react-loader-spinner';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import CardEL from './Shared/CardEL';

const SearchPage = () => {
    const { search } = useParams()
    const { loading, data, error } = useQuery(SEARCH_MOVIES, { variables: { search: searchCoustomer(search, "recive") } })
    const navigate = useNavigate()

    if (loading) return <Box display="flex" justifyContent="center"><Triangle /></Box>
    console.log(data)

    const backHandler = () => {
        navigate("/")
    }
    return (
        <Container maxWidth="lg">
            <Grid container >
                <Grid item my={5} xs={12}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography color="primary" variant='h6'>نتایج</Typography>
                        <ArrowBackIosRoundedIcon color='primary' sx={{ cursor: "pointer" }} onClick={backHandler} />
                    </Box>
                </Grid>
                {data.movies.map(item => (
                    <Grid xs={6} sm={4} md={2}>
                        <CardEL {...item} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default SearchPage;