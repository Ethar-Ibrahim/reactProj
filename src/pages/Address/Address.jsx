import React, { useState } from 'react'
import {Input,Button} from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { details } from 'framer-motion/client';
export default function Address() {
    const [isLoading, setisLoading] = useState(false)
    const {cartId}=useParams()
    // const [errMsg, seterrMsg] = useState("");
    // const navigate=useNavigate();
    const formik=useFormik({
        initialValues:{
            details:"6 Tahreer str.",
            city:"Dokki",
            phone:"01097553360"
        }
    })
    async function checkout() {
        setisLoading(true)
        const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+cartId,{
            shippingAddress:values
        },{
            headers:{
                token:localStorage.getItem("token")
            },
            params: {
                url:"http://localhost:5173"
            }
        })
        setisLoading(false)
        location.href=data.session.url;
        
    }
    // async function onSubmit(values){
    //     setisLoadin(true);
    //     const {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values);
    //     console.log(data);
    //     setisLoadin(false);

    // function onSubmit(values){
    //     setisLoadin(true);
    //     seterrMsg("");
    //     axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).then(({data})=>{
    //     if(data.message=="success"){
    //         navigate("/login");
    //     }
    //     }).catch((err)=>{
    //         seterrMsg(err.response.data.message);
    //     }).finally(()=>{
    //         setisLoadin(false);
    //     })        
    // }
        
    // }
    // function validate(values){
    //     const error={};
    //     if(values.name==""){
    //         error.name="Name is required";
    //     }else if(values.name.length<3){
    //         error.name="Name must be at least 3 characters";
    //     }else if(values.name.length>20){
    //         error.name="Name must be at most 20 characters"
    //     }
    //     if(values.email==""){
    //         error.email="email is required";
    //     }else if(!/^[A-z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
    //         error.email="Invalid email address";
    //     }
    //     if(values.password==""){
    //         error.password="password is required";
    //     }else if(values.password.length<8){
    //         error.email="password must be at least 8 characters";
    //     }
    //     if(values.rePassword==""){
    //         error.rePassword="rePassword is required";
    //     }else if(values.rePassword!=values.password){
    //         error.rePassord="rePassword and password must be the same";
    //     }
    //     if(values.phone==""){
    //         error.phone="phone is required";
    //     }else if(!/^01[0125][0-9]{8}$/.test(values.phone)){
    //         error.phone="Invalid phone number"
    //     }
    //     return error;
    // }

    const validationSchema=Yup.object({
        details:Yup.string().required("Name is required"),
        city:Yup.string().required("City is required"),
        phone:Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/,"Invalid phone number")
    })
    const {values,handleChange,handleSubmit,errors,touched,handleBlur}=useFormik({
        initialValues:{
            name: "",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        },
        onSubmit:checkout,
        // validate
        validationSchema
    })
    console.log(errors);
    
    
    
    return (
        <>
        <div className='sm:w-2/3 mx-auto pt-5'>
            <h1 className='text-3xl font-bold'>Enter Your Address</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="py-5 grid md:grid-cols-2 gap-4">
            <Input isInvalid={touched.details && errors.details} errorMessage={errors.details} onBlur={handleBlur} name='details' value={values.details} onChange={handleChange} className='md:col-span-2' label="Details" type="text" variant='bordered'/>
            <Input isInvalid={touched.city && errors.city} errorMessage={errors.city} onBlur={handleBlur} name='city' value={values.city} onChange={handleChange} className='md:col-span-2' label="City" type="text" variant='bordered'/> 
            <Input isInvalid={touched.phone && errors.phone} errorMessage={errors.phone} name='phone' value={values.phone} onBlur={handleBlur} onChange={handleChange} className='md:col-span-2' label="Phone" type="tel" variant='bordered'/>
            <Button disabled={isLoading} type='submit' isLoading={isLoading} color="primary" className='col-span-2'>
                Place Order
            </Button>
            {/* {errMsg && <p className='text-red-500 text-sm'>{errMsg}</p>} */}
            </div>
            </form>
        </div>
        </>
    )
}
