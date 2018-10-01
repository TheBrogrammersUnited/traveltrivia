const express = require('express')
const app = express()
const port = 9000

app.get('/', function (req, res) {
    res.send('Hello World');
})

var server = app.listen(9000, function () {
    console.log("We have started our server on port 9000");
}); 5