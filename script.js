const express = require("express")
const path = require("path");
const fs = require("fs")
const {Client} = require("pg")
const cors = require("cors");
const passport = require("passport");
const session = require("express-session")
require("dotenv").config(".env")

const app = express()
const client_url = process.env.NODE_ENV === "production" ? "https://rocky-brook-55283.herokuapp.com" 
: "http://localhost:3000"


app.use("/uploads", express.static("uploads"));
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "client/build")))
}

// body parser middleware
app.use(express.json()) // for json body
app.use(express.urlencoded({extended: false})) // for form submission body
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: "testsecret"
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(cors())

const logger = (req, res, next) => {
	console.log(req.originalUrl)
	next()
}

app.use(logger)
app.use("/api/users", require("./routes/api/users.js"))
app.use("/api/posts", require("./routes/api/posts.js"))
app.use("/api/media", require("./routes/api/media.js"))

app.get("/google", passport.authenticate("google", {scope: ["profile"]}))

app.get("/google/callback", passport.authenticate("google"), async(req, res) => {
  console.log(req.user)
  res.redirect(`${client_url}/oauth-login?token=${req.user.token}`)
})


app.get("/test", (req, res) => {
  res.status(302).redirect("https://google.com")
})

const PORT = process.env.PORT || 5000
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(PORT, () => console.log(`running on port ${PORT}`))