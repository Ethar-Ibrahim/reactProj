import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../contexts/authContext'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { div } from 'framer-motion/client'
import Cart from '../Cart/Cart'
export default function Orders() {
  const {userId}=useContext(authContext)
  const [orders, setOrders] = useState([])
  console.log(userId);
  useEffect(()=>{
    if(userId)
    getUserOrders()
  },[userId])
  // async function getUserOrders() {
  //   // const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/679b78d50cb63db39af94e26")
  //   const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/"+userId)

  //   console.log(data);
  //   // console.log(userId);
  // }


  function getUserOrders() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/"+userId);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getUserOrders,
    // select: res => res.data.data,
    // gcTime: 5000,
    // staleTime: 3000,
    // refetchInterval: 3000,
  });
  console.log(data);
  
  return (
    <>
    <div>
    {/* {<Cart/>} */}

    {/* {
      data?.data.map((order,index)=>{
        return <div><img src={order.cartItems.imageCover}></img>
        {
        console.log(order.cartItems.imageCover
        )
        }
        </div>

      })
    } */}

    </div>
    </>
  )
}
