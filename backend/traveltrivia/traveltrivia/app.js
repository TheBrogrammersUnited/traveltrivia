var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const port = 9000;

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createIndex({ _id: 1 });
    dbo.createCollection("customers", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

app.get('/', function (req, res) {
    var d = new Date();
    console.log("We got time connection");
    resText = "Server time is " + d.toISOString();
    res.send(resText);
});

app.get('/get-all-users', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        console.log("we are here");
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.createIndex({ _id: 1 });
        dbo.collection("users").find({}).toArray(function (err, result) {
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});


app.post('/add-user', function (req, res) {
    
    MongoClient.connect(url, { useNewUrlParser: true } , function (err, db) {
        var dbo = db.db("mydb");
        console.log(req.body);
        var myobj = { _id: req.body};
        res.send(myobj);

        dbo.collection("users").insertOne(myobj, function (err, res) {3
            db.close();
        });
    });
});

app.get('/find-user/:id', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var response = "No user found";
        var dbo = db.db("mydb");
        var id = req.params.id;
        dbo.collection("users").findOne({ _id: id }, function (err, result) {
            if (result != null) {
                response = result._id;
            }
            res.send(response);
            db.close();
        });
    });
});


var server = app.listen(port, function () {
    console.log("We have started our server on port 9000");
});