import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Link, useNavigate } from 'react-router-dom';
import { validLoginForm } from '../helper/helper';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_PERSON } from '../GraphQL/mutations';
import { GET_PEOPLE } from '../GraphQL/queries';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const SigninPage = () => {
    const navigate = useNavigate()
    // const [checked, setChecked] = React.useState(true);
    const [userValue, setUserValue] = useState({ name: "", email: "", password: "", comfirmPassword: "", isAccept: false })
    const [error, setError] = useState(validLoginForm(userValue, "login"))
    const [touch, setTouch] = useState({
        email: false,
        password: false,
        naem: false,
        comfirmPassword: false,
        isAccept: false
    })
    const [createPerson, getPerson] = useMutation(CREATE_PERSON, {
        variables: {
            name: userValue.name,
            email: userValue.email,
            password: userValue.password
        }
    })
    const showPeople = useQuery(GET_PEOPLE, { variables: { email: userValue.email } })


    const backClickHandler = () => {
        navigate("/")
    }


    useEffect(() => {
        setError(validLoginForm(userValue, "signin"))
    }, [userValue])

    const changHandler = (evt) => {
        if (evt.target.name != "isAccept") {
            setUserValue({ ...userValue, [evt.target.name]: evt.target.value })
        } else {
            setUserValue({ ...userValue, isAccept: evt.target.checked });
            console.log(userValue.isAccept)
        }
    }

    const submitHandler = () => {
        setTouch({
            email: true,
            password: true,
            isAccept: true,
            name: true,
            comfirmPassword: true
        })
        if (Object.keys(error).length == 0) {
            if (showPeople.data.people.length == 0) {
                toast.success("اطلاعات وارد شد صبر کنید تا تایید شود")
                createPerson()
            } else {
                toast.warn("این ایمیل قبلا ثبت شده است")
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
                                {error.name && touch.name ? <TextField type='text' error helperText={error.name} name='name' value={userValue.name} onChange={changHandler} variant='outlined' label="نام کاربری" fullWidth />
                                    : <TextField type='text' value={userValue.name} onChange={changHandler} name='name' variant='outlined' label="نام کاربری" fullWidth />}
                            </Grid>

                            <Grid item xs={12} mt={2} mx={2}>
                                {error.email && touch.email ? <TextField type='email' error helperText={error.email} name='email' value={userValue.email} onChange={changHandler} variant='outlined' label="ایمیل" fullWidth />
                                    : <TextField type='email' value={userValue.email} onChange={changHandler} name='email' variant='outlined' label="ایمیل" fullWidth />}
                            </Grid>

                            <Grid item xs={12} mt={2} mx={2}>
                                {error.password && touch.password ? <TextField error helperText={error.password} type='password' name='password' value={userValue.password} onChange={changHandler} variant='outlined' label="رمز عبور" fullWidth />
                                    : <TextField type='password' name='password' value={userValue.password} onChange={changHandler} variant='outlined' label="رمز عبور" fullWidth />}
                            </Grid>

                            <Grid item xs={12} mt={2} mx={2}>
                                {error.comfirmPassword && touch.comfirmPassword ? <TextField error helperText={error.comfirmPassword} type='password' name='comfirmPassword' value={userValue.comfirmPassword} onChange={changHandler} variant='outlined' label="تکرار رمز عبور" fullWidth />
                                    : <TextField type='password' name='comfirmPassword' value={userValue.comfirmPassword} onChange={changHandler} variant='outlined' label="تکرار رمز عبور" fullWidth />}
                            </Grid>
                            <Grid item xs={12} mt={2} mx={2}>
                                <FormControlLabel control={error.isAccept && touch.isAccept ? <Checkbox name="isAccept" sx={{ color: "#f44336", "&.Mui-checked": { color: "#f44336" } }} checked={userValue.isAccept} onChange={changHandler} /> : <Checkbox name="isAccept" checked={userValue.isAccept} onChange={changHandler} />} label={<p>همه <Link>قوانین</Link> را قبول می کنم</p>} />
                            </Grid>
                        </CacheProvider>
                        <Grid item xs={12}>
                            <Box component="div" my={4} px={2} display="flex" justifyContent="space-between">
                                {getPerson.loading ? <Button disabled onClick={submitHandler} variant='contained'>در حال انجام</Button> : <Button onClick={submitHandler} variant='contained'>ثبت نام</Button>}
                                <Link to="/login"><Button variant='outlined'>ورود</Button></Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <ToastContainer rtl position='top-center' />
        </>
    );
};

export default SigninPage;