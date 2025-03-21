import { div } from 'framer-motion/client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import {Bounce,toast } from 'react-toastify';
import { formatCurrency } from '../../helpers/currencyHelpre';
import { counterContext } from '../../contexts/CounterContext/CounterContext';
import { useContext } from 'react';
import addProductToCart from '../../Services/CartServices';
export default function Home({product}) {
  const [isLoading, setisLoading] = useState(false)
  // first com
  // async function addProductToCart(productId,setIsLoading){
  //   // sec
  //   setisLoading(true)
  //   // sec
  //     const {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
  //       productId
  //     },{
  //       headers:{
  //         token:localStorage.getItem("token")
  //       }
  //     })
  //     console.log(data);
  //     setIsLoading(false)
  //     // the token problem
  //     if(data.status=="success"){
  //       toast.success(data.message, {
  //         position: "bottom-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //         });
  //     }
      
  // }
  
  
  const {counter, setcounter}=useContext(counterContext)

    const [products, setProducts] = useState([])
    const [IsLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        getAllProducts()
    },[])
    async function getAllProducts() {
      setIsLoading(true)
        const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        setProducts(data.data)
        // console.log("hi");
        setIsLoading(false)
        
    }
    if(IsLoading){
      return <LoadingScreen/>
    }
    return (
        <>
        {/* <h1>counter:{counter}</h1> */}
        <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 ">
            {
                products.map((product,index)=>{
                    return <div className="transition-shadow duration-300 hover:shadow-2xl hover:shadow-gray-500 relative my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    
                    <Link class="relative mx-3 mt-3 flex overflow-hidden h-60 rounded-xl" to={"/productDetails/" + product._id}>
                      <img className="object-cover w-full" src={product.imageCover} alt={product.title} />
                      {product.priceAfterDiscount && <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{100- Math.round(product.priceAfterDiscount * 100 /product.price)}% OFF</span>
                }
                    </Link>
                    <div className="mt-4 px-5 pb-5 grow flex flex-col justify-between">
                 <div className="">
                 <Link to={"/productDetails/" + product._id}>
                        <h5 className="text-xl tracking-tight text-slate-900 line-clamp-2">{product.title}</h5>
                      </Link>
                      <div className="mt-2 mb-5">
                        <p>
                          {
                            product.priceAfterDiscount?
                            <>
                            <span className="text-3xl font-bold text-slate-900">${formatCurrency(product.priceAfterDiscount)}</span>
                            <span className="text-sm text-slate-900 line-through">${formatCurrency(product.price)}</span>
                            </>
                            :
                            <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                          }
                          
                        </p>
                        <div className="flex items-center">
                          {
                            [1,2,3,4,5].map((rate)=>{
                            return product.ratingsAverage>= rate?
                            <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          :
                          <svg aria-hidden="true" className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                            })
                          }
                          
                    
                          <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product.ratingsAverage}</span>
                        </div>
                 </div>
                      </div>
                      {/* third */}
                      {/* <Button isLoading={isLoading} onPress={()=>addProductToCart(product._id)}className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart</Button> */}
                        {/* third */}
                        <Button onPress={()=>addProductToCart(product._id,setisLoading)}className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart</Button>

                        
 
                    </div>
                  </div>
               
                  
                })
            }
            </div>
        </div>

            
        
        
        </>
    )
}
