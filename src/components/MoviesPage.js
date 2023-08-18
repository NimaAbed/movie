import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ALL_MOVIES, GET_MOVIES_PAGE } from '../GraphQL/queries';
import CardEL from './Shared/CardEL';
import { Triangle } from "react-loader-spinner"

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

const MoviesPage = () => {
    const { category } = useParams()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [showOnPage, setShowOnPage] = useState(25)
    const { loading, data } = useQuery(GET_MOVIES_PAGE, { variables: { slug: category, first: showOnPage, skip: showOnPage * page - showOnPage } })
    const getMovies = useQuery(GET_ALL_MOVIES, { variables: { slug: category } })

    const handleChange = (event, value) => {
        setPage(value);
    };

    const backHandler = () => {
        navigate(-1)
    }

    if (loading || getMovies.loading) return <Box display="flex" justifyContent="center"><Triangle /></Box>


    return (
        <>
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={12} my={5} display="flex" justifyContent="space-between" alignItems="center">
                        <Typography color="primary" component="h3" variant='h5'>{data.category.name} ها</Typography>
                        <ArrowBackIosRoundedIcon color='primary' sx={{ cursor: "pointer" }} onClick={backHandler} />
                    </Grid>
                    {data.category.movies.map(item => (
                        <Grid item xs={6} sm={4} md={2}>
                            <CardEL {...item} />
                        </Grid>
                    ))}
                    {Math.ceil(Math.ceil(getMovies.data.category.movies.length / showOnPage)) >= 2 && <Grid item xs={12} my={3} display="flex" justifyContent="center">
                        <Pagination variant='outlined' page={page} color='primary' onChange={handleChange} count={Math.ceil(getMovies.data.category.movies.length / showOnPage)} />
                    </Grid>}
                </Grid>
            </Container>
        </>
    );
};

export default MoviesPage;