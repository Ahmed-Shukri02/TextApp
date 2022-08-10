import React, { useEffect } from "react";
import "./loadingPage.css";
import ClimbingBoxLadder from "react-spinners/ClimbingBoxLoader"
import { motion } from "framer-motion/dist/framer-motion";


export default function LoadingScreen({disableScroll = true, elem = document.body}){

  useEffect(() => {
    if(disableScroll) elem.style.overflow = "hidden"

    return () => {if(disableScroll) elem.style.overflow = "scroll"}
  })

  return (
      <motion.div
      initial={{opacity: 1}}
      animate={{opacity: 1}}
      exit={{opacity: 0}} className="loading-container">
        <ClimbingBoxLadder color="#1B74E4"/>
      </motion.div>
  )
}