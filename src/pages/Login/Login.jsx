import React, { useState } from 'react'
import {Input,Button} from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../../contexts/AuthContext';
export default function Login() {
    const [isLoading, setisLoadin] = useState(false)
    const [errMsg, seterrMsg] = useState("");
    const {setIsLoggedIn}=useContext(authContext)
    const navigate=useNavigate();

    function onSubmit(values){
        setisLoadin(true);
        seterrMsg("");
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).then(({data})=>{
            console.log(data.token);
            
        if(data.message=="success"){
            setIsLoggedIn(true);
            // localStorage.setItem("token",data.token);
            localStorage.setItem("token",data.token)
            navigate("/");
        }
        }).catch((err)=>{
            seterrMsg(err.response.data.message);
        }).finally(()=>{
            setisLoadin(false);
        })        
    }
        

    const validationSchema=Yup.object({
        email:Yup.string().required("email is required").email("Invalid email"),
        password:Yup.string().required("password is required").min(8,"password must be at least 8 characters"),
    })
    const {values,handleChange,handleSubmit,errors,touched,handleBlur}=useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        onSubmit,
        validationSchema
    })
    console.log(errors);
    
    
    
    return (
        <>
        <div className='sm:w-2/3 mx-auto pt-5'>
            <h1 className='text-3xl font-bold text-blue-950'>Login Now</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="py-5 grid md:grid-cols-2 gap-4">
            <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} name='email' value={values.email} onBlur={handleBlur} onChange={handleChange} className='md:col-span-2' label="Email" type="email" variant='bordered'/>
            <Input isInvalid={touched.password && errors.password} errorMessage={errors.password} name='password' value={values.password} onBlur={handleBlur} onChange={handleChange} className='md:col-span-2' label="Password" type="password" variant='bordered'/>
            <Button disabled={isLoading} type='submit' isLoading={isLoading} color="primary" className='col-span-2'>
                Login
            </Button>
            {errMsg && <p className='text-red-500 text-sm'>{errMsg}</p>}
            </div>
            </form>
        </div>
        </>
    )
}
