import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import Spinner from "./Spinner"
import { Navigate, useLocation } from "react-router-dom"
import api from "@/api"

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)
    const location = useLocation()

useEffect(function(){
        authorize().catch(() => setIsAuthorized(false))
    }, [])


    const refresh = localStorage.getItem("refresh")

    async function refresh_token() {
        try {
         const response = await api.post("token_refresh/", refresh )
         
         if(response.status === 200){
            localStorage.setItem("access", response.data.access)
            setIsAuthorized(true)
         }
         else {
            setIsAuthorized(false)
         }

        } catch (err) {
            setIsAuthorized(false)
            console.log(err)
        }
        
    }

    async function authorize() {
        
        const token = localStorage.getItem("access")
        if(!token){
            setIsAuthorized(false)
            return
        } 
        const decodedtoken = jwtDecode(token)
        const tokenExpiryDate = decodedtoken.exp
        const currentTime = Date.now() /1000

        if (currentTime > tokenExpiryDate){
            await refresh_token()
        }

        else {
            setIsAuthorized(true)
        }

    }

    if (isAuthorized === null){
    return <Spinner/>
}
    return (
    <>
    {isAuthorized ? children :  <Navigate to="/signin" state={{from:location}} replace /> }
    </>
    )
}

export default ProtectedRoute
