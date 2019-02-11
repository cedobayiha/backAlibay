let express = require("express")
let cors = require("cors")
let bodyParser = require("body-parser")
let app = express()
app.use(cors())
app.use(bodyParser.raw({ type: "*/*" }))

let genarateId = function() {
  return "" + Math.floor(Math.random() * 100000000)
}

let passwords = {}
let sessions = {}

app.post("/login", function(req, res) {
  let body = JSON.parse(req.body)
  let userName = body.userName
  let enteredPassword = body.password
  let actualPassword = passwords[userName]
  if (enteredPassword === actualPassword) {
    let sessionId = genarateId()
    res.send(JSON.stringify({ success: true, sid: sessionId }))
    return
  }
  res.send(JSON.stringify({ success: false }))
})

app.listen(4000, function() {
  console.log("Server started on port 4000")
})
