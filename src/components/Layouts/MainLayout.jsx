import React from 'react'
import MainNavbar from '../Navbar/MainNavbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <>
        <MainNavbar/>
        <Outlet/>
        <Footer/>
        </>
    )
}
