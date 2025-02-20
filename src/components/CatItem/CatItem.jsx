// import React from 'react'
import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../contexts/authContext'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { div } from 'framer-motion/client'
import Cart from '../Cart/Cart'

export default function CatItem() {

    const {userId}=useContext(authContext)
    const [orders, setOrders] = useState([])
    console.log(userId);
    useEffect(()=>{
        if(userId)
            getCartItem()
    },[userId])

    function getCartItem() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories/6407ebf65bbc6e43516931ec");
    }

    const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCartItem,
    // select: res => res.data.data,
    // gcTime: 5000,
    // staleTime: 3000,
    // refetchInterval: 3000,
    });
    console.log(data);
    
    return (
        <>
        <div>
            {/* {
                data?.map((cat)=>{
                    return<div>{cat.name}</div>
                })
            } */}

            hello

        </div>
        </>
    )
}
