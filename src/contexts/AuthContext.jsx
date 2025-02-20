import { createContext,useEffect,useState } from "react";
import axios from "axios";
import { data } from "autoprefixer";
// import { useNavigate } from "react-router-dom";
export const authContext=createContext()
export default function AuthContextProvider({children}){
    // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token")!=null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");
    // const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("token")!=null){
        verifyUserToken()
        }

    },[])
    function verifyUserToken(){
        axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken",{
            headers:{
                token:localStorage.getItem("token")
            }
        }).then((res)=>{
            console.log(res);
            setIsLoggedIn(true)
            
        }).catch((err)=>{
            localStorage.removeItem("token")
            setIsLoggedIn(false)
            // navigate("/login")
            
        }).then(({data})=>{
            setUserId(data.decoded.id)
            // console.log(data);
            
        })
        // console.log(userId);
        
    }

    return <authContext.Provider value={{isLoggedIn,setIsLoggedIn,userId}}>

        {children}
    </authContext.Provider>

}
