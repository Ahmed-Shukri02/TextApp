import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function OauthLoginRedirect(){
  const [searchParams, setSearchParams] = useSearchParams()
  
  useEffect(() => {
    let code = searchParams.get("code")
    console.log(code)

    async function getAccessToken(){
      
      // preflight check
      let corsRes = await fetch(`https://www.linkedin.com/oauth/v2/accessToken`, {
        method: "OPTIONS",
        headers: {
          "Access-Control-Request-Method": "POST",
          "Access-Control-Request-Headers": "origin, x-requested-with",
          "Origin": "https://localhost:3000"
        }
      })
      console.log(corsRes)

      let accessRes = await fetch(`https://www.linkedin.com/oauth/v2/accessToken`, {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${window.location.origin}/oauth-login&client_id=78sp3v4gmbpcwe&client_secret=0FxmMFjuolBSrlqB`
      })

      let accessToken = await accessRes.json()
      console.log(accessToken)
    }

    getAccessToken()

  }, [])

  return (
    <div>
      successfully logged in, redirecting....
    </div>
  )
}