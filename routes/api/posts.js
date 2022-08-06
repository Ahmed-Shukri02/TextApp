const express = require("express")
const {Pool} = require("pg")
const jwt = require("jsonwebtoken")
const {getSqlClause, checkAuthentication, checkAdminStatus, pool} = require("../../Tools/Functions")
const multer = require("multer")


const upload = multer({dest: "uploads/posts/"})


const router = express.Router()

// get all recent posts for feed
router.get("/all", async (req, res) => {
  try{
    let all_posts_res = await pool.query(`SELECT * FROM user_posts ORDER BY post_time DESC LIMIT 20`)
    res.json(all_posts_res.rows)
  }
  catch(err){
    console.log(`ERROR IN GET /all: ${err.message}`)
    res.status(500)
    res.end("Something went wrong")
  }
})


// GET POSTS BY USER ID
router.get("/", async (req, res) =>{ // -1 if user has no posts, -2 if user does not exist
  try{
    // check if author exists
    let author = await pool.query(`SELECT user_id FROM user_profile WHERE user_id = '${req.query.author_id}'`)
    if(!author.rowCount){
      res.status(400).json(-2)
      return;
    }

    if(!req.query.author_id){
      res.status(400)
      res.end("inavlid request made. please try adding in ?author_id=... at the end of this link")
      return
    }
    
    let posts = await pool.query(`SELECT * FROM user_posts WHERE post_author_id = '${req.query.author_id}' ORDER BY post_time DESC`)

    if(posts.rowCount === 0) { 
      res.json(-1)
      return
    }

    res.json(posts.rows)
    res.end()
  }

  catch(err){
    console.log(`ERROR IN GET /posts?author_id=: ${err.message}`)
    res.status(500)
    res.end("Something went wrong")
  }
})

router.get("/:post_id", async(req, res) => {
  try{
    let post = await pool.query(`SELECT * FROM user_posts WHERE post_id = '${req.params.post_id}'`)
    if(post.rowCount === 0){
      res.status(400)
      res.end("There is no post with this id")
      return
    }
    
    res.json(post.rows)
    res.end()
    return;

  }
  catch(err){
    console.log(`ERROR IN GET /posts/${req.params.post_id}: ${err.message}`)
    res.status(500)
    res.end("Something went wrong")
  }
})

router.put("/:post_id", checkAuthentication(), async (req, res) => {
  try{
    // check if post exists
    let checker = await pool.query(`SELECT post_id FROM user_posts WHERE post_id='${req.params.post_id}'`)
    if(checker.rowCount === 0){
      res.status(400)
      res.end("no post exists with this id. Please try again")
      return;
    }
    
    // check if client wanted to like/unlike
    if(req.query.method === "like"){
      // make sure the person liking is not in the likes list of the same post
      let current_likes = await pool.query(`SELECT liker FROM all_post_likes WHERE liker='${req.user.authorised_user_id}' AND liked_post_id = '${req.params.post_id}'`)
      if(current_likes.rowCount > 0) {
        res.end("this user has already liked the post")
        return;
      }      
      
      // get current likes from post
      let likes = await pool.query(`SELECT post_likes FROM user_posts WHERE post_id ='${req.params.post_id}'`)
      let newLikes = likes.rows[0].post_likes + 1

      // increment post likes by one
      await pool.query(`UPDATE user_posts SET post_likes = '${newLikes}' WHERE post_id = '${req.params.post_id}'`)
      res.json(newLikes);
      res.end()
    }
    else if(req.query.method === "unlike"){
      // make sure the person disliking has already liked the post
      let current_likes = await pool.query(`SELECT liker FROM all_post_likes WHERE liker='${req.user.authorised_user_id}' AND liked_post_id = '${req.params.post_id}'`)
      console.log(current_likes.rows)
      if(current_likes.rowCount == 0) {
        res.end("this user cannot dislike this post as they have not liked it")
        return;
      }      
      
      // get current likes from post
      let likes = await pool.query(`SELECT post_likes FROM user_posts WHERE post_id ='${req.params.post_id}'`)
      let newLikes = likes.rows[0].post_likes - 1
      console.log(newLikes)

      // decrement post likes by one
      await pool.query(`UPDATE user_posts SET post_likes = '${newLikes}' WHERE post_id = '${req.params.post_id}'`)
      res.json(newLikes);
      res.end()
    }
    
    else{
      // CHANGE GENERAL PROPERTIES:
      // MAKE SURE REQ BODY KEYS ARE SAME NAME AS POST COLUMN NAMES
      
      // get json ready for sql clausing: change name of key to column name on database
      body.user_id = body.authorised_user_id
      delete body.authorised_user_id
      let qString = getSqlClause(req.body)
      
      // use qString to make a query changing the values in the request body
      await pool.query("UPDATE user_posts SET " + qString + `WHERE post_id = '${req.params.post_id}'`)
  
      // return updated post
      let updatedPost = await pool.query(`SELECT * FROM user_posts WHERE post_id = '${req.params.post_id}'`)
      res.json(updatedPost.rows)
      res.end()
    }

    

  }
  catch(err){
    res.status(500)
    console.log(`ERROR IN PUT /posts/${req.params.post_id}: ${err.message}`)
    res.end("something went wrong")
  }
  
})


router.post("/:post_id/likes", checkAuthentication(), async (req, res) =>{
  try{
    if(!req.user?.authorised_user_id){
      res.status(400)
      res.end("no client connected to add")
      return;
    }

    await pool.query(`INSERT INTO all_post_likes(liker, liked_post_id) VALUES('${req.user.authorised_user_id}', '${req.params.post_id}')`)
    let likes = await pool.query(`SELECT liker FROM all_post_likes WHERE liked_post_id = '${req.params.post_id}'`)
    let likesArr = likes.rows.map(elem => elem.liker)

    res.json(likesArr)
    res.end()
  }
  catch(err){
    res.status(500)
    console.log(`ERROR IN POST /posts/${req.params.post_id}/likes: ${err.message}`)
    res.end("something went wrong")
  }
})

router.delete("/:post_id/likes", checkAuthentication(), async (req, res) =>{
  try{
    if(!req.user.authorised_user_id){
      res.status(400)
      res.end("no client connected to remove")
      return;
    }
    console.log(req.user.authorised_user_id)
    console.log(req.params.post_id)

    await pool.query(`DELETE FROM all_post_likes WHERE liker = '${req.user.authorised_user_id}' AND liked_post_id = '${req.params.post_id}'`)
    let likes = await pool.query(`SELECT liker FROM all_post_likes WHERE liked_post_id = '${req.params.post_id}'`)
    let likesArr = likes.rows.map(elem => elem.liker)

    res.json(likesArr)
    res.end()
  }
  catch(err){
    res.status(500)
    console.log(`ERROR IN POST /posts/${req.params.post_id}/likes: ${err.message}`)
    res.end("something went wrong")
  }
})


router.get("/:post_id/replies", async (req, res) =>{
  try{
    let replies = await pool.query(`SELECT * FROM post_replies WHERE foreign_post_id = '${req.params.post_id}' ORDER BY reply_time DESC`)
    replies = replies.rows;

    
    let finalReplies = []
    for(let i=0; i < replies.length; i++){
      let subReplies = await pool.query(`SELECT * FROM post_subreplies WHERE foreign_reply_id = '${replies[i].reply_id}' ORDER BY subreply_time`)
      subReplies = subReplies.rows ? subReplies.rows : []
      
      let replierInfo = await pool.query(`SELECT username, stock_pfp, user_pfp FROM user_profile WHERE user_id = '${replies[i].reply_author_id}'`)
      replierInfo = replierInfo.rows[0]

      for(let j=0; j < subReplies.length; j ++) {
        let subreplier_info = await pool.query(`SELECT username, stock_pfp, user_pfp FROM user_profile WHERE user_id = '${subReplies[j].subreply_author_id}'`)
        subReplies[j] = {...subReplies[j], ...subreplier_info.rows[0]}
      }
      
      finalReplies.push({
        ...replies[i],
        ...replierInfo,
        
        subreplies : subReplies
      })
    }

    res.json(finalReplies)
    res.end()
  }
  catch(err){
    console.log(`ERROR IN GET /posts/${req.params.post_id}/replies: ${err.message}`)
    res.end("something went wrong")
  }
})

router.get("/:id/likes", checkAuthentication(true), async(req, res) => {
  try{
    
    var qRes
    if(req.query.type === "reply"){
      qRes = await pool.query(`SELECT liker FROM all_reply_likes WHERE liked_reply_id = '${req.params.id}'`)
    }
    else if (req.query.type === "subreply"){
      qRes = await pool.query(`SELECT liker FROM all_subreply_likes WHERE liked_subreply_id = '${req.params.id}'`)
    }
    else{
      qRes = await pool.query(`SELECT liker FROM all_post_likes WHERE liked_post_id = '${req.params.id}'`)
    }

    let final = qRes.rows.map(elem => elem.liker)
    let client_like_status = req.user?.authorised_user_id && final.includes(req.user.authorised_user_id)
    res.json({likes: final, client_like_status})
    res.end();
  }
  catch(err){
    res.status(500)
    console.log(`ERROR IN GET /posts/${req.params.post_id}/likes: ${err.message}`)
    res.end("something went wrong")
  }
})

/* 
==================================================================================================================
  LIKING/POSTING/REPLYING TO REPLIES AND SUB-REPLIES
==================================================================================================================
*/

/* =========================================== LIKING =========================================== */

// viewing reply/subreply likes
router.get("/replies/:id/likes", checkAuthentication(true), async(req, res) => {
  try{
    if(req.query.type === "reply"){
      let reply_likes = await pool.query(`SELECT liker FROM all_reply_likes WHERE liked_reply_id = '${req.params.id}'`)
      let reply_likesArr = reply_likes.rows.map(elem => elem.liker);
      let client_like_status = req.user.authorised_user_id && reply_likesArr.includes(req.user.authorised_user_id)

      res.json({likes: reply_likesArr, client_like_status})
      res.end()
    }
    else if (req.query.type === "subreply"){
      let subreply_likes = await pool.query(`SELECT liker FROM all_subreply_likes WHERE liked_subreply_id = '${req.params.id}'`)
      let subreply_likesArr = subreply_likes.rows.map(elem => elem.liker);
      let client_like_status = req.user.authorised_user_id && reply_likesArr.includes(req.user.authorised_user_id)

      res.json({likes: subreply_likesArr, client_like_status})
      res.end()
    }
    else{
      res.status(400)
      res.end("invalid reply type inputted")
      return
    }
  }
  catch(err){
    res.status(500)
    console.log(`ERROR IN GET /posts/replies/${req.params.id}/likes: ${err.message}`)
    res.end("something went wrong")
  }
})



// liking replies/subreplies
router.put("/replies/:id", checkAuthentication(), async(req, res) => { // QUERY: type (reply, subreply) & method (like, unlike)
  try{
    if(req.query.type === 'reply'){ 
      // check if reply exists
      let current_reply_likes = await pool.query(`SELECT reply_likes FROM post_replies WHERE reply_id = '${req.params.id}' `)
      if(current_reply_likes.rowCount === 0){
        res.status(400)
        res.end("there is no post with this id")
        return;
      }
      current_reply_likes = current_reply_likes.rows[0].reply_likes;

      if(req.query.method === "like"){ // BODY WILL CONTAIN USER WHO IS LIKING
        // check if user in body has already liked the reply
        let reply_likers = await pool.query(`SELECT liker FROM all_reply_likes WHERE liker ='${req.user.authorised_user_id}' AND liked_reply_id = '${req.params.id}'`)
        if(reply_likers.rowCount > 0){
          res.status(400)
          res.end("this user has already liked this reply")
          return;
        }

        // if not, increment the likes of the reply. We will add the user/reply pair to all_reply_likes in a POST request
        let new_reply_likes = current_reply_likes + 1
        await pool.query(`UPDATE post_replies SET reply_likes = ${new_reply_likes} WHERE reply_id = '${req.params.id}'`)
        
        res.json(new_reply_likes);
        res.end()
        return;

      }
      else if (req.query.method === "unlike"){ // BODY WULL CONTAIN USER WHO IS UNLIKING
        // check if user in body has not like the reply yet
        let reply_likers = await pool.query(`SELECT liker FROM all_reply_likes WHERE liker = '${req.user.authorised_user_id}' AND liked_reply_id = '${req.params.id}'`)
        if(reply_likers.rowCount === 0){
          res.status(400)
          res.end("this user has not liked the reply yet to be unliking it")
          return;
        }

        // if they have, decrement the likes of the reply. We will remove the user/reply pair from all_reply_likes in a DELETE request
        let new_reply_likes = current_reply_likes - 1;
        await pool.query(`UPDATE post_replies SET reply_likes = ${new_reply_likes} WHERE reply_id = '${req.params.id}'`)
        res.json(new_reply_likes)
        res.end()
        return;

      }
      else{ // BODY WILL CONTAIN PROPERTIES OF REPLY TO CHANGE
        // CHANGE GENERAL PROPERTIES:
        // MAKE SURE REQ BODY KEYS ARE SAME NAME AS REPLY COLUMN NAMES
        
        // get json ready for sql clausing: change name of key to column name on database
        body.user_id = body.authorised_user_id
        delete body.authorised_user_id
        let qString = getSqlClause(req.body)

        // use qString to make a query changing the values in the request body
        await pool.query("UPDATE post_replies SET " + qString + `WHERE reply_id = '${req.params.id}'`)
    
        // return updated post
        let updatedReply = await pool.query(`SELECT * FROM post_replies WHERE reply_id = '${req.params.id}'`)
        res.json(updatedReply.rows)
        res.end()
        return;

      }

    }
    else if (req.query.type === 'subreply'){
      // check if subreply exists
      let current_subreply_likes = await pool.query(`SELECT subreply_likes FROM post_subreplies WHERE subreply_id = '${req.params.id}' `)
      if(current_subreply_likes.rowCount === 0){
        res.status(400)
        res.end("there is no post with this id")
        return;
      }
      current_subreply_likes = current_subreply_likes.rows[0].subreply_likes

      if(req.query.method === "like"){ // BODY WILL CONTAIN USER WHO IS LIKING
        // check if user in body has already liked the subreply
        let subreply_likers = await pool.query(`SELECT liker FROM all_subreply_likes WHERE liker ='${req.user.authorised_user_id}' AND liked_subreply_id = '${req.params.id}'`)
        if(subreply_likers.rowCount > 0){
          res.status(400)
          res.end("this user has already liked this reply")
          return;
        }

        // if not, increment the likes of the subreply. We will add the user/subreply pair to all_subreply_likes in a POST request
        let new_subreply_likes = current_subreply_likes + 1
        await pool.query(`UPDATE post_subreplies SET subreply_likes = ${new_subreply_likes} WHERE subreply_id = '${req.params.id}'`)

        res.json(new_subreply_likes)
        res.end()
      }
      else if (req.query.method === "unlike"){ // BODY WULL CONTAIN USER WHO IS UNLIKING
        // check if user in body has liked the subreply to be able to unlike
        let subreply_likers = await pool.query(`SELECT liker FROM all_subreply_likes WHERE liker ='${req.user.authorised_user_id}' AND liked_subreply_id = '${req.params.id}'`)
        if(subreply_likers.rowCount === 0){
          res.status(400)
          res.end("this user has not liked this subreply yet to be unliking it")
          return;
        }

        // if they have, decrement the likes of the subreply. We will remove the user/subreply pair from all_subreply_likes in a DELETE request
        let new_subreply_likes = current_subreply_likes - 1;
        await pool.query(`UPDATE post_subreplies SET subreply_likes = ${new_subreply_likes} WHERE subreply_id = '${req.params.id}'`)
        res.json(new_subreply_likes)
        res.end()
        return;

      }
      else{ // BODY WILL CONTAIN PROPERTIES OF SUBREPLY TO CHANGE
        // CHANGE GENERAL PROPERTIES:
        // MAKE SURE REQ BODY KEYS ARE SAME NAME AS SUBREPLY COLUMN NAMES
        
        // get json ready for sql clausing: change name of key to column name on database
        body.user_id = body.authorised_user_id
        delete body.authorised_user_id
        let qString = getSqlClause(req.body)

        // use qString to make a query changing the values in the request body
        await pool.query("UPDATE post_subreplies SET " + qString + `WHERE subreply_id = '${req.params.id}'`)
    
        // return updated post
        let updatedSubeply = await pool.query(`SELECT * FROM post_subreplies WHERE subreply_id = '${req.params.id}'`)
        res.json(updatedSubeply.rows)
        res.end()
        return;
        
      }
    }
    else{
      res.status(400)
      res.end("incorrect queries inputted")
    }
  }
  catch(err){
    res.status(500)
    
    console.log(`ERROR IN PUT /posts/replies${req.params.id}: ${err.message}`)
    res.end("something went wrong")
    throw(err)
  }
})


// add users from the reply/subreply likes table
router.post("/replies/:id", checkAuthentication(), async(req, res) => { // body will contain user who is liking it
  try{
    if(req.query.type === "reply"){
      // check if reply exists
      let reply = await pool.query(`SELECT reply_id FROM post_replies WHERE reply_id = '${req.params.id}'`)
      if(reply.rowCount === 0) {
        res.status(400)
        res.end("There is no reply with this id")
        return
      }
      
      let new_liker = await pool.query(`INSERT INTO all_reply_likes(liker, liked_reply_id) VALUES('${req.user.authorised_user_id}', '${req.params.id}') RETURNING *`)
      new_liker = new_liker.rows[0]

      res.json(new_liker)
      res.end()
    }
    
    else if(req.query.type === "subreply"){
      // check if reply exists
      let subreply = await pool.query(`SELECT subreply_id FROM post_subreplies WHERE subreply_id = '${req.params.id}'`)
      if(subreply.rowCount === 0) {
        res.status(400)
        res.end("There is no subreply with this id")
        return
      }
      
      let new_liker = await pool.query(`INSERT INTO all_subreply_likes(liker, liked_subreply_id) VALUES('${req.user.authorised_user_id}', '${req.params.id}') RETURNING *`)
      new_liker = new_liker.rows[0]

      res.json(new_liker)
      res.end()
    }
    else{
      res.status(400)
      res.end("incorrect queries inputted")
    }
  }
  catch(err){
    res.status(500)
    console.log(`ERROR IN POST /posts/replies/${req.params.id}: ${err.message}`)
    res.end("something went wrong")
  }
})

// remove users from the reply/subreply likes table
router.delete("/replies/:id", checkAuthentication(), async(req, res) => { // body will contain user who is unliking
  try{
    if(req.query.type === "reply"){
      // remove user in body from table
      await pool.query(`DELETE FROM all_reply_likes WHERE liker = '${req.user.authorised_user_id}' AND liked_reply_id = '${req.params.id}'`)

      // get new rows
      newRows = await pool.query(`SELECT * FROM all_reply_likes WHERE liked_reply_id = '${req.params.id}'`)
      res.json(newRows.rows)
      res.end()
    }
    else if (req.query.type == "subreply"){
      // remove user in body from table
      await pool.query(`DELETE FROM all_subreply_likes WHERE liker = '${req.user.authorised_user_id}' AND liked_subreply_id = '${req.params.id}'`)

      // get new rows
      newRows = await pool.query(`SELECT * FROM all_subreply_likes WHERE liked_subreply_id = '${req.params.id}'`)
      res.json(newRows.rows)
      res.end()
    }
    else{
      res.status(400)
      res.end("incorrect queries inputted")
    }
  }
  catch(err){
    res.status(500)
    console.log(`ERROR IN DELETE /posts/replies/${req.params.id}: ${err.message}`)
    res.end("something went wrong")
  }
})

/* =========================================== POSTING =========================================== */

// add comment to post
router.post("/:id/replies", checkAuthentication(), async(req, res) => { // id is either post_id or reply_id
  try{
    if(req.query.type === "reply"){ // body will contain everything reply needs
      let {text} = req.body
      let authorised_user_id = req.user.authorised_user_id
      
      // get new row
      let new_row = await pool.query(`INSERT INTO post_replies(foreign_post_id, reply_author_id, reply_text) VALUES('${req.params.id}', '${authorised_user_id}', '${text}') RETURNING *`)

      let posterInfo = await pool.query(`SELECT username, stock_pfp, user_pfp FROM user_profile WHERE user_id = '${req.user.authorised_user_id}'`)

      let finalReplyInfo = {...new_row.rows[0], ...posterInfo.rows[0], subreplies : [] }
      res.json(finalReplyInfo)
      res.end()
      return
    }
    else if (req.query.type === "subreply"){ // body will contain everything subreply needs
      let {reference_type, reference, text, authorised_user_id} = req.body 

      let new_row = (
        reference ? 
        await pool.query(`INSERT INTO post_subreplies(foreign_reply_id, reference_type, subreply_author_id, subreply_reference_id, subreply_text)\
        VALUES('${req.params.id}', '${reference_type}', '${authorised_user_id}', '${reference}', '${text}') RETURNING *`) :
        await pool.query(`INSERT INTO post_subreplies(foreign_reply_id, reference_type, subreply_author_id, subreply_text)\
        VALUES('${req.params.id}', '${reference_type}', '${authorised_user_id}', '${text}') RETURNING *`)
      )
      // get information about who posted this
      let posterInfo = await pool.query(`SELECT username, stock_pfp, user_pfp FROM user_profile WHERE user_id = '${req.user.authorised_user_id}'`)
      
      res.json({...new_row.rows[0], ...posterInfo.rows[0]})
      res.end()
    }
    else{
      res.status(400)
      res.end("invalid reply type inputted")
      return
    }
  }
  catch(err){
    res.status(500)
    console.log(`ERROR IN POST /posts/${req.params.post_id}/replies: ${err.message}`)
    res.end("something went wrong")
  }
})

