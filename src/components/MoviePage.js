import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_MOVIE } from '../GraphQL/queries';
import { Triangle } from 'react-loader-spinner';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Container, Divider, Grid, Typography } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentForm from './Comments/CommentForm';
import Comments from './Comments/Comments';

const MoviePage = () => {

    const { slug } = useParams()
    const { loading, data, error } = useQuery(GET_MOVIE, { variables: { slug } })

    if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><Triangle /></div>

    console.log(data)
    const { movie } = data

    return (
        <Container maxWidth="lg">
            <Grid container mt={10}>

                <Grid item xs={12} sm={5} md={4} p={1} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Box component="img" src={data.movie.coverPhoto.url} alt={movie.name} sx={{ width: { xs: "270px" }, height: "380px", cursor: "pointer", borderRadius: 6, boxShadow: "-2px 7px 20px 3px rgba(125,124,124,0.74)" }} />
                    <Typography pt={2} sx={{ width: "270px", direction: "ltr", textAlign: "center" }} variant='h5'>{movie.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={8} p={1}>
                    <Grid item xs={12} sx={{ width: "100%" }}>
                        <Box component="div" sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 5, color: "#bdbdbd", lineHeight: "35px", overflow: "hidden", width: "100%" }}><span style={{ color: "#424242" }}>خلاصه داستان:</span> {movie.about}</Box>
                    </Grid>
                    <Grid item xs={12} p={2} mt={4}>
                        {movie.episodes.length || movie.seasons.length ? <Accordion sx={{ bgcolor: "#424242", color: "#fff" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>دانلود</Typography>
                            </AccordionSummary>
                            <AccordionDetails >
                                <Grid container spacing={2}>
                                    {!movie.seasons.length ? movie.episodes.map(item => (
                                        <Grid item xs={4} md={2} key={item.id}>
                                            <Button fullWidth variant='contained' size='small' href={item.media.url}>{item.episode} {item.endEpisode && "پایانی"}</Button>
                                        </Grid>
                                    )) : movie.seasons.map(item => (
                                        <Accordion key={item.id} sx={{ width: { xs: "90%", md: "95%" }, bgcolor: "#757575", pl: 2, color: "#fff" }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>{item.season}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ width: { xs: "90%", md: "95%" } }}>
                                                <Grid container spacing={2}>
                                                    {item.episodes.map(item => (
                                                        <Grid item xs={4} md={2}> <Button fullWidth variant='contained' href={item.media.url} color="info" size="small">{item.episode} {item.endEpisode && "پایانی"}</Button></Grid>
                                                    ))}
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                            : <Divider variant='middle'><Chip label="هنوز منتشر نشده است"></Chip></Divider>}
                    </Grid>
                    <Grid item xs={12} mt={4} p={2} sx={{ borderRadius: 4, boxShadow: "0px 6px 16px 0px rgba(120,107,107,0.75)" }}>
                        <CommentForm slug={slug} />
                    </Grid>
                    <Grid item xs={12} mt={4} p={2} sx={{ boxShadow: "0px 6px 16px 0px rgba(120,107,107,0.75)" }}>
                        <Comments slug={slug} />
                    </Grid>
                </Grid >
            </Grid >
        </Container >
    );
};

export default MoviePage;