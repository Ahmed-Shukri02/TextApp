const express = require("express")
const path = require("path");
const fs = require("fs")
const {Client} = require("pg")
const cors = require("cors");


const app = express()


app.use("/uploads", express.static("uploads"));
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "client/build")))
}

// body parser middleware
app.use(express.json()) // for json body
app.use(express.urlencoded({extended: false})) // for form submission body

app.use(cors())

const logger = (req, res, next) => {
	console.log(req.originalUrl)
	next()
}

app.use(logger)
app.use("/api/users", require("./routes/api/users.js"))
app.use("/api/posts", require("./routes/api/posts.js"))

const PORT = process.env.PORT || 5000
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(PORT, () => console.log(`running on port ${PORT}`))