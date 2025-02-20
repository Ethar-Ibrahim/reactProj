import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CartProduct from '../../components/CartProduct/CartProduct'
import { formatCurrency } from '../../helpers/currencyHelpre'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { Button } from '@heroui/react';
import { Link } from 'react-router-dom';
export default function Cart() {
    const [isLoading,setIsLoading]=useState(true);
    const [cartId, setCartId] = useState(null)
    const [NumOfCartItems, setNumOfCartItems] = useState(0)
    const [CartData, setCartData] = useState(null)
    const [clearCartLoading, setClearCartLoading] = useState(false)
    useEffect(()=>{
        getUserCart()
    },[])
    async function getUserCart(){
        setIsLoading(true)
        const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        setIsLoading(false)
        // console.log(data);
        console.log(data.data);
        
        setCartId(data.cartId)
        console.log(data.cartId);
        
        setNumOfCartItems(data.numOfCartItems)
        setCartData(data.data)
    }
    async function removeSpecificItem(productId,setIsLoading) {
        setIsLoading(true)
        const {data}=await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{
            headers:{
                token:localStorage.getItem("token")
            }
        });
        setIsLoading(false)
        console.log(data);

        setCartData(data.data)
        setCartId(data.cartId)
        setNumOfCartItems(data.numOfCartItems)
        
    }
    async function clearCart() {
        setClearCartLoading(true)
        const {data}=await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        setClearCartLoading(false)
        console.log(data);
        setCartData(null)
        setCartId(null)
        setNumOfCartItems(0)
        
        }
    async function updateProductCount(productId,count,setIncrementIsLoading,setDecrementIsLoading,currentCount) {
        if(count>currentCount){
            setIncrementIsLoading(true)
        }else if(count<currentCount){
            setDecrementIsLoading(true)

        }
        const {data}=await axios.put("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{
            count
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        setIncrementIsLoading(false)
        setDecrementIsLoading(false)
        console.log(data);
        setCartData(data.data)
        setCartId(data.cartId)
        console.log(data.cartId);
        // console.log(CartId);
        
        setNumOfCartItems(data.numOfCartItems)
    }

    if(isLoading){
        return <LoadingScreen/>
    }
    if(NumOfCartItems==0){
        return <h1 className='text-3xl text-center font-bold py-10 capitalize'>No product in your cart</h1>
    }
    return (
        <>
            {/* <div className="pt-20"> */}
            <div className="my-4 flex flex-col pt-4">
            <h1 className="mb-10 text-blue-950 text-center text-2xl font-bold">Cart Items: {NumOfCartItems}</h1>
                {/* <Button isLoading={clearCartLoading} variant='bordered' color='danger' onPress={clearCart}>Clear</Button> */}
                <Button className='w-1/3 m-auto text-red-600 border-red-600 hover:bg-red-600 hover:text-white' isLoading={clearCartLoading} variant='bordered' color='danger' onPress={clearCart}>
                    <p className='text-2xl font-bold'>Clear</p>
                    </Button>
            </div>
    <div className="justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
        {
            CartData?.products.map((product,index)=>{
                return <CartProduct key={index} product={product} removeSpecificItem={removeSpecificItem} updateProductCount={updateProductCount}/>
            })
        } 
        
        {/* <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80" alt="product-image" className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
                <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
            </div>
            <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center border-gray-100">
                <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
                <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                </div>
                <div className="flex items-center space-x-4">
                <p className="text-sm">259.000 ₭</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </div>
            </div>
            </div>
        </div> */}
        </div>
        {/* <!-- Sub total --> */}
        <div className="sticky top-20 mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${formatCurrency(CartData?.totalCartPrice)}</p>
        </div>
        <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
            <p className="mb-1 text-lg font-bold">${formatCurrency(CartData?.totalCartPrice + 4.99)} USD</p>
            <p className="text-sm text-gray-700">including VAT</p>
            </div>
        </div>
        {/* <button onClick={checkout} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
        </div> */}
        <Link to={"/address/"+cartId} className="mt-6 w-full block text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
        </div>
    </div>
    
    {/* </div> */}
        </>
    )
}
