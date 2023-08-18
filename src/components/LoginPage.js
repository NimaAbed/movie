import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Link, useNavigate } from 'react-router-dom';
import { validLoginForm } from '../helper/helper';
import { GET_DATA_LOGIN } from "../GraphQL/queries"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { useQuery } from '@apollo/client';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const LoginPage = () => {
    const navigate = useNavigate()
    const [userValue, setUserValue] = useState({ email: "", password: "" })
    const [error, setError] = useState(validLoginForm(userValue, "login"))
    const getUserData = useQuery(GET_DATA_LOGIN, { variables: { email: userValue.email, password: userValue.password } })
    const [touch, setTouch] = useState({
        email: false,
        password: false
    })


    const backClickHandler = () => {
        navigate("/")
    }

    useEffect(() => {
        setError(validLoginForm(userValue, "login"))
    }, [userValue])

    const changHandler = (evt) => {
        setUserValue({ ...userValue, [evt.target.name]: evt.target.value })
    }

    const submitHandler = () => {
        setTouch({
            email: true,
            password: true
        })
        if (Object.keys(error).length == 0) {
            if (getUserData.called) {
                if (!getUserData.loading) {
                    if (getUserData.data.people.length > 0) {
                        console.log("dare")
                        console.log(getUserData)
                        toast.success("اطلاعات وارد شد")
                        navigate("/")
                    } else {
                        console.log("nadare")
                    }
                }
                getUserData.called = false
            }
        } else {
            toast.warn("فرم را کامل کنید")
        }
    }


    return (
        <>
            <Container maxWidth="lg">
                <Box component="div" sx={{ width: { xs: "350px", sm: "400px" }, borderRadius: 4, border: "2px solid silver", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                    <Grid container>
                        <CacheProvider value={cacheRtl} >
                            <Grid item xs={12}>
                                <Box component="div" p={2} display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography component="div" color="primary" fontWeight={700} variant='h5'>ورود</Typography>
                                    <ArrowBackIosRoundedIcon color='primary' sx={{ cursor: "pointer" }} onClick={backClickHandler} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} mt={2} mx={2}>
                                {error.email && touch.email ? <TextField type='email' error helperText={error.email} name='email' value={userValue.email} onChange={changHandler} variant='outlined' label="ایمیل" fullWidth />
                                    : <TextField type='email' value={userValue.email} onChange={changHandler} name='email' variant='outlined' label="ایمیل" fullWidth />}
                            </Grid>
                            <Grid item xs={12} mt={2} mx={2}>
                                {error.password && touch.password ? <TextField error helperText={error.password} type='password' name='password' value={userValue.password} onChange={changHandler} variant='outlined' label="رمز عبور" fullWidth />
                                    : <TextField type='password' name='password' value={userValue.password} onChange={changHandler} variant='outlined' label="رمز عبور" fullWidth />}
                            </Grid>
                        </CacheProvider>
                        <Grid item xs={12}>
                            <Box component="div" my={4} px={2} display="flex" justifyContent="space-between">
                                <Button onClick={submitHandler} variant='contained'>ورود</Button>
                                <Link to="/signin"><Button variant='outlined'>ثبت نام</Button></Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <ToastContainer rtl position='top-center' />
        </>
    );
};

export default LoginPage;