import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { validCommentForm } from '../../helper/helper';
import { ToastContainer, toast } from "react-toastify"
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../../GraphQL/mutations';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const CommentForm = ({ slug }) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        text: ""
    })
    const [error, setError] = useState("")
    const [accComment, setAccComment] = useState(false)
    const [touch, setTouch] = useState({
        name: false,
        email: false,
        text: false
    })
    const [sendComment, getComment] = useMutation(CREATE_COMMENT)

    useEffect(() => {
        setError(validCommentForm(data))
    }, [data])

    const changeHandler = (evt) => {
        setData({ ...data, [evt.target.name]: evt.target.value })
    }

    const submitHandler = () => {
        setTouch({
            name: true,
            email: true,
            text: true
        })
        if (Object.keys(error).length == 0) {
            setAccComment(true)
            sendComment({ variables: { name: data.name, email: data.email, text: data.text, slug } })
        } else {
            toast.warn("فرم را کامل کنید")
        }
    }

    if (accComment && !getComment.loading) {
        toast.success("کامنت ارسال و در حال تایید می باشد")
        setAccComment(false)
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography component="div" color="primary" variant='h5'>فرم کامنت</Typography>
                </Grid>
                <CacheProvider value={cacheRtl}>
                    <Grid item xs={12} mt={2}>
                        {error.name && touch.name ? <TextField error helperText={error.name} type='text' name='name' value={data.name} onChange={changeHandler} label="نام کاربری" variant='outlined' fullWidth />
                            : <TextField type='text' name='name' value={data.name} onChange={changeHandler} label="نام کاربری" variant='outlined' fullWidth />}
                    </Grid>
                    <Grid item xs={12} mt={2}>
                        {error.email && touch.email ? <TextField error helperText={error.email} type='email' name='email' value={data.email} onChange={changeHandler} label="ایمیل" variant='outlined' fullWidth />
                            : <TextField type='email' name='email' value={data.email} onChange={changeHandler} label="ایمیل" variant='outlined' fullWidth />}
                    </Grid>
                    <Grid item xs={12} mt={2}>
                        {error.text && touch.text ? <TextField error helperText={error.text} type='text' name='text' value={data.text} onChange={changeHandler} multiline minRows={4} label="نظر خود را وارد کنید" variant='outlined' fullWidth />
                            : <TextField type='text' name='text' value={data.text} onChange={changeHandler} label="نظر خود را وارد کنید" variant='outlined' multiline minRows={4} fullWidth />}
                    </Grid>
                    <Grid item xs={12} mt={2}>
                        {getComment.loading ? <Button disabled onClick={submitHandler} variant='contained'>در حال ارسال ...</Button>
                            : <Button onClick={submitHandler} variant='contained'>ارسال</Button>}
                    </Grid>
                </CacheProvider>
            </Grid >
            <ToastContainer rtl position='top-center' />
        </>
    );
};

export default CommentForm;