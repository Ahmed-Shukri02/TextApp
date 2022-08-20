const express = require("express")
const {Pool} = require("pg")
const jwt = require("jsonwebtoken")
const {getSqlClause, checkAuthentication, checkAdminStatus, checkPostExistence, pool, upload} = require("../../Tools/Functions")
const {uploadToCloud, readFromCloud} = require(`../../s3`)

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

router.post("/:id/uploads", checkAuthentication(), checkPostExistence, upload.single("image"), async (req, res) => {
  try{
    if(!["image", "video"].includes(req.query.type)){
      res.status(400).end("invalid query")
      return
    }
    
    // check if post exists
    let post = await req.postExistencePromise("post", req.params.id)
    if(!post){
      res.status(404).end("post not found/invalid query")
    }

    // upload to cloud
    let bucket_obj = await uploadToCloud(req.file)
    console.log(bucket_obj)

    let queryRes = await pool.query(`INSERT INTO post_media(foreign_post_id, media, media_type)\
    VALUES('${req.params.id}', '${req.file.filename}', '${req.query.type}') RETURNING *`)
    
    res.json(queryRes.rows[0]).end()
  }
  catch(err){
    console.log(`ERROR IN POST /${req.params.id}/uploads : ${err.message}`)
    res.status(500).end("something went wrong")
  }
})

router.get("/:id/uploads", checkPostExistence, async (req, res) => {
  try{
    // check if post exists
    let post = await req.postExistencePromise("post", req.params.id)
    if(!post){
      res.status(404).end("post not found/invalid query")
    }

    // get any media
    let media = await pool.query(`SELECT * FROM post_media WHERE foreign_post_id = '${req.params.id}'`);
    res.json(media.rows)
  }
  catch(err){
    console.log(`ERROR IN GET /${req.params.id}/uploads : ${err.message}`)
    res.status(500).end("something went wrong")
  }
}) 

module.exports = router