import React, { useContext } from 'react'
import { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
} from "@heroui/react";
import { NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/AuthContext';

export default function MainNavbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    // const [isLoggedIn, setisLoggedIn] = useState(authContext)
    const {isLoggedIn, setIsLoggedIn}=useContext(authContext)
    const navigate=useNavigate();

    const menuItems = [
    "Home",
    "Categories",
    "Brands",
    "Cart"
    ];
    function logOut(){
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
    <>
    {/* shouldHideOnScroll */}
<Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} isBordered className='' >
    <NavbarContent>
        <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-2xl text-inherit"><i class="fa-solid fa-cart-shopping mx-1 text-blue-950"></i>Fresh Cart</p>
        </NavbarBrand>
    </NavbarContent>


    {isLoggedIn && <NavbarContent className="hidden sm:flex gap-4" justify="center">
    {menuItems.map((item, index) => (
        <NavbarItem key={index}>
        <NavLink className={" hover:text-blue-950 font-bold text-['20px']"} color="foreground" to={item=="Home"? "/": "/"+item.toLowerCase()}>
            {item}
        </NavLink >
        </NavbarItem> 
    
    ))}

</NavbarContent>
}


    <NavbarContent justify="end">
        {
            isLoggedIn?
            <NavbarItem>
            <Button onPress={logOut} color="danger" href="#" variant="flat">
                Sign Out
            </Button>
            </NavbarItem>
            :
            <>
        <NavbarItem className="flex">
            <NavLink className={"hover:text-blue-950 text-['20px']"}  to={"/login"}>Login</NavLink >
            </NavbarItem>
            <NavbarItem>
            <Button color="primary" href="#" variant="flat">
                <NavLink to={"/register"}>Sign Up</NavLink>
            </Button>
        </NavbarItem>
        </>
        }


        
{/* /////////////////////////////// */}
       

    </NavbarContent>

    <NavbarMenu>
        {menuItems.map((item, index) => (
        <NavbarMenuItem onClick={()=>{setIsMenuOpen(false)}} key={`${item}-${index}`}>
            <NavLink 
            className="w-full"
            color={
                "foreground"
            }
            to={item=="Home"? "/": "/"+item.toLowerCase()}
            size="lg"
            >
            {item}
            </NavLink >
        </NavbarMenuItem>
        ))}
    </NavbarMenu>
    </Navbar>
    
    </>

    )
}
