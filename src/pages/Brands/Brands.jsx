// import React from 'react'

// export default function Brands() {
//   return (
//     <div>Brands</div>
//   )
// }
// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import { div } from 'framer-motion/client'
// import React from 'react'
// import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'

// export default function Brands() {
//     function getCategories() {
//         return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
        
//     }
//     const {data,isLoading,isFetching,isError,error,refetch}=useQuery({
//         queryKey:["brands"],
//         queryFn:getCategories,
//         select:res=>res.data.data,
//         gcTime:5000,
//         staleTime:3000,
//         refetchInterval:3000,
//         // refetchIntervalInBackground:false
//         // refetchOnMount:false
//         // refetchOnReconnect:true,
//         // refetchOnWindowFocus:true
//         // retry:true,
//         // retryDelay:5000
//         // retryOnMount:true
//     })
//     // console.log(error);
    
//     // console.log(data?.data.data);
//     console.log(data);
//     if(isLoading){
//         return <LoadingScreen/>
//     }
//     const [showModal, setShowModal] = useState(false);    
// return (
//     <>
//     {/* <div>
//     <h1>Categories</h1>
//     <h1>isLoading:{isLoading + ""}</h1>
//     <h1>isFetching:{isFetching + ""}</h1>
//     <div className="grid grid-cols-5 gap-3">
//         {
//             data?.map((category,index)=>{
//                 return <div key={index}>
//                     <img src={category.image} className="min-h-30" alt=''/>
//                     <h3>{category.name}</h3>
//                 </div>
//             })
//         }
//     </div>
//     </div> */}

    







//     {/*//////////////////////////////////////////////////// */}







    
//     </>

// )
// }
































import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

export default function Brands() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getCategories,
    select: res => res.data.data,
    // gcTime: 5000,
    // staleTime: 3000,
    // refetchInterval: 3000,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setShowModal(true);
  };

  return (
    <>
    <h1 className=' p-4 m-auto transition duration-700 rounded-md hover:rounded-md w-fit text-4xl text-center my-6 font-bold text-blue-950 hover:text-white hover:bg-blue-950'>All Brands</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data?.map((brand, index) => (
        //   <div key={index} onClick={() => handleBrandClick(brand)}>
        <div className='className="transition-shadow duration-300 hover:shadow-2xl hover:shadow-gray-500 relative my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md' key={index} onClick={() => handleBrandClick(brand)}>

            {/* <img src={brand.image} className="min-h-30" alt='' /> */}
            <div className='relative mx-3 mt-3 flex overflow-hidden h-60 rounded-xl'>
            <img src={brand.image} className="object-cover w-full h-full" alt='' />
            </div>
            {/* <h3 className='text-center text-2xl font-bold'>{brand.name}</h3> */}

            {/* <h3 className='text-center text-2xl font-bold'>{brand.name}</h3> */}
            <div className="mt-4 px-5 pb-5 grow flex flex-col justify-between">
                        
            <p className='py-2 rounded-md hover:rounded-md text-2xl font-bold text-center text-blue-950 bg-white hover:text-white hover:bg-blue-950 transition duration-700'>{brand.name}</p>

            </div>

          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-gray-100 p-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedBrand.name}</h3>
              <button
                className="absolute top-0 right-0 mt-3 mr-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500 flex items-center justify-between px-4">
                {/* This is a simple modal dialog example created with Tailwind CSS. */}
                <h2 className='text-2xl font-bold text-blue-950'>{selectedBrand.name}</h2>
                <img src={selectedBrand.image} alt='brand_image'/>
              </p>
            </div>
            <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 hover:bg-blue-950 transition duration-500  text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

