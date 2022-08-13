import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function OauthLoginRedirect(){
  const [searchParams, setSearchParams] = useSearchParams()
  
  useEffect(() => {
    let token = searchParams.get("token")
    if(!token) {window.location= "/login"}

    localStorage.setItem("userToken", token)
    
    window.location = "/feed"

  }, [])

  return (
    <div>
      successfully logged in, redirecting....
    </div>
  )
}