import React, { useRef, useState } from 'react';
import { Box, Button, Chip, Container, Grid, Typography } from '@mui/material';

import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import Navbar from './Layout/Navbar';
import { Link } from 'react-router-dom';
import CardEL from './Shared/CardEL';
import { useQuery } from '@apollo/client';
import { GET_MOVIES_HOME } from '../GraphQL/queries';
import ToolBarMovies from './Shared/ToolBarMovies';



import { Dna } from "react-loader-spinner"

const HomePage = () => {

    const anime = useQuery(GET_MOVIES_HOME, { variables: { first: 6, slug: "anime" } })
    const movie = useQuery(GET_MOVIES_HOME, { variables: { first: 6, slug: "movie" } })
    const series = useQuery(GET_MOVIES_HOME, { variables: { first: 6, slug: "series" } })


    return (
        <>
            <Container maxWidth="lg">
                <Grid container>


                    <Grid item xs={12} mt={10} display="flex">
                        <ToolBarMovies title="انیمه" slug="anime" />
                    </Grid>
                    <Grid item xs={12} mt={3} sx={anime.loading ? { display: "flex", justifyContent: "center", overflow: "hidden" } : { overflow: "hidden" }}  >
                        {anime.loading ? <Dna visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper" />
                            : <Box sx={{ display: "flex", overflow: "auto", "::-webkit-scrollbar": { display: "none" } }}>
                                {anime.data.category.movies.map(item => (
                                    <CardEL key={item.id} {...item} />
                                ))}
                            </Box>}
                    </Grid>


                    <Grid item xs={12} mt={2} display="flex">
                        <ToolBarMovies title="فیلم" slug="movie" />
                    </Grid>
                    <Grid item xs={12} mt={3} sx={movie.loading ? { display: "flex", justifyContent: "center" } : { overflow: "hidden" }}  >
                        {movie.loading ? <Dna visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper" />
                            : <Box sx={{ width: "100%", display: "flex", overflow: "auto", "::-webkit-scrollbar": { display: "none" } }}>
                                {movie.data.category.movies.map(item => (
                                    <CardEL key={item.id} {...item} />
                                ))}
                            </Box>}
                    </Grid>


                    <Grid item xs={12} mt={2} display="flex">
                        <ToolBarMovies title="سریال" slug="series" />
                    </Grid>
                    <Grid item xs={12} mt={3} sx={series.loading ? { display: "flex", justifyContent: "center" } : { overflow: "hidden" }}  >
                        {series.loading ? <Dna visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper" />
                            : <Box sx={{ width: "100%", display: "flex", overflow: "auto", "::-webkit-scrollbar": { display: "none" } }}>
                                {series.data.category.movies.map(item => (
                                    <CardEL key={item.id} {...item} />
                                ))}
                            </Box>}
                    </Grid>
                </Grid>
            </Container >
        </>
    );
};

export default HomePage;