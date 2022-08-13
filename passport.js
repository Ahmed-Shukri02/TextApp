const { serializeUser } = require("passport")
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth2").Strategy
const {pool} = require("./Tools/Functions")
const jwt = require("jsonwebtoken")

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET_KEY,
  callbackURL: `http://localhost:${process.env.PORT || 5000}/google/callback`
},
async function verify(accessToken, refreshToken, profile, cb) {
  //console.log(profile)
  // check if google id exists in google ouath table
  console.log(profile.id)
  let google_user_id_res = await pool.query(`SELECT google_user_id FROM oauth_google WHERE google_id = '${profile.id}'`)
  if(!google_user_id_res.rowCount){
    // user does not exist, create account with user credentials

    // unsecure password can be used since oauth_login = true means user can only log in from here; password is useless
    let newUser = await pool.query(`INSERT INTO user_profile(username, user_pfp, f_name, l_name, email, password, oauth_login)\
    VALUES('${profile.displayName}', '${profile.picture}', '${profile.given_name}', '${profile.family_name}', '${profile.family_name}@google.com', 'google_oauth', TRUE) RETURNING user_id, username, user_pfp, f_name, l_name, email, oauth_login`) 

    // insert into google oauth table so user is not created again
    await pool.query(`INSERT INTO oauth_google(google_user_id, google_id) VALUES('${newUser.rows[0].user_id}', '${profile.id}')`);

    console.log("new")
    let user = {user_id: newUser.rows[0].user_id}
    jwt.sign(user, `${process.env.JWT_SECRET}`, {expiresIn: "1d"}, (err, token) =>{
      if(err) throw err;
    
      cb(null, {username: newUser.rows[0].username, token})
    })
  }
  else{
    let user_info = await pool.query(`SELECT user_id, username, user_pfp, f_name, l_name, email, oauth_login FROM user_profile\
    WHERE user_id = '${google_user_id_res.rows[0].google_user_id}'`)

    let user = {user_id: user_info.rows[0].user_id}
    console.log("already exists")
    jwt.sign(user, `${process.env.JWT_SECRET}`, {expiresIn: "1d"}, (err, token) =>{
      if(err) throw err;
    
      cb(null, {username: user_info.rows[0].username, token})
    })
  }
}))

passport.serializeUser(function(user, cb){
  cb(null, user)
})

passport.deserializeUser(function(user, cb){
  cb(null, user)
})

