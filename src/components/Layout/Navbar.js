import React, { useEffect, useState } from 'react';
import { alpha, styled, InputBase, AppBar, Box, Button, Container, Divider, IconButton, Menu, MenuItem, Toolbar, Typography, Drawer, TextField } from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom"


import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AutoAwesomeMotionRoundedIcon from '@mui/icons-material/AutoAwesomeMotionRounded';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import TvIcon from '@mui/icons-material/Tv';
import CloudIcon from '@mui/icons-material/Cloud';
import PersonIcon from '@mui/icons-material/Person';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { searchCoustomer } from '../../helper/helper';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },

}));

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
        [theme.breakpoints.down('sm')]: {
            width: "10ch"
        }
    },
}));

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState("")
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const searchHandler = (evt) => {
        evt.preventDefault()
        console.log(search)
        navigate(`/search/${searchCoustomer(search, "send")}`)
        setSearch("")

    }

    useEffect(() => {
        setIsDrawerOpen(false)
    }, [pathname])

    return (
        <>
            <AppBar position='sticky'>
                <Container maxWidth="lg">
                    <Toolbar>
                        <IconButton onClick={() => setIsDrawerOpen(true)} size='large' edge="start" color="inherit" aria-label='menu'
                            sx={{ ml: 2, display: { xs: "flex", md: "none" } }} >
                            <MenuRoundedIcon />
                        </IconButton>
                        <Link to="/" style={{ color: "inherit" }}>
                            <IconButton size="large" edge="start" color="inherit" aria-label='home'
                                sx={{ ml: 1, display: { xs: "none", md: "flex" } }}>
                                <HomeRoundedIcon />
                            </IconButton>
                        </Link>

                        <Box component="div" sx={{ display: { xs: "none", md: "flex" } }}>
                            <Button
                                color='inherit'
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}><AutoAwesomeMotionRoundedIcon sx={{ ml: "5px" }} fontSize='small' />دسته بندی</Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}>
                                <Link to='/anime' style={{ textDecoration: "none", color: "black" }}><MenuItem onClick={handleClose}><TvIcon sx={{ ml: "5px" }} fontSize='small' />انیمه</MenuItem></Link>
                                <Divider variant='middle' />
                                <Link to="/series" style={{ textDecoration: "none", color: "black" }}><MenuItem onClick={handleClose}><CloudIcon sx={{ ml: "5px" }} fontSize="small" />سریال</MenuItem></Link>
                                <Divider variant='middle' />
                                <Link to='/movie' style={{ textDecoration: "none", color: "black" }}><MenuItem onClick={handleClose}><LocalMoviesIcon fontSize='small' sx={{ ml: "5px" }} />فیلم</MenuItem></Link>
                            </Menu>
                        </Box>
                        <Typography sx={{ fontSize: { xs: "17px", sm: "1.5rem", } }} component="h3" variant='h5'>
                            فیلم دانلودر
                        </Typography>
                        <Box display={{ xs: "none", sm: "flex" }}>
                            <form onSubmit={searchHandler}>
                                <Search typeof='submit' sx={{ mr: 2, }}>
                                    <StyledInputBase value={search} onChange={(e) => setSearch(e.target.value)} type='text' placeholder="جستجو..."
                                        inputProps={{ 'aria-label': 'search' }} />
                                </Search >
                            </form>
                        </Box>
                        <Box component="div" flexGrow={1} />
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                                <Button size='large' edge="start" color="inherit" aria-label='user'>
                                    ورود/عضویت<PersonIcon sx={{ mr: "5px" }} />
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <CacheProvider value={cacheRtl} >
                <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                    <Box textAlign="center" mb={4} width={{ xs: "200px", sm: "250px", md: "300px" }} ><Typography fontWeight={700} variant='h5'>منو کاربری</Typography></Box>
                    <Link to="/" style={{ color: "inherit" }}>
                        <Button size="large" edge="start" color="inherit" aria-label='home'><HomeRoundedIcon /><Typography variant='h6' mr={1}>خانه</Typography></Button>
                    </Link>
                    <Divider variant='middle' />
                    <Box component="div">
                        <Button
                            color='inherit'
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}><AutoAwesomeMotionRoundedIcon sx={{ ml: "5px" }} fontSize='small' /><Typography variant='h6' mr={1}>دسته بندی</Typography></Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}>
                            <Link to='/anime' style={{ textDecoration: "none", color: "black" }}><MenuItem onClick={handleClose}><TvIcon sx={{ ml: "5px" }} fontSize='small' />انیمه</MenuItem></Link>
                            <Divider variant='middle' />
                            <Link to="/series" style={{ textDecoration: "none", color: "black" }}><MenuItem onClick={handleClose}><CloudIcon sx={{ ml: "5px" }} fontSize="small" />سریال</MenuItem></Link>
                            <Divider variant='middle' />
                            <Link to='/movie' style={{ textDecoration: "none", color: "black" }}><MenuItem onClick={handleClose}><LocalMoviesIcon fontSize='small' sx={{ ml: "5px" }} />فیلم</MenuItem></Link>
                        </Menu>
                    </Box>
                    <Divider variant='middle' />
                    <Box>
                        <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                            <Button size='large' edge="start" color="inherit" aria-label='user'>
                                <PersonIcon /><Typography variant='h6' mr={1}>ورود/عضویت</Typography>
                            </Button>
                        </Link>
                    </Box>
                    <Divider variant='middle' />
                    <Box display={{ xs: "flex", sm: "none" }} mt={2} ml={1}>
                        <form onSubmit={searchHandler}>
                            <TextField type='text' value={search} onChange={(e) => setSearch(e.target.value)} sx={{ width: "80%" }} variant='outlined' label="جستجو کنید" />
                        </form>
                    </Box>
                </Drawer>
            </CacheProvider>
        </>
    );
};

export default Navbar;