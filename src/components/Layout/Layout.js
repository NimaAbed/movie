import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {

    const { pathname } = useLocation()

    // useEffect(() => {

    // }, [pathname])

    if (pathname !== "/login" && pathname !== "/signin") return children



};

export default Layout;