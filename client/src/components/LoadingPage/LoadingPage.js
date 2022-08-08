import React, { useEffect } from "react";
import "./loadingPage.css";
import ClimbingBoxLadder from "react-spinners/ClimbingBoxLoader"
import { motion } from "framer-motion/dist/framer-motion";


export default function LoadingScreen(){

  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => document.body.style.overflow = "scroll"
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