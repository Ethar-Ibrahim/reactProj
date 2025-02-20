import axios from "axios";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
export default async function addProductToCart(productId,setIsLoading){
setIsLoading(true)
    const {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
    productId
    },{
    headers:{
        token:localStorage.getItem("token")
    }
    })
    console.log(data);
    setIsLoading(false)
    // the token problem
    if(data.status=="success"){
    toast.success(data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
    
}