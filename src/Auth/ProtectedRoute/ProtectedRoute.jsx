import React from 'react'
import Login from '../../pages/Login/Login';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    console.log(children);
    
    return (
        <>
        {localStorage.getItem("token")!=null?children:<Navigate to={"/login"}></Navigate>}
        </>
    )
}
