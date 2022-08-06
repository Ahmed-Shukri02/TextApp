import React from "react";
import { createContext } from "react";

async function getLoggedInStatus(){
  // check if user has a token of "usertoken"
  if(!localStorage.getItem("userToken")){
    return false;
  }
  
  try{
    let userStatus = await fetch(` /api/users/login`, {
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

async function getUserID(){
  if(!localStorage.getItem("userToken")){
    return null;
  }

  try{
    let user_id = await fetch(` /api/users/my_id`, {
      method: "GET",
      headers: {"Authorization" : `Bearer ${localStorage.getItem("userToken")}`}
    })
    let user_id_json = await user_id.json()
    console.log(user_id_json)

    return user_id_json ? user_id_json : null
  }
  catch(err){
    console.log(err)
    return null
  }
}

export const LoggedInContext = createContext({getLoggedInStatus, getUserID})