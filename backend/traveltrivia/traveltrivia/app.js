var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const port = 9000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.get('/', function (req, res) {
    var d = new Date();
    resText = "Server time is " + d.toISOString();
    res.send(resText);
});

app.post('/add-user', function (req, res) {
    console.log(req.body);
    res.send(req.body);
});


var server = app.listen(port, function () {
    console.log("We have started our server on port 9000");
});

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { address: "Park Lane 38" };
    dbo.collection("customers").find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});