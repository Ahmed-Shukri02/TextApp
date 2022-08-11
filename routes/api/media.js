const express = require("express")
const {Pool} = require("pg")
const jwt = require("jsonwebtoken")
const {getSqlClause, checkAuthentication, checkAdminStatus, pool} = require("../../Tools/Functions")
const multer = require("multer")
const {uploadToCloud, readFromCloud} = require(`../../s3`)


const upload = multer({dest: "uploads/posts/"})


const router = express.Router()

router.get("/:filename", async (req, res) => {
  try{
    const stream = readFromCloud(req.params.filename)
    stream.pipe(res)
  }
  catch(err){
    console.log(`ERROR IN GET /${req.params.filename}: ${err.message}`)
    res.status(500).end("something went wrong")
  }
})

module.exports = router