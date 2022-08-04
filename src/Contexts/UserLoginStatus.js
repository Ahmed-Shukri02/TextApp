import React from "react";
import { createContext } from "react";

async function getLoggedInStatus(){
  try{
    let userStatus = await fetch(`http://localhost:5000/api/users/login`, {
      method: "GET",
      headers: {"Authorization" : `Bearer ${localStorage.getItem("userToken")}`}
    })

    if([403, 500].includes(userStatus.status)){
      return false
    }
    else{
      return true
    }

  }
  catch(err){
    console.log(err)
  }
}

export const isLoggedIn = createContext({getLoggedInStatus})