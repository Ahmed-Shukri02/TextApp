const jwt = require("jsonwebtoken")
const { Pool } = require("pg");
require("dotenv").config()
const multer = require("multer")


const devConfig = `prostgresql://${process.env.DB_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const prodConfig = process.env.DATABASE_URL

const pool = new Pool( {
  connectionString: process.env.NODE_ENV === "production"? prodConfig : devConfig,
  ssl : {
    rejectUnauthorized: false,
  }
} )

console.log(process.env.DB_DATABASE)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/users")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }

})

const upload = multer({storage})

/**
  * @name getSqlClause
  * @description Takes body json and converts it into "KEY = 'VALUE', " template used for SQL queries
  * @param {Object} body
  * @returns {string} qString
*/
function getSqlClause(body){
  let values = Object.entries(body)
  //console.log(values)
  let qString = `${values[0][0]} = '${values[0][1]}'` // returns "key = 'value'" for first entry
  for(let i =1; i< values.length; i++){
    qString += `, ${values[i][0]} = '${values[i][1]}'`
  } // returns string like "item1= 'this', item2= 'that'..." etc

  return qString
}

// authentication middleware
function checkAuthentication(allow = false){
  return (req, res, next) => {
    let bearerHeader = req.headers["authorization"] // returns Bearer <token>, so split by space delimiter
    if(!bearerHeader && ! allow) {
      res.writeHead(403)
      res.end("403 ACCESS DENIED: Please send Authentication token")
      return
    }
    else if(!bearerHeader && allow) {next()} // authorised_user_id will be missing and so that can be used as an indicator if authorisation worked

    let token = bearerHeader.split(" ")[1]
    
    // verify token. if correct, then add authorised_user_id to body
    jwt.verify(token, `${process.env.JWT_SECRET}`, (err, authData) => {
      if(err && !allow){
        res.writeHead(403)
        res.end("403 ACCESS DENIED: Invalid Token")
        return
      }
      else if(err && allow) { next() }
      else{
        console.log(authData)
        
        req.user = {authorised_user_id: authData.user_id, authorised_user_iat: authData.iat, authorised_user_exp: authData.exp}
        next()
      }
    })
  }
}

async function checkAdminStatus(user_id){
  // check if user is an admin with
  let adminRights = await pool.query(`SELECT * FROM admins\
  WHERE admin_id = '${user_id}'`)
  return adminRights.rows[0]
}

function checkPostExistence(req, res, next){
    // give promise to req.body
    req.postExistencePromise = async (post_type, id) => {
      switch(post_type){
        case "post" :{
          // check if post exists
          let post = await pool.query(`SELECT * FROM user_posts WHERE post_id = '${id}'`)
          if(!post.rowCount){
            return null
          }
          else{
            return post.rows[0]
          }
        }
        case "reply" :{
          let reply = await pool.query(`SELECT * FROM post_replies WHERE reply_id = '${id}'`)
          if(!reply.rowCount){
            return null
          }
          else{
            return post.rows[0]
          }
        }
        case "subreply" :{
          let subreply = await pool.query(`SELECT * FROM post_subreplies WHERE subreply_id = '${id}'`)
          if(!subreply.rowCount){
            return null
          }
          else{
            return post.rows[0]
          }
        }
        default: return null
      }
    }; next() // run next middleware
}


module.exports = {getSqlClause, checkAuthentication, checkAdminStatus, checkPostExistence, upload, pool}