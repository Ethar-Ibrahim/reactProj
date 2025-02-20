// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './components/Layouts/MainLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Notfound from './pages/Notfound/Notfound'
import AuthContextProvider from './contexts/AuthContext'
import axios from 'axios'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Cart from './pages/Cart/Cart'
import ProtectedRoute from './Auth/ProtectedRoute/ProtectedRoute'
import { HeroUIProvider } from '@heroui/react'
import CounterContextProvider from './contexts/CounterContext/CounterContext'
import Address from './pages/Address/Address'
import Orders from './pages/Orders/Orders'
import {QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Categories from './pages/Categories/Categories'
import Brands from './pages/Brands/Brands'

function App() {
  const queryClient=new QueryClient()
  // const router=createBrowserRouter
  const router=createHashRouter([
    {path:'',element:<MainLayout/>,children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute> },
      {path:'/login',element:<Login/>},
      {path:'/register',element:<Register/>},
      {path:'/cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'/categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'/brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'/allorders',element:<ProtectedRoute><Orders/></ProtectedRoute>},
      {path:'/address/:cartId',element:<ProtectedRoute><Address/></ProtectedRoute>},
      {path:'/productDetails/:id',element:<ProductDetails/>},
      {path:'*',element:<Notfound/>},
    ]}
  ])
//   useEffect(()=>{
//     getR()
//   },[])

// async function getR() {
//   const {data}=await axios("https://www.themealdb.com/api.php")
//   console.log("hi");
  
//   console.log(data.data);
  
// }

  return (
    <>
    <div className="container">
    {/* <RouterProvider router={router}></RouterProvider> */}
    {/* <CounterContextProvider> */}
    {/* <QueryClientProvider> */}
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
    <CounterContextProvider> 
    <HeroUIProvider>
    <RouterProvider router={router}></RouterProvider>
    </HeroUIProvider>
    </CounterContextProvider>
    </AuthContextProvider>
    <ToastContainer/>
    <ReactQueryDevtools/>
    </QueryClientProvider>
    </div>
    </>
  )
}

export default App
