import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { div } from 'framer-motion/client'
import React from 'react'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import { Link } from '@heroui/react'
import { Button } from '@heroui/react'
import { useState } from 'react'

export default function Categories() {

    
    function getCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        
    }
    const {data,isLoading,isFetching,isError,error,refetch}=useQuery({
        queryKey:["categories"],
        queryFn:getCategories,
        select:res=>res.data.data,
        gcTime:5000,
        staleTime:3000,
        refetchInterval:3000,
        // refetchIntervalInBackground:false
        // refetchOnMount:false
        // refetchOnReconnect:true,
        // refetchOnWindowFocus:true
        // retry:true,
        // retryDelay:5000
        // retryOnMount:true
    })
    // console.log(error);
    
    // console.log(data?.data.data);
    console.log(data);
    if(isLoading){
        return <LoadingScreen/>
    }
    
return (
    <>

    {/* <div>
    <h1>Categories</h1>
    <h1>isLoading:{isLoading + ""}</h1>
    <h1>isFetching:{isFetching + ""}</h1>
    <div className="grid grid-cols-5 gap-3">
        {
            data?.map((category,index)=>{
                return <div key={index}>
                    <img src={category.image} className="min-h-30" alt=''/>
                    <h3>{category.name}</h3>
                </div>
            })
        }
    </div>
    </div> */}

<div>
            <h1 className=' p-4 m-auto transition duration-700 rounded-md hover:rounded-md w-fit text-3xl text-center my-8 font-bold text-blue-950 hover:text-white hover:bg-blue-950'>Categories</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 ">
            {
                data.map((category,index)=>{
                    return <div className="transition-shadow duration-300 hover:shadow-2xl hover:shadow-gray-500 relative my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    
                    <Link class="relative mx-3 mt-3 flex overflow-hidden h-60 rounded-xl" to={"/categoryDetails/" + category._id}>
                        <img className="object-cover w-full h-full" src={category.image} alt={category.title} />
{/* <Link class="relative mx-3 mt-3 flex overflow-hidden h-60 rounded-xl" to={"/CatItem/" + category._id}>
<img className="object-cover w-full h-full" src={category.image} alt={category.title} /> */}

{/*                         
                        {category.priceAfterDiscount && <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{100- Math.round(category.priceAfterDiscount * 100 /category.price)}% OFF</span>
                        
                } */}
                    </Link>
                    <div className="mt-4 px-5 pb-5 grow flex flex-col justify-between">
                        
                        <p className='py-2 rounded-md hover:rounded-md text-2xl font-bold text-center text-blue-950 bg-white hover:text-white hover:bg-blue-950 transition duration-700'>{category.name}</p>

                    </div>
                    </div>
                
                    
                })
            }
            </div>

        </div>

    </>

)
}
