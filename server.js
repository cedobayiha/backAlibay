let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let app = express()
app.use(cors())
app.use(bodyParser.raw({type: "*/*"}))


app.get('/foobar', function(req, res) {
	res.send("Hello world!")
})
app.listen(4000, function() { console.log("Server started on port 4000") })
