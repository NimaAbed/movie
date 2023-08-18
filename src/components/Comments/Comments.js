import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../../GraphQL/queries';
import { Dna } from 'react-loader-spinner';
import { Avatar, Box, Chip, Divider, Grid, Typography } from '@mui/material';

const Comments = ({ slug }) => {

    const { data, loading, error } = useQuery(GET_COMMENTS, { variables: { slug } })

    if (loading) return <Box display="flex" justifyContent="center"><Dna /></Box>
    console.log(data)
    return (
        <Box >
            {data.comments.length ? data.comments.map(item => (
                <Grid item xs={12} p={2} sx={{ border: "1px solid silver" }} key={item.id}>
                    <Box display="flex" alignItems="center">
                        <Avatar>{item.name[0]}</Avatar>
                        <Typography mr={1} component="span" variant='h6'>{item.name}</Typography>
                    </Box>
                    <Typography mt={1} component="div" variant='p'>{item.text}</Typography>
                </Grid>
            )) : <Divider variant='middle'><Chip label="کامنتی ارسال نشده "></Chip></Divider>}
        </Box>
    );
};

export default Comments;