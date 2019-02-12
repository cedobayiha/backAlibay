let express = require("express")
let cors = require("cors")
let bodyParser = require("body-parser")
let app = express()
app.use(cors())
app.use(bodyParser.raw({ type: "*/*" }))
const MongoClient = require("mongodb").MongoClient
const url = "mongodb://admin:admin123@ds225375.mlab.com:25375/mydb"
let genarateId = function() {
  return "" + Math.floor(Math.random() * 100000000)
}

let passwords = {}
let sessions = {}

app.post("/signup", function(req, res) {
  console.log("**** inside in the signup endpoint")
  let body = JSON.parse(req.body)
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    let dbo = db.db("mydb")
    dbo.collection("body").insertOne(body, (err, result) => {
      if (err) throw err
      console.log("success")
      let response = {
        status: true,
        message: "successfuly insert data"
      }
      db.close()
      res.send(JSON.stringify({ response }))
    })
  })
})

app.post("/login", function(req, res) {
  console.log("**** inside in the login endpoint")
  let body = JSON.parse(req.body)
  let search = req.query.search
  MongoClient.connect(url, (err, db) => {
    if (err) throw err
    let dbo = db.db("mydb")
    let query = {
      username: search
    }
    dbo
      .collection("body")
      .find(query)
      .toArray((err, result) => {
        if (err) throw err
        console.log("result", result)
        let response = {
          status: true,
          password: result
        }
        db.close()
        res.send(JSON.stringify(response))
      })
  })
  // console.log("parsed body :", body)
  // let userName = body.username
  // let enteredPassword = body.password
  // let actualPassword = passwords[userName]
  // if (enteredPassword === actualPassword) {
  //   console.log("password matched")
  //   let sessionId = genarateId()
  //   res.send(JSON.stringify({ success: true, sid: sessionId }))
  //   return
  // }
  res.send(JSON.stringify({ success: false }))
})

app.listen(80, function() {
  console.log("Server started on port 80")
})