// add subreply
router.post("/replies/:id/replies", checkAuthentication(), async(req, res) => {
  try{
    if(req.query.type === "reply"){ // id is the reply id to reply to 
      let newSubcomment = await pool.query(`INSERT INTO post_subreplies(foreign_reply_id, reference_type, subreply_author_id, subreply_text)\
      VALUES('${req.params.id}', 'comment', '${req.user.authorised_user_id}', '${req.body.text}') RETURNING *`)
      let posterInfo = await pool.query(`SELECT username, stock_pfp, user_pfp FROM user_profile WHERE user_id = '${req.user.authorised_user_id}'`)

      let finalPostInfo = {...newSubcomment.rows[0], ...posterInfo.rows[0]}
      res.json(finalPostInfo)
      res.end()
      
    }
    else if (req.query.type === "subreply"){ // id is reply id (parent)
      // check subreply_ref is inside reply
      let subreply = await pool.query(`SELECT subreply_id FROM post_subreplies WHERE subreply_id = '${req.body.subreply_ref}' AND foreign_reply_id = '${req.params.id}'`)
      if(subreply.rowCount === 0){
        res.status(400)
        res.end("this reply has no subreplies with this reference id")
        return
      }
      
      let newSubcomment = await pool.query(`INSERT INTO post_subreplies(foreign_reply_id, reference_type, subreply_reference_id, subreply_author_id, subreply_text)\
      VALUES('${req.params.id}', 'subcomment', '${req.body.subreply_ref}' , '${req.user.authorised_user_id}', '${req.body.text}') RETURNING *`)
      let posterInfo = await pool.query(`SELECT username, stock_pfp, user_pfp FROM user_profile WHERE user_id = '${req.user.authorised_user_id}'`)

      let finalPostInfo = {...newSubcomment.rows[0], ...posterInfo.rows[0]}
      res.json(finalPostInfo)
      res.end()
    }

    else{
      res.status(400)
      res.end("incorrect query params recieved")
    }
  }
  catch(err){
    res.status(500)
    console.log(`ERROR IN POST /posts/replies/${req.params.id}/replies: ${err.message}`)
    throw err
    res.end("something went wrong")
  }
})

// delete reply/subreply
router.delete("/replies/:id", async(req, res) => { // QUERY OF type MUST BE EITHER reply OR subreply
  // check if the url query is correct
  if(!["reply", "subreply"].includes(req.query.type)){
    res.status(400).end("incorrect query")
    return
  }
  
  let author = req.query.type + "_author_id"
  let id_type = req.query.type + "_id";
  let post_type = req.query.type === "reply" ? "post_replies" : "post_subreplies";

  try{   
    // check if post to delete was made by the authenticated person
    let auth_post = await pool.query(`SELECT ${author} FROM\
    ${post_type} WHERE post_id = '${req.params.id}' `)
    
    if(!auth_post.rowCount){
      res.status(404).end("there is no post that exists with this id")
    }

    var deletionRights;
    if(req.query.type === "reply"){
      if(auth_post.rows[0].reply_author_id !== req.user.authorised_user_id){
        deletionRights = (await checkAdminStatus(req.user.authorised_user_id)).can_delete_posts
      } else deletionRights = true
    }
    else if (req.query.type === "subreply"){
      if(auth_post.rows[0].subreply_author_id !== req.user.authorised_user_id){
        deletionRights = (await checkAdminStatus(req.user.authorised_user_id)).can_delete_posts
      } else deletionRights = true
    }
    else{
      console.log("DEBUG: this case should never happen")
    }

    if(deletionRights){
      // checks are all done, we can now delete post
      await pool.query(`DELETE FROM ${post_type} WHERE ${id_type} = '${req.params.id}'`)
      res.end("Successfully deleted post")
    } else res.status(403).end("you do not have permission to delete this post")
  }
  catch(err){
    console.log(`ERROR IN DELETE /:username/posts: ${err.message}`)
    res.status(500).end("Something went wrong")
  }

  // delete subreply
})

module.exports = router;