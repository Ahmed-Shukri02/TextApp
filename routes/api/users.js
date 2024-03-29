const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {getSqlClause, checkAuthentication, checkAdminStatus, pool, upload} = require("../../Tools/Functions")
const {uploadToCloud} = require(`../../s3`)
require("dotenv").config()


const router = express.Router()

// get user ID and username securely after authenticating
router.get("/my_id", checkAuthentication(), async(req, res) => {
  try{
    let user_info = await pool.query(`SELECT user_id, username, user_pfp, stock_pfp, f_name,\
    l_name, email, is_verified, followers, bg_theme, bg_image, oauth_login FROM user_profile\
    WHERE user_id = '${req.user.authorised_user_id}'`)

    res.json(user_info.rows[0]).end()
  }
  catch(err){
    console.log(`ERROR IN GET /my_id : ${err.message}`)
    res.status(500).end("something went wrong")
  }
})


// upload user_pfp, background and background theme
router.post("/uploads", checkAuthentication(), upload.single("image"), async(req, res) => {
  // TYPE MUST BE (EITHER user)_pfp, bg_image or bg_theme
  if(!["user_pfp", "bg_image", "bg_theme"].includes(req.query.type)){
    res.end("invalid queries in URL")
    return;
  }

  let bucket_obj = await uploadToCloud(req.file)
  console.log(bucket_obj)

  let queryRes = await pool.query(`UPDATE user_profile SET ${req.query.type} = '${req.file.filename}'\
  WHERE user_id = '${req.user.authorised_user_id}' RETURNING *`)
  res.json(queryRes.rows[0]).end()
})

// check if user is logged in and is new
router.get("/login", checkAuthentication(), async(req, res) => {
  try{
    // previous authentication middleware approved token, so check if user's is_set_up varaiable is true
    let query = await pool.query(`SELECT is_set_up FROM user_profile WHERE user_id = '${req.user.authorised_user_id}'`)

    res.json(query.rows[0])
    res.end()
    
  }
  catch(err){
    console.log(`ERROR IN GET /login : ${err.message}`)
    res.status(500)
    res.end("something went wrong")
  }
})


router.post("/login", async (req,res) => {
  try{
    // find the user_id from the password
    let user_info = await pool.query(`SELECT user_id, username, password, oauth_login FROM user_profile WHERE email='${req.body.email}'`)
    if(user_info.rowCount === 0){
      res.status(404).end("there is no user with this email")
      return
    }
    else if(user_info.rows[0].oauth_login){
      res.status(403).end("Access denied")
    }
    
    const user_id = user_info.rows[0].user_id
    const hashed_password = user_info.rows[0].password
    const username = user_info.rows[0].username
    
    // compare given password with hased one
    bcrypt.compare(req.body.password, hashed_password, (err, same) => {
      if(err) throw err
      
      if(!same){
        res.status(403).end("Access denied: Invalid password")
        return;
      }
  
      // sign user in if everything goes well
      let user = {user_id}
      console.log(user)
      jwt.sign(user, `${process.env.JWT_SECRET}`, {expiresIn: "1d"}, (err, token) =>{
        if(err) throw err;
    
        res.json({username, token})
        res.end()
      })
    })

  }
  catch(err){
    console.log(`ERROR IN POST /login : ${err.message}`)
    res.status(500).end("something went wrong")
  }

  // assume login authentication worked
})

// log oauth user in
router.post("/oauth_login/:oauth_id", async(req, res) => {
  try{
    var user_info
    switch(req.query.provider){
      case "facebook": {
        // use jwt to sign user in
        let user_info = await pool.query(`SELECT u.username, u.user_id FROM oauth_facebook f\
        LEFT JOIN user_profile u ON f.facebook_user_id = u.user_id WHERE f.facebook_id = '${req.params.oauth_id}'`)

        if(!user_info.rowCount){
          // user is new, create account
          console.log("new")
          const {username, f_name, l_name, user_pfp, email} = req.body

          user_info = await pool.query(`INSERT INTO user_profile(username, user_pfp, f_name, l_name, email, password, oauth_login)\
          VALUES('${username}', '${user_pfp}', '${f_name}', '${l_name}', '${email}', 'facebook_oauth', TRUE) RETURNING user_id, username, user_pfp, f_name, l_name, email, oauth_login`) 

          // insert into oauth facebook so user doesnt create account again
          await pool.query(`INSERT INTO oauth_facebook(facebook_id, facebook_user_id)\
          VALUES('${req.params.oauth_id}', '${user_info.rows[0].user_id}')`)
        }

        let user = {user_id: user_info.rows[0].user_id}
        jwt.sign(user, `${process.env.JWT_SECRET}`, {expiresIn: "1d"}, (err, token) =>{
          if(err) throw err;
          res.status(200).json({username: user_info.rows[0].username, token})
        })
        return;
      }

      case "google": {
        let user_info = await pool.query(`SELECT u.username, u.user_id FROM oauth_google g\
        LEFT JOIN user_profile u ON g.google_user_id = u.user_id WHERE g.google_id = '${req.params.oauth_id}'`)

        if(!user_info.rowCount){
          // user is new, create account
          console.log("new")
          const {username, f_name, l_name, user_pfp, email} = req.body

          user_info = await pool.query(`INSERT INTO user_profile(username, user_pfp, f_name, l_name, email, password, oauth_login)\
          VALUES('${username}', '${user_pfp}', '${f_name}', '${l_name}', '${email}', 'google_oauth', TRUE) RETURNING user_id, username, user_pfp, f_name, l_name, email, oauth_login`) 

          // insert into oauth google so user doesnt create account again
          await pool.query(`INSERT INTO oauth_google(google_id, google_user_id)\
          VALUES('${req.params.oauth_id}', '${user_info.rows[0].user_id}')`)
        }

        let user = {user_id: user_info.rows[0].user_id}
        jwt.sign(user, `${process.env.JWT_SECRET}`, {expiresIn: "1d"}, (err, token) =>{
          if(err) throw err;
          res.status(200).json({username: user_info.rows[0].username, token})
        })
        return;
      }

      default: {res.status(404).end("incorrect query params"); return}
    }
  }
  catch(err){
    console.log(`ERROR IN POST /oauth_login/${req.params.oauth_id}?provider=${req.query.provider} : ${err.message}`)
    res.status(500).end("something went wrong")
  }
})

router.get("/", async (req, res) => {
  try{
    let users = await pool.query("SELECT * FROM user_profile")

    let finalUsers = []
    for(let i=0; i < users.rows.length; i++){
      let user = users.rows[i]
      let posts = await pool.query(`SELECT p.* FROM user_posts p JOIN user_profile u ON p.post_author_id = u.user_id WHERE p.post_author_id = '${user.user_id}'`)
      posts = posts.rows ? posts.rows : [];
      finalUsers.push({
        user_id : user.user_id,
        username: user.username,
        user_pfp: user.user_pfp,
        stock_pfp: user.stock_pfp,
        email: user.email,
        posts
      })
    }

    res.json(finalUsers)
    res.end();
  }
  catch(err){
    console.log(`ERROR IN GET / : ${err.message}`)
    res.status(500)
    res.end("something went wrong")
  }
})

// find info about user
router.get("/:id", async(req, res) => {
  try{
    var qRes
    if(req.query.type == "id"){
      qRes = await pool.query(`SELECT user_id, username, user_pfp, stock_pfp, f_name, l_name, email, is_verified, followers, bg_theme, bg_image, oauth_login FROM user_profile WHERE user_id = '${req.params.id}'`)
    }
    else{
      qRes = await pool.query(`SELECT user_id, username, user_pfp, stock_pfp, f_name, l_name, email, is_verified, followers, bg_theme, bg_image, oauth_login FROM user_profile WHERE username = '${req.params.id}'`)
    }

    qRes = qRes.rows[0]
    res.json(qRes)
    res.end()
  }
  catch(err){
    console.log(`ERROR IN GET /:username ${err.message}`)
    res.status(500)
    res.end("something went wrong")
  }
})

// create post
router.post("/user_posts", checkAuthentication(), async(req, res) => {
  try{
    let {text, media} = req.body
    let authorised_user_id = req.user.authorised_user_id
    console.log("running")

    if(!media){
      await pool.query(`INSERT INTO user_posts(post_author_id, post_text) VALUES('${authorised_user_id}', '${text}')`)
    }
    else{
      await pool.query(`INSERT INTO user_posts(post_author_id, post_text, post_media) VALUES('${authorised_user_id}', '${text}', '${media}')`)
    }
    
    // if it was successfully added, return with the new post details
    let user_posts = await pool.query(`SELECT * FROM user_posts WHERE post_author_id = '${authorised_user_id}' ORDER BY post_time DESC`)
    console.log(user_posts.rows)
    //respond with the most recent post
    res.json(user_posts.rows)
    res.end()

  }
  catch(err){
    console.log(`ERROR IN POST /:username/posts: ${err.message}`)
    res.status(500).end("Something went wrong")
  }
})


// create user

router.post("/", async(req, res) => {
  try{
    // hash the password
    let hashed_password = await bcrypt.hash(req.body.password, 10)

    // insert username and password into db
    let user_pfp = req.body.user_pfp ? `'${req.body.user_pfp}'` : null
    let f_name = req.body.f_name ? `'${req.body.f_name}'` : null
    let l_name = req.body.l_name ? `'${req.body.l_name}'` : null
    let bg_theme = req.body.bg_theme ? `'${req.body.bg_theme}'` : null
    let bg_image = req.body.bg_image ? `'${req.body.bg_image}'` : null

    let newUser = await pool.query(`INSERT INTO user_profile(username, user_pfp, f_name, l_name, email, password, bg_theme, bg_image)\
    VALUES('${req.body.username}', ${user_pfp}, ${f_name}, ${l_name}, '${req.body.email}', '${hashed_password}', \
    ${bg_theme}, ${bg_image} ) RETURNING username, user_pfp, f_name, l_name, email, bg_theme, bg_image`) // return everything BUT password

    res.json(newUser).end()

  }
  catch(err){
    console.log(`ERROR IN POST / : ${err.message}`)
    res.status(500).end("Something went wrong")
  }
})

// change information about user
router.put("/update", checkAuthentication(), async(req, res) => {
  try{
    // MAKE SURE BODY KEY IS SAME AS COLUMN IN user_profile
    // get sql clasue for changing values
    console.log(req.user.authorised_user_id)
    let user_id = `${req.user.authorised_user_id}`
    delete req.user.authorised_user_id
    delete req.user.authorised_user_iat
    
    let sqlClause = getSqlClause(req.body)

    let newInfo = await pool.query(`UPDATE user_profile SET ${sqlClause} WHERE user_id = '${user_id}' RETURNING username`)
    res.json(newInfo.rows[0]).end()
  }
  catch(err){
    console.log(`ERROR IN PUT /${req.params.id} : ${err.message}`)
    res.status(500).end("Something went wrong")
  }
})


module.exports = router;